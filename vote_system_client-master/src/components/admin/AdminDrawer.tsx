import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import bnut from "../../assets/images/bnut.png";
import {Link, useNavigate} from "react-router-dom";
import {DrawerItem} from "../../types/global.ts";

export default function AdminDrawer({mobileOpen, setMobileOpen, items}: {
  mobileOpen: boolean,
  setMobileOpen: any,
  items: DrawerItem[]
}) {
  const navigate = useNavigate()
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className="p-3 flex items-center">
        <Link to="/"><Avatar src={bnut} alt="bnut"/></Link>
        <p className="text-lg ms-2 text-[#363636]">نظرسنجی</p>
      </div>
      <Divider sx={{backgroundColor: '#abb6c7'}}/>
      <List>
        {
          items.map((item, index) =>
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText sx={{color: '#363636'}} primary={item.name}/>
              </ListItemButton>
            </ListItem>
          )
        }
      </List>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {xs: 'block', sm: 'none'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {xs: 'none', sm: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}