import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import {
    CallEndedEvent,
    CallTranscriptionReadyEvent,
    CallSessionParticipantLeftEvent,
    CallRecordingReadyEvent,
    CallSessionStartedEvent,
} from "@stream-io/node-sdk";

import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureWithSDK(body: string, signature: string): boolean {
    return streamVideo.verifyWebhook(body, signature)
};

export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-signature");
    const apiKey = req.headers.get("x-api-key");

    if (!signature || !apiKey) {
        return NextResponse.json(
            { error: "Missing signature or API key" },
            { status: 400 }
        );
    }

    const body = await req.text();

    if (!verifySignatureWithSDK(body, signature)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let payload: unknown;
    try {
        payload = JSON.parse(body) as Record<string, unknown>;
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const eventType = (payload as Record<string, unknown>)?.type;
    console.log(`Webhook received: ${eventType}`);

    if (eventType === "call.session_started") {
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId;
        console.log(`Processing call.session_started for meeting: ${meetingId}`);

        if (!meetingId) {
            console.error("Missing meetingId in webhook payload");
            return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
        }

        const [existingMeeting] = await db
            .select()
            .from(meetings)
            .where(
                and(
                    eq(meetings.id, meetingId),
                    not(eq(meetings.status, "completed")),
                    not(eq(meetings.status, "active")),
                    not(eq(meetings.status, "cancelled")),
                    not(eq(meetings.status, "processing"))
                )
            )
        if (!existingMeeting) {
            console.error(`Meeting not found: ${meetingId}`);
            return NextResponse.json({ error: "Meeting Not Found" }, { status: 404 });
        }

        await db
            .update(meetings)
            .set({
                status: "active",
                startedAt: new Date(),
            })
            .where(eq(meetings.id, existingMeeting.id));

        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(eq(agents.id, existingMeeting.agentId));

        if (!existingAgent) {
            console.error(`Agent not found for meeting: ${meetingId}`);
            return NextResponse.json({ error: "Agent Not Found" }, { status: 404 })
        }




        const call = streamVideo.video.call("default", meetingId);

        const realtimeClient = await streamVideo.video.connectOpenAi({
            call,
            openAiApiKey: process.env.OPEN_API_KEY!,
            agentUserId: existingAgent.id,
        });

        realtimeClient.updateSession({
            instructions: existingAgent.instructions,
        })



    } else if (eventType === "call.session_participant_left") {
        const event = payload as CallSessionParticipantLeftEvent;
        const meetingId = event.call_cid.split(":")[1];
        console.log(`Processing call.session_participant_left for meeting: ${meetingId}`);

        if (!meetingId) {
            console.error("Missing meetingId in call.session_participant_left event");
            return NextResponse.json({ error: "meetingId Not Found " }, { status: 400 });
        }


        const call = streamVideo.video.call("default", meetingId);
        await call.end();

    }

    return NextResponse.json({ status: "ok" })
}