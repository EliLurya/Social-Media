import { useContext, useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { CountextData } from "../../../../context/ContextData";
import uploadImage from "../../../../utils/imagesOperations/UploadImage";
import compressImage from "../../../../utils/imagesOperations/compressImage";
import ProgressBar from "../../../../utils/imagesOperations/ProgressBar";
import PostInputField from "./PostInputField";
import ImagePreview from "./ImagePreview";
import AddOptions from "./AddOptions";
import { deleteImageFirebase } from "../../../../utils/imagesOperations/deleteImageFirebase";
import { useAuth } from "../../../../context/AuthContext";
// Add component for creating a new post
const Add = (props) => {
  const { updateText, updateImage, postId } = props;
  const { createPost, updatePost } = useContext(CountextData); // Get the addNewPost function from context
  const [postText, setPostText] = useState(updateText || "");
  const [postImage, setPostImage] = useState(updateImage || "");
  const [currentImageUrl, setCurrentImageUrl] = useState(updateImage || "");

  const [textInput, setTextInput] = useState(false); // State to track if input field has text or image
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [textOnly, setTextOnly] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { refreshFirebaseToken } = useAuth();

  // Function to reset form state
  const resetFormState = () => {
    setPostText("");
    setPostImage(null);
    setTextInput(false);
    setIsUploading(false);
    setUploadProgress(0);
    setTextOnly(true);
  };

  // Function to handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setPostText((prevText) => prevText + emoji);
    setTextInput(true);
  };

  // Function to handle text changes
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextInput(inputText.trim() !== "" || !!postImage);
    setPostText(inputText);
  };

  const handleRemoveImage = async () => {
    try {
      if (currentImageUrl) {
        await deleteImageFirebase(currentImageUrl, refreshFirebaseToken); // Delete the image from Firebase
      }
      setPostImage(null); // Remove the image from the state
      setCurrentImageUrl(""); // Clear the current image URL state
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };
  console.log(currentImageUrl + "currentImageUrl");
  const handleSend = async () => {
    try {
      setIsUploading(true);
      await refreshFirebaseToken();

      let imageUrl = currentImageUrl;
      if (postImage && postImage instanceof File) {
        // Case: New image is uploaded or existing image is replaced
        if (currentImageUrl && currentImageUrl !== postImage) {
          await deleteImageFirebase(currentImageUrl, refreshFirebaseToken); // Delete the old image from Firebase
        }

        const compressedImage = await compressImage(postImage);
        imageUrl = await uploadImage(
          compressedImage,
          setUploadProgress,
          refreshFirebaseToken
        ); // Upload the new image
      } else if (!postImage && currentImageUrl) {
        // Case: Existing image is removed
        await deleteImageFirebase(currentImageUrl, refreshFirebaseToken); // Delete the image from Firebase
        imageUrl = ""; // Clear the imageUrl as the image is removed
      }

      const completePostData = { text: postText, imageUrl };
      if (isUpdateMode) {
        await updatePost(completePostData, postId); // Update the post with new data
        setCurrentImageUrl(imageUrl); // Update the current image URL
        props.onPostUpdated();
      } else {
        await createPost(completePostData); // Create a new post
      }

      resetFormState(); // Reset the form state after operation
    } catch (error) {
      console.error("Error in handleSend:", error);
      setIsUploading(false); // Reset the uploading flag in case of an error
    }
  };

  // Update states based on the post image changes
  useEffect(() => {
    handleTextChange({ target: { value: postText } });
  }, [postImage]);

  // Determine if the component is in update mode
  useEffect(() => {
    setIsUpdateMode(!!(updateText || updateImage));
    setPostText(updateText || "");
    setPostImage(updateImage || "");
  }, [updateText, updateImage]);

  // Enable button based on the input state
  useEffect(() => {
    setTextInput(postText.trim() !== "" || !!postImage);
  }, [postText, postImage]);

  return (
    <Stack
      component="form"
      sx={{
        ml: "0.4rem",
        padding: "2%",
        border: "#C6C6C6 1px solid",
        borderRadius: "20px",
        width: "90%",
        backgroundColor: (theme) => theme.palette.background.default,
        position: "relative",
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <PostInputField postText={postText} handleTextChange={handleTextChange} />
      <ImagePreview
        postImage={postImage}
        setPostImage={setPostImage}
        onRemoveImage={handleRemoveImage}
      />
      <Stack direction="row" pt={0} justifyContent={"space-between"}>
        <AddOptions
          setPostImage={setPostImage}
          handleEmojiSelect={handleEmojiSelect}
        />
        <Button variant="contained" onClick={handleSend} disabled={!textInput}>
          {isUpdateMode ? "Update" : "Send"}
        </Button>
      </Stack>
      {isUploading && <ProgressBar uploadProgress={uploadProgress} />}
    </Stack>
  );
};

export default Add;
