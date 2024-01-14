import { useContext, useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { CountextData } from "../../../../context/ContextData";
import uploadImage from "../../../../utils/imagesOperations/uploadImage";
import compressImage from "../../../../utils/imagesOperations/compressImage";
import ProgressBar from "../../../../utils/imagesOperations/ProgressBar";
import PostInputField from "./PostInputField";
import ImagePreview from "./ImagePreview";
import AddOptions from "./AddOptions";
import { deleteImageFirebase } from "../../../../utils/imagesOperations/deleteImageFirebase";

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

  // Function to handle sending the post (create or update)
  const handleSend = async () => {
    try {
      setIsUploading(true);

      let imageUrl = currentImageUrl;
      if (postImage && postImage instanceof File) {
        if (currentImageUrl && currentImageUrl !== postImage) {
          await deleteImageFirebase(currentImageUrl);
        }

        const compressedImage = await compressImage(postImage);
        imageUrl = await uploadImage(compressedImage, setUploadProgress);
      }

      const completePostData = { text: postText, imageUrl };
      if (isUpdateMode) {
        await updatePost(completePostData, postId);
        setCurrentImageUrl(imageUrl);
        props.onPostUpdated();
      } else {
        await createPost(completePostData);
      }

      resetFormState();
    } catch (error) {
      console.error("Error in handleSend:", error);
      setIsUploading(false);
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
      <ImagePreview postImage={postImage} setPostImage={setPostImage} />
      <Stack direction="row" pt={0} justifyContent={"space-between"}>
        <AddOptions
          setPostImage={setPostImage}
          handleEmojiSelect={handleEmojiSelect}
        />
        <Button variant="contained" onClick={handleSend} disabled={!textInput}>
          {isUpdateMode ? "Update" : "Send"}
        </Button>
      </Stack>
      {!textOnly && isUploading && (
        <ProgressBar uploadProgress={uploadProgress} />
      )}
    </Stack>
  );
};

export default Add;
