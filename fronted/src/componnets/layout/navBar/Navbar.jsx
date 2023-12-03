import {
  AppBar,
  Avatar,
  Badge,
  Toolbar,
  styled,
  Box,
  MenuItem,
  Menu,
} from "@mui/material";

import { Mail, Notifications } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import logo from "../../../assets/images/picsvg_download22.svg";
import "./NavBar.css";
import useResponsive from "../../../utils/useResponsive";
import MenuSideBar from "../sidebar/MenuSidebar";
import { getFlexStyles } from "../../common/style/CommonStyles";
import { ROUTES } from "../../../utils/routes";

// Styled component for the toolbar with flex layout
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

// Styled component for icons, responsive design with media queries
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  columnGap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    // Show on medium screens and up
    display: "flex",
  },
}));

// Styled component for the user box, similar to Icons but with different breakpoints
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  columnGap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none", // Hide on medium screens and up
  },
}));

const NavBar = () => {
  const { signOut, signInSuccessful } = useAuth(); // Authentication context
  const navigate = useNavigate(); // Navigation hook

  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor

  const handleClick = (event) => {
    document.body.classList.add("bodyWithMenuOpen"); // Add class to body
    setAnchorEl(event.currentTarget); // Set menu anchor
  };
  const matches = useResponsive("md");

  const handleSignOut = () => {
    setAnchorEl(null); // Close menu
    signOut(); // Sign out
    navigate(ROUTES.SIGN);
  };

  const handleClose = (event) => {
    document.body.classList.remove("bodyWithMenuOpen"); // Remove class from body
    if (anchorEl && anchorEl.contains(event.target)) {
      return; // Do nothing if clicked inside menu
    }
    setAnchorEl(null); // Close menu
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "primary", width: "100%", minWidth:"100%" }}
    >
      <StyledToolbar>
        {matches || !signInSuccessful ? (
          <Box
            sx={getFlexStyles("row", {
              justifyContent: "space-between",
              width: "100%",
            })}
          >
            <Box sx={{ mt: 1 }}>
              <img width={matches ? 55 : 45} src={logo} alt="Logo"></img>
            </Box>
          </Box>
        ) : (
          <MenuSideBar></MenuSideBar>
        )}

        {/* Icons and UserBox only shown when logged in */}
        {signInSuccessful && (
          <Icons>
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://media-cdn.tripadvisor.com/media/photo-s/01/2b/24/bf/view-out-to-see-from.jpg"
              onClick={handleClick}
            />
          </Icons>
        )}
        {signInSuccessful && (
          <UserBox onClick={handleClick}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://media-cdn.tripadvisor.com/media/photo-s/01/2b/24/bf/view-out-to-see-from.jpg"
            />
          </UserBox>
        )}
      </StyledToolbar>
      {/* User menu */}
      {signInSuccessful && (
        <Menu
          display="flex"
          id="demo-positioned-menu"
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleSignOut}>Profile</MenuItem>
          <MenuItem onClick={handleSignOut}>My account</MenuItem>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      )}
    </AppBar>
  );
};

export default NavBar;
