import React from "react";
import { Box, Stack, Button } from "@mui/material";
import PostInputField from "../../../../newPost/add/PostInputField";
import ImagePreview from "../../../../newPost/add/ImagePreview";
import AddOptions from "../../../../newPost/add/AddOptions";
import { getFlexStyles } from "../../../../../common/style/CommonStyles";

const CommentForm = ({
  commentText,
  handleCommentChange,
  commentImage,
  setCommentImage,
  handleSendComment,
  smallScreenComment,
  handleEmojiSelect,
}) => {
  return (
    // Main container for the comment form
    <Box
      component="form"
      sx={{
        width: "100%",
        position: "relative",
        m: "24px 10% 0 10%",
      }}
      noValidate
      autoComplete="off"
    >
      {/* Stack for layout, spacing between elements */}
      <Stack spacing={2} sx={{ mb: 1 }}>
        {/* Container for input field, image preview, and action buttons */}
        <Box
          sx={{
            width: "100%",
            position: "relative",
            m: "24px 10% 0 10%",
          }}
        >
          {/* Post input field for entering comment text */}
          <PostInputField
            postText={commentText}
            handleTextChange={handleCommentChange}
            placeholder={"Add a comment..."}
          />

          {/* Container for image preview; displayed if commentImage is set */}
          <Box
            sx={getFlexStyles("row", {
              justifyContent: "center",
              mb: 2,
            })}
          >
            {commentImage && (
              <Box sx={{ mt: 3 }}>
                {/* Image preview component */}
                <ImagePreview
                  smallScreenComment={smallScreenComment}
                  postImage={commentImage}
                  setPostImage={setCommentImage}
                />
              </Box>
            )}
          </Box>
          {/* Container for add options and send button */}
          <Box sx={getFlexStyles("row")}>
            {/* Add options component, including adding images and emojis */}
            <Box
              sx={{
                justifyContent: "flex-start",
                display: "flex",
                width: "100%",
              }}
            >
              <AddOptions
                setPostImage={setCommentImage}
                handleEmojiSelect={handleEmojiSelect}
              />
            </Box>
            {/* Send button to submit the comment */}
            <Button
              variant="contained"
              onClick={handleSendComment}
              disabled={commentText.trim() === "" && !commentImage} // Disable button if no text or image is provided
            >
              Send
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default CommentForm;