import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box } from "@mui/material";
import { getFlexStyles } from "../../../../common/style/CommonStyles";
import useResponsive from "../../../../../utils/UseResponsive";

const CommentHeader = ({ handleCommentField }) => {
  const matches = useResponsive(); // Custom hook for responsive design

  return (
    <Box>
      <CancelIcon
        sx={{ fontSize: matches ? "40px" : "30px", cursor: "pointer" }}
        onClick={handleCommentField}
      />
    </Box>
  );
};

export default CommentHeader;
