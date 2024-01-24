import { MapsUgcOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import CustomTooltip from "../../../../../utils/Tooltip/CustomTooltip";

const CommentIcon = ({ handleCommentField }) => {
  return (
    <CustomTooltip title="Add Comment" onClick={handleCommentField}>
      <MapsUgcOutlined sx={{ color: (theme) => theme.palette.text.primary, ml:"4px" }} />
    </CustomTooltip>
  );
};


export default CommentIcon;
