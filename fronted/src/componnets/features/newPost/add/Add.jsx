import { useContext, useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { CountextData } from "../../../../context/ContextData";
import uploadImage from "../../../../utils/imagesOperations/uploadImage";
import compressImage from "../../../../utils/imagesOperations/compressImage";
import ProgressBar from "../../../../utils/imagesOperations/ProgressBar";
import PostInputField from "./PostInputField";
import ImagePreview from "./ImagePreview";
import AddOptions from "./AddOptions";

// Add component for creating a new post
const Add = () => {
  const { createPost } = useContext(CountextData); // Get the addNewPost function from context
  const [postText, setPostText] = useState(""); // State for post text
  const [postImage, setPostImage] = useState(null); // State for post image
  const [textInput, setTextInput] = useState(false); // State to track if input field has text or image
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [textOnly, setTextOnly] = useState(true);
  // Handle changes in the text field
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextInput(inputText.trim() !== "" || postImage != null);
    setPostText(inputText);
  };

  const handleSend = async () => {
    try {
      setIsUploading(true); // Start uploading
      let imageUrl = "";

      if (postImage) {
        try {
          setTextOnly(false);
          const compressedImage = await compressImage(postImage);
          imageUrl = await uploadImage(compressedImage, (progress) => {
            setUploadProgress(progress); // Update the upload progress state
          });
          console.log("Image URL after upload:", imageUrl);
        } catch (error) {
          console.error("Error during image processing:", error);
          setIsUploading(false); // End uploading in case of an error
          setTextOnly(true);
          return; // Exit the function if an error occurs
        }
      }
      // Combine the post text and the uploaded image URL into one object
      const completePostData = {
        text: postText,
        imageUrl: imageUrl,
      };
      // Send the post data to your server
      await createPost(completePostData);
      // Reset the form state after successful post creation
      setPostText("");
      setPostImage(null);
      setTextInput(false);
      setIsUploading(false);
      setUploadProgress(0);
      setTextOnly(true);
    } catch (error) {
      console.error("Error handling the send operation:", error);
      setIsUploading(false); // End uploading in case of an error
      setTextOnly(true);
    }
  };

  // Function to handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setPostText((prevText) => prevText + emoji);
    setTextInput(true);
  };

  // Update text input state when post image changes
  useEffect(() => {
    handleTextChange({ target: { value: postText } });
  }, [postImage]);

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
      {/* Text input field for post */}
      <PostInputField
        postText={postText}
        handleTextChange={handleTextChange}
      ></PostInputField>
      {/* Display selected image with cancel option */}
      <ImagePreview
        postImage={postImage}
        setPostImage={setPostImage}
      ></ImagePreview>

      <Stack direction="row" pt={0} justifyContent={"space-between"}>
        {/* Options to add image and emoji */}
        <AddOptions
          setPostImage={setPostImage}
          handleEmojiSelect={handleEmojiSelect}
        ></AddOptions>
        {/* Send button */}
        <Button variant="contained" onClick={handleSend} disabled={!textInput}>
          Send
        </Button>
      </Stack>
      {/* Progress bar */}
      {!textOnly && isUploading && (
        <ProgressBar uploadProgress={uploadProgress}></ProgressBar>
      )}
    </Stack>
  );
};

export default Add;
