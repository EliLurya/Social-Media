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
import useResponsive from "../../../utils/useResponsive";
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
                      backgroundColor: (theme) =>
                        theme.palette.primary.AuxiliaryColor,
                      color: "primary", // Set text color on hover for the whole ListItemButton
                      // Apply hover styles to the icon specifically
                      "& .MuiListItemIcon-root": {
                        color: "primary", // Icon color on hover
                      },
                    },
                    ...(isActive(item.href) && {
                      backgroundColor: (theme) =>
                        theme.palette.primary.AuxiliaryColor,
                      color: "primary",
                      "& .MuiListItemIcon-root": {
                        color: "primary", // Icon color on hover
                      },
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 3,
                        top: "50%",
                        width: "4px",
                        height: "80%",
                        backgroundColor: "primary",
                        transform: "translateY(-50%)",
                      },
                    }),
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
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
