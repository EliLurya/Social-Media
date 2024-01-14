import { Box, IconButton } from "@mui/material";
import React from "react";
import { getFlexStyles } from "../../../../common/style/CommonStyles";
import UpdateAndRemove from "./updateAndRemove/UpdateAndRemove";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const TopIcons = ({ handleBackClick, setPostupdate }) => {
  return (
    <>
      <Box
        sx={getFlexStyles("none", {
          justifyContent: "space-between",
        })}
      >
        <Box sx={{ mt: 4, ml: 2 }}>
          <UpdateAndRemove setPostupdate={setPostupdate}></UpdateAndRemove>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            mr: "16px",
          }}
        >
          <IconButton onClick={handleBackClick} size="large">
            <ArrowCircleRightOutlinedIcon
              sx={{ color: "text.secondary", fontSize: "40px" }}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default TopIcons;
