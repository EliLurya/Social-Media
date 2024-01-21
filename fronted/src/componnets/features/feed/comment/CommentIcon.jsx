import { MapsUgcOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const CommentIcon = ({ handleCommentField }) => {
  return (
    <>
      <IconButton aria-label="submit-comment" onClick={handleCommentField}>
        <MapsUgcOutlined
          sx={{ color: (theme) => theme.palette.text.primary }}
        />
      </IconButton>
    </>
  );
};

export default CommentIcon;
