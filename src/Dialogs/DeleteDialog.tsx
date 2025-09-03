import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type DeleteDialogProps = {
    description: string;
    openDialog: boolean;
    handleCancel: () => void;
    handleConfirmDelete: () => void;
};

const DeleteDialog = (props: DeleteDialogProps) => {

    return (
        <Dialog
            open={props.openDialog}
            onClose={props.handleCancel}
            maxWidth={"xs"}
            fullWidth
            sx={{
                '& .MuiPaper-root': {
                    width: '100%',
                    maxWidth: '320px',
                    margin: '8px',
                    boxSizing: 'border-box',
                }
            }}
        >
            <DialogTitle sx={{fontWeight: 'bold', fontSize: '1.25rem'}}>Confirm Delete</DialogTitle>
            <DialogContent sx={{fontSize: '1rem', color: '#555'}}>
                Are you sure you want to delete the <b>{props.description}</b> todo?
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCancel}>Cancel</Button>
                <Button color="error" onClick={props.handleConfirmDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    )

}

export default DeleteDialog;