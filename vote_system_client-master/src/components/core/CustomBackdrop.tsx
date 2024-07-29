import {Backdrop, CircularProgress} from "@mui/material";

export default function CustomBackdrop({isOpen}: { isOpen: boolean }) {
  return (
    <Backdrop sx={{color: '#fff', zIndex: 2000}} open={isOpen}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
}