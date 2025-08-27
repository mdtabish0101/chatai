import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";



interface UpdateAgentDialogProps{
    open:boolean,
    onOpenChange: (open: boolean) => void
    initialValues: MeetingGetOne;
}


export const UpdateAgentDialog = ({open, onOpenChange, initialValues}: UpdateAgentDialogProps) => {
    return(
        <ResponsiveDialog 
        title="Update Agent"
        description="Update the agent"
        open={open}
        onOpenChange={onOpenChange}>
            <MeetingForm
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
            initialValues={initialValues}/>
        </ResponsiveDialog>
    );
};