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
const Sidebar = () => {
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
                  component="a"
                  href={item.href}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e0d3e1",
                      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                        color: "#47126B",
                      },
                    },
                    ...(isActive(item.href) && {
                      position: "relative", // Needed for the line's absolute positioning
                      "&::before": {
                        // CSS for the line
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        width: "4px",
                        height: "90%",
                        backgroundColor: "#47126B", // Line color
                        transform: "translateY(-50%)",
                      },
                    }),
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
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
