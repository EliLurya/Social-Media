import { Box } from "@mui/material";
import logo from "../../assets/images/picsvg_download22.svg";
import useResponsive from "../../utils/useResponsive";
import { getFlexStyles } from "./style/CommonStyles";

const ShowLogo = () => {
  const matches = useResponsive();
  return (
    <Box
      sx={getFlexStyles("column", {
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed", // Fixed position to cover the entire screen
        top: 0,
        left: 0,
        zIndex: 1000, // Ensure it's above other content
        boxShadow: "5px 5px 15px rgba(71, 18, 107, 0.6)", // 3D effect
      })}
    >
      <img
        width={matches ? 500 : 300}
        src={logo}
        alt="Loading"
        style={{
          boxShadow: "0px 0px 50px rgba(71, 18, 107, 0.4)", // Add shadow to image for 3D effect
          borderRadius: "10px",
        }}
      />
    </Box>
  );
};

export default ShowLogo;
