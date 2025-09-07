import { useTRPC } from "@/trpc/client";
import { z } from "zod";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
};

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();
    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );

                await queryClient.invalidateQueries(
                    trpc.premium.getFreeUsage.queryOptions(),
                );


                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
                if(error.data?.code === "FORBIDDEN"){
                    router.push("/upgrade");
                }
            },
        }),
    );

    const updateAgent = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id }),
                    );
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
                
            },
        }),
    );

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.name ?? "",
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending || updateAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            updateAgent.mutate({ ...values, id: initialValues.id });
        } else {
            createAgent.mutate(values)
        }
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant="bottts"
                    className="size-16" />
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g. Math tutor" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="instructions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Instructions
                            </FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="You are a helpful math assistant that can answer questions and help with assignments." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-x-2">
                    {onCancel && (
                        <Button
                            variant="ghost"
                            disabled={isPending}
                            type="button"
                            onClick={() => onCancel()}>
                            Cancel
                        </Button>
                    )}
                    <Button>
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};