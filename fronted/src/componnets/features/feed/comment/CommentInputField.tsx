import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import CommentHeader from "./CommentHeader";
import CommentForm from "./CommentForm";
import useResponsive from "../../../../utils/UseResponsive";
import { getFlexStyles } from "../../../common/style/CommonStyles";
import uploadImage from "../../../../utils/imagesOperations/UploadImage";
import compressImage from "../../../../utils/imagesOperations/compressImage";
import { deleteImageFirebase } from "../../../../utils/imagesOperations/deleteImageFirebase";
import { CountextData } from "../../../../context/ContextData";

const CommentInputField = ({ onCommentChange, handleCommentField, post }) => {
  const [commentText, setCommentText] = useState(""); // Text of the comment
  const [commentImage, setCommentImage] = useState<File | null>(null); // Image attached to the comment
  const [currentCommentImageUrl, setCurrentCommentImageUrl] = useState(null); // URL of the current comment image
  const [uploadProgress, setUploadProgress] = useState(0); // Progress of image upload
  const [isUploading, setIsUploading] = useState(false); // Flag to indicate if uploading is in progress
  const matches = useResponsive(); // Responsive design hook
  const [smallScreenComment, setSmallScreenComment] = useState(false); // Flag for small screen layout
  const { createComment } = useContext(CountextData); // Context hook to create a comment

  // Function to append selected emoji to the comment text
  const handleEmojiSelect = (emoji) => {
    setCommentText((prevText) => prevText + emoji);
  };

  // Effect to adjust layout for small screens
  useEffect(() => {
    if (!matches && commentImage) setSmallScreenComment(true);
    else setSmallScreenComment(false);
  }, [commentImage, matches]);

  // Function to handle changes in the comment input field
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
    if (onCommentChange) {
      onCommentChange(e.target.value);
    }
  };

  // Function to handle sending the comment
  const handleSendComment = async () => {
    try {
      setIsUploading(true);

      let imageUrl = currentCommentImageUrl;
      if (commentImage && commentImage instanceof File) {
        // Delete current image if a new one is selected
        if (currentCommentImageUrl && currentCommentImageUrl !== commentImage) {
          await deleteImageFirebase(currentCommentImageUrl);
        }

        // Compress and upload new image
        const compressedImage = await compressImage(commentImage);
        imageUrl = await uploadImage(compressedImage, setUploadProgress);
      }

      // Prepare comment data
      const completeCommentData = {
        comment: commentText.trim(),
        postId: post._id,
        imageUrl,
      };

      // Create comment using context function
      await createComment(completeCommentData);

      // Reset form state after sending the comment
      resetCommentFormState();
    } catch (error) {
      console.error("Error in handleSendComment:", error);
      setIsUploading(false);
    }
  };

  // Function to reset the comment form state
  const resetCommentFormState = () => {
    setCommentText("");
    setCommentImage(null);
    setCurrentCommentImageUrl(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  // Component rendering
  return (
    <>
      <Box sx={getFlexStyles("row", { width: "100%" })}>
        {/* Component to render the header of the comment input field, like a cancel button */}
        <CommentHeader handleCommentField={handleCommentField} />
        <Box
          sx={{
            width: "88%",
            margin: "16px 2% 16px 2%",
            border: "#C6C6C6 1px solid",
            bgcolor: (theme) => theme.palette.background.default,
            borderRadius: "20px",
            display: "flex",
          }}
        >
          {/* Component to render the form for commenting, including input field, image preview, and action buttons */}
          <CommentForm
            handleEmojiSelect={handleEmojiSelect}
            commentText={commentText}
            handleCommentChange={handleCommentChange}
            commentImage={commentImage}
            setCommentImage={setCommentImage}
            handleSendComment={handleSendComment}
            smallScreenComment={smallScreenComment}
          />
        </Box>
      </Box>
    </>
  );
};

export default CommentInputField;
