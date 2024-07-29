import {Box, Divider, MenuItem, MenuList, Popover, Typography} from "@mui/material";
import {logout} from "../../features/authSlice.ts";
import {User} from "../../types/auth.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function UserPopover({anchorEl, handleClose, user}: {
  anchorEl: HTMLElement | null,
  handleClose: any,
  user: User | null
}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/login", {replace: true});
    dispatch(logout());
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      open={anchorEl !== null}
      onClose={handleClose}
      PaperProps={{sx: {width: 200}}}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline" sx={{fontSize: 18}}>
          حساب
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
          sx={{fontSize: 16}}
        >
          {user?.username}
        </Typography>
      </Box>
      <Divider/>
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={logoutUser}>
          خروج
        </MenuItem>
      </MenuList>
    </Popover>
  );
}