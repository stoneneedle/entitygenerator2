import { AccountBox, Article, Group, Home, ModeNight, Engineering } from "@mui/icons-material";
import { Icon, IconButton, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, } from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ mode, setMode }) => {
  const navigate = useNavigate();

  const menuIconsLabelsList = [
    { icon: <Home />, label: 'Builder', route: '/' },
    { icon: <Article />, label: 'Notebook', route: '/notebook' },
    { icon: <Group />, label: 'Import', route: '/import' },
    { icon: <AccountBox />, label: 'Export', route: '/export' },
    { icon: <Engineering />, label: 'About', route: '/about' },
  ];

  const mobileMenu = menuIconsLabelsList.map((menuIcon, index) =>
    <ListItem disablePadding key={index}>
      <IconButton onClick={() => navigate(menuIcon.route)} sx={{ display: { xs: 'block' }, marginLeft: "auto", marginRight: "auto" }}>
        <Icon>
          {menuIcon.icon}
        </Icon>
      </IconButton>
    </ListItem>
  );

  const mainMenu = menuIconsLabelsList.map((menuIcon, index) =>
    <ListItem disablePadding key={index}>
      <ListItemButton onClick={() => navigate(menuIcon.route)}>
        <ListItemIcon>
          {menuIcon.icon}
        </ListItemIcon>
        <ListItemText primary={menuIcon.label} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <>
      <Box p={1} sx={{ display: { xs: "block", sm: "none" } }}>
        <Box position="fixed">
          <List>
            {mobileMenu}
            <ListItem disablePadding>
              <Switch onChange={e => setMode(mode === "light" ? "dark" : "light")} />
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed">
          <List>
            {mainMenu}
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch onChange={e => setMode(mode === "light" ? "dark" : "light")} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
