import { Box, IconButton } from "@mui/material";
import { MapsUgcOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import CommentInputField from "./CommentInputField"; // Make sure the path is correct

const Comment = ({ handleCommentField }) => {



  return (
    <>
      <Box >
        <CommentInputField handleCommentField={handleCommentField} />
      </Box>
    </>
  );
};

export default Comment;
