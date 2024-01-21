import { Share } from "@mui/icons-material";
import { Box, CardActions, IconButton } from "@mui/material";
import LikeButton from "./LikeButton";
import { useState } from "react";
import CommentInputField from "../../comment/CommentInputField";
import CommentIcon from "../../comment/CommentIcon";
import { getFlexStyles } from "../../../../common/style/CommonStyles";

// Icons component for handling actions liking
function Icons({ handleShare, post }) {
  const [showCommentField, setShowCommentField] = useState(false);

  // Toggle the comment input field visibility
  const toggleCommentField = () => {
    setShowCommentField((prev) => !prev);
  };

  return (
    <CardActions
      sx={{
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        {" "}
        {/* Container for icons */}
        {/* Comment Icon */}
        <CommentIcon handleCommentField={toggleCommentField} />
        <LikeButton post={post} />
        {/* Share Icon */}
        <IconButton
          aria-label="share"
          onClick={() => {
            // Handle share action
            handleShare(window.location.href); // URL of the current page
          }}
        >
          <Share sx={{ color: (theme) => theme.palette.text.primary }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
          position: "relative",
        }}
      >
        {showCommentField && (
          <Box sx={{ width: "100%", position: "relative" }}>
            <CommentInputField
              post={post}
              handleCommentField={toggleCommentField}
            ></CommentInputField>
          </Box>
        )}
      </Box>
    </CardActions>
  );
}

export default Icons;
