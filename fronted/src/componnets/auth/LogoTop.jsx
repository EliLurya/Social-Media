import { Box, Divider } from "@mui/material";
import useResponsive from "../../utils/useResponsive";
import logo from "../../assets/images/picsvg_download22.svg";
import { getFlexStyles } from "../common/style/CommonStyles";

const LogoTop = () => {
  const matches = useResponsive(); // Custom hook for responsive design

  return (
    <Box sx={getFlexStyles("column", { mt: "1rem" })}>
      <Box
        sx={getFlexStyles("row", {
          position: "relative",
          right: matches ? 80 : 50,
          mt:5,
          mb: 1,
        })}
      >
        <Divider width={"100%"}></Divider>
        <Box>
          <img src={logo} alt="Loading" width={matches ? 80 : 50} />
        </Box>
        <Divider width={"100%"}></Divider>
      </Box>
    </Box>
  );
};

export default LogoTop;
