"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, MessageSquare, FileText, User } from "lucide-react";
import Link from "next/link";

export const HomeView = () => {
  return (
    <div className="bg-gray-50/90 h-full">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
          ChatAI – Talk Face-to-Face with AI
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
          “Instant answers, smarter conversations — all through live video calls with AI.”
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-primary hover:bg-sidebar-accent-foreground text-white">
            <Link href="/Sign-up">Sign up for Free</Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Video Calls</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect with AI agents in real-time video conversations.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Instant Answers</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ask anything and get clear, helpful responses on the spot.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Live Transcriptions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every call comes with automatic captions & summaries.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personalized Assistance</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                From study help to coaching, ChatAI adapts to your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};