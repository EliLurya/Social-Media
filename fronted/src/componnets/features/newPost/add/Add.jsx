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

      // Check if there is an image to upload
      if (postImage) {
        // Compress the image before uploading
        compressImage(
          postImage,
          async (compressedImage) => {
            try {
              // Upload the compressed image and track the upload progress
              imageUrl = await uploadImage(compressedImage, (progress) => {
                setUploadProgress(progress); // Update the upload progress state
              });

              // Combine the post text and the uploaded image URL into one object
              const completePostData = {
                text: postText,
                imageUrl: imageUrl,
              };
              console.log("Post data ready to send:", completePostData);

              // Send the post data to your server
              const response = await createPost(completePostData);
              console.log("Response from server:", response);

              // Reset the form state after successful post creation
              setPostText(""); // Reset the post text
              setPostImage(null); // Clear the image
              setTextInput(false); // Indicate that there's no text or image input
              setIsUploading(false); // End uploading
              setUploadProgress(0);
            } catch (error) {
              // Handle errors during the image upload
              setIsUploading(false); // End uploading in case of an error
              console.error("Error during image upload:", error);
            }
          },
          (error) => {
            // Handle errors during image compression
            console.error("Error during image compression:", error);
          }
        );
      }
    } catch (error) {
      // Handle other errors in the handleSend function
      console.error("Error handling the send operation:", error);
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
      {isUploading && (
        <ProgressBar uploadProgress={uploadProgress}></ProgressBar>
      )}
    </Stack>
  );
};

export default Add;
