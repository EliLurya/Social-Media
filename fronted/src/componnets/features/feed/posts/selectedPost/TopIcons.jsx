import { Box, IconButton } from "@mui/material";
import React from "react";
import { getFlexStyles } from "../../../../common/style/CommonStyles";
import UpdateAndRemove from "./updateAndRemove/UpdateAndRemove";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const TopIcons = ({ handleBackClick, setPostupdate, post, reqAuthorPost }) => {
  return (
    <Box
      sx={getFlexStyles("none", {
        justifyContent: "space-between",
      })}
    >
      {reqAuthorPost && (
        <Box sx={{ mt: 4, ml: 2 }}>
          <UpdateAndRemove
            post={post}
            setPostupdate={setPostupdate}
          ></UpdateAndRemove>
        </Box>
      )}

      {/* Add an empty box to maintain the space when reqAuthorPost is false */}
      {!reqAuthorPost && <Box sx={{ flex: 1 }} />}

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
  );
};

export default TopIcons;
