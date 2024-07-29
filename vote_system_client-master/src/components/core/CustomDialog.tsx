import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

export default function CustomDialog({isOpen, onCloseCallback, title, content}: {
  isOpen: boolean,
  onCloseCallback: (result: boolean) => void,
  title: string,
  content: string
}) {

  return (
    <Dialog
      open={isOpen}
      onClose={() => onCloseCallback(false)}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onCloseCallback(true)}>بله</Button>
        <Button color="error" onClick={() => onCloseCallback(false)}>خیر</Button>
      </DialogActions>
    </Dialog>
  );
}