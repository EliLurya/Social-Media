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
import { useNavigate} from "react-router-dom";
import logo from "../../../assets/images/picsvg_download22.svg";
import "./Navbar.css";
import useResponsive from "../../../utils/UseResponsive";
import MenuSideBar from "../sidebar/MenuSidebar";
import { getFlexStyles } from "../../common/style/CommonStyles";
import { ROUTES } from "../../../utils/routes";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
// Styled component for the toolbar with flex layout
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

// Styled component for icons, responsive design with media queries
const Icons = styled(Box)(() => ({
  display: "flex",
  columnGap: "20px",
  alignItems: "center",
}));

// Styled vertical line component
const VerticalDivider = styled(Box)({
  height: '24px', 
  width: '2px', 
  backgroundColor: '#bdbdbd', 
  alignSelf: 'center', 
  margin: '0 12px', // Space around the divider
});

const NavBar = ({ setDarkMode   }) => {
  const { signOut, signInSuccessful } = useAuth(); // Authentication context
  const navigate = useNavigate(); // Navigation hook

  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const [nightMode, setNightMode] = useState(false);
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

  const hendleMode =()=>{
    setDarkMode((prevMode) => !prevMode);
    setNightMode(!nightMode);
  }
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "primary", width: "100%", minWidth: "350px" }}
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
            {nightMode ? (
              <Brightness4OutlinedIcon
                sx={{ cursor: "pointer" }}
                onClick={hendleMode}
              />
            ) : (
              <LightModeTwoToneIcon
                sx={{ cursor: "pointer" }}
                onClick={hendleMode}
              />
            )}

            <VerticalDivider />

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
