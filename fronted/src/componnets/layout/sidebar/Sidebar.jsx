import { ModeNight } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import { menuItems } from "./menuItems";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation(); // Get the current location

  const isActive = (href) => {
    return location.pathname === href; // Check if the item's href matches the current path
  };

  return (
    <Box
      component="nav"
      sx={{
        flex: 1.5,
        p: 0.5,
        display: { xs: "none", md: "block" }, // Hidden on small screens
      }}
    >
      <Box sx={{ position: "fixed" }}>
        <List>
          {menuItems.map((item, index) => (
            <div key={index}>
              <Divider />
              <ListItem disablePadding>
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
                  <ListItemText
                    primary={<Typography variant="h6"> {item.text}</Typography>}
                    onClick={item.onclick ? item.onclick : undefined}
                  />
                </ListItemButton>
              </ListItem>
            </div>
          ))}
          <Divider />
          {/* Night mode switch */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
