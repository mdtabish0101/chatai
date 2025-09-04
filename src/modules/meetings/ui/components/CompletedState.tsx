import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { MeetingGetOne } from "../../types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpenTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparklesIcon } from "lucide-react"
import Link from "next/link"
import Markdown from "react-markdown";
import { GeneratedAvatar } from "@/components/generated-avatar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatduration } from "@/lib/utils"
import { Transcript } from "./transcript"
import { ChatProvider } from "./chat-provider"

interface Props {
    data: MeetingGetOne
}

export const CompletedState = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-y-4 flex-1">
            <Tabs defaultValue="summary" className="flex-1 flex flex-col">
                <div className="bg-white rounded-lg border px-3">
                    <ScrollArea>
                        <TabsList className="p-0 bg-background justify-start rounded-none h-13">
                            <TabsTrigger
                                value="summary"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=ative]:text-accent-foreground h-full hover:text-accent-foreground">
                                <BookOpenTextIcon />
                                summary
                            </TabsTrigger>
                            <TabsTrigger
                                value="transcript"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=ative]:text-accent-foreground h-full hover:text-accent-foreground">
                                <FileTextIcon />
                                transcript
                            </TabsTrigger>
                            <TabsTrigger
                                value="recording"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=ative]:text-accent-foreground h-full hover:text-accent-foreground">
                                <FileVideoIcon />
                                recording
                            </TabsTrigger>
                            <TabsTrigger
                                value="chat"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=ative]:text-accent-foreground h-full hover:text-accent-foreground">
                                <SparklesIcon />
                                Ask AI
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
                <TabsContent value="transcript" className="flex-1 overflow-y-auto">
                    <Transcript meetingId={data.id} />

                </TabsContent>
                <TabsContent value="recording" className="flex-1 overflow-y-auto">
                    <div className="bg-white rounded-lg border px-4 py-5">
                        <video
                            src={data.recordingUrl!}
                            className="w-full rounded-lg"
                            controls
                        />
                    </div>
                </TabsContent>
                <TabsContent value="summary" className="flex-1 overflow-y-auto">
                    <div className="bg-white rounded-lg border">
                        <div className="px-4 py-5 gap-y-3.5 flex flex-col col-span-5">
                            <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
                            <div className="flex gap-x-2 items-center">
                                <Link href={`/agents/${data.agentId}`}
                                    className="flex items-center gap-x-2 underline underline-offset-4 capitalize">
                                    <GeneratedAvatar
                                        variant="bottts"
                                        seed={data.agent.name}
                                        className="size-5" />
                                    {data.agent.name}
                                </Link>{" "}
                                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <SparklesIcon className="size.4" />
                                <p>General Summary</p>
                            </div>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-x-2 [&>svg]:size-4">
                                <ClockFadingIcon />
                                {data.duration ? formatduration(data.duration) : "No duration"}
                            </Badge>
                            <div>
                                <Markdown
                                    components={{
                                        h1: (props) => (
                                            <h1 className="text-2xl font-medium mb-6" {...props} />
                                        ),
                                        h2: (props) => (
                                            <h2 className="text-xl font-medium mb-6" {...props} />
                                        ),
                                        h3: (props) => (
                                            <h3 className="text-lg font-medium mb-6" {...props} />
                                        ),
                                        h4: (props) => (
                                            <h4 className="text-base font-medium mb-6" {...props} />
                                        ),
                                        p: (props) => (
                                            <p className="mb-6 leading-relaxed" {...props} />
                                        ),
                                        ul: (props) => (
                                            <ul className="mb-6 list-disc list-inside" {...props} />
                                        ),
                                        ol: (props) => (
                                            <ol className="mb-6 list-decimal list-inside" {...props} />
                                        ),
                                        li: (props) => (
                                            <li className="mb-1" {...props} />
                                        ),
                                        strong: (props) => (
                                            <strong className="font-semibold" {...props} />
                                        ),
                                        code: (props) => (
                                            <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />
                                        ),
                                        blockquote: (props) => (
                                            <blockquote className="border-l-4 pl-4 italic my-4" {...props} />
                                        ),
                                    }}>
                                    {data.summary}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="chat" className="flex-1 overflow-y-auto">
                    <ChatProvider meetingId={data.id} meetingName={data.name} />
                </TabsContent>
            </Tabs>
        </div>
    )
}