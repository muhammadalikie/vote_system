import {AppBar, Avatar, Box, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import bnut from "../../assets/images/bnut.png";
import {AccountCircle, Menu} from "@mui/icons-material";
import {MouseEvent, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import UserPopover from "./UserPopover.tsx";

export default function UserNavbar({isShowingLogo, mobileOpen, setMobileOpen}: {
  isShowingLogo: boolean,
  mobileOpen?: boolean,
  setMobileOpen?: any
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {user} = useSelector((state: RootState) => state.auth);


  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar sx={{backgroundColor: "rgba(255, 255, 255, 0.8)", boxShadow: "none"}}>
        <Container maxWidth="xl">
          <Toolbar sx={{display: "flex", justifyContent: "end", position: 'sticky',}}>
            {
              isShowingLogo ?
                <div className="flex items-center">
                  <Link to="/"><Avatar src={bnut} alt="bnut" sx={{mr: 2}}/></Link>
                  <Typography variant="h5" component="div" sx={{flexGrow: 1, color: "#000"}}>
                    <Link to="/">نظرسنجی</Link>
                  </Typography>
                </div> :
                <div>
                  <IconButton
                    edge="start"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    sx={{display: {sm: 'none'}}}
                  >
                    <Menu/>
                  </IconButton>
                </div>
            }
            <div className="flex items-center ms-auto">
              <IconButton
                onClick={handleMenu}
                color="primary"
              >
                <AccountCircle sx={{fontSize: 34}}/>
              </IconButton>
              <UserPopover anchorEl={anchorEl} handleClose={handleClose} user={user}/>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}