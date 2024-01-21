import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { menuItems } from "./menuItems";
import useResponsive from "../../../utils/UseResponsive";
import logo from "../../../assets/images/picsvg_download22.svg";
import { Link, useLocation } from "react-router-dom";

const MenuSideBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  const matches = useResponsive("sm");
  const location = useLocation(); // Get the current location if using React Router

  const isActive = (href) => {
    return location.pathname === href; // Check if the item's href matches the current path
  };

  return (
    <Box>
      <Button
        onClick={handleDrawerOpen}
        sx={{
          marginLeft: "-20px",
          backgroundColor: "transparent",
          border: 0,
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
        }}
      >
        <MenuIcon sx={{ color: "white" }} />
      </Button>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            // Full width, but start below AppBar
            width: "55%",
            top: matches ? 64 : 56, // Adjust this value based on your AppBar's height
            height: `calc(100% - 120px)`, // Adjust this to match the AppBar's height
          },
        }}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <Box
          sx={{
            height: 1000,
          }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <Divider sx={{ mt: 1 }}></Divider>
          <List>
            <Box ml={1.5}>
              <img width={45} src={logo} alt="Logo"></img>
            </Box>
            <Divider></Divider>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.href}
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.menu.hoverMenu,
                      // Apply hover styles to both the icon and the text
                      "& .MuiListItemIcon-root, & .MuiTypography-root": {
                        color: (theme) => theme.palette.primary.main, // Hover color for the icon and text
                      },
                    },
                    ...(isActive(item.href) && {
                      backgroundColor: (theme) => theme.palette.menu.choice,
                      color: (theme) => theme.palette.menu.textChoice,
                      "& .MuiListItemIcon-root": {
                        color: (theme) => theme.palette.menu.textChoice, // Icon color on hover
                      },
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.menu.choice,
                      },
                      position: "relative", // Needed for the line's absolute positioning
                      "&::before": {
                        // CSS for the line
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        width: "4px",
                        height: "90%",
                        backgroundColor: (theme) =>
                          theme.palette.menu.textChoice,
                        transform: "translateY(-50%)",
                      },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MenuSideBar;
