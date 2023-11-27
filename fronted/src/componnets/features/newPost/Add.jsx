import { useContext, useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import AddImage from "./addToPost/AddImage";
import AddEmojiEmotions from "./addToPost/AddEmojiEmotions";
import { CountextData } from "../../../context/ContextData";
import { Cancel } from "@mui/icons-material";
import { getFlexStyles } from "../../common/style/CommonStyles";

// Add component for creating a new post
const Add = () => {
  const { addNewPost } = useContext(CountextData); // Get the addNewPost function from context
  const [postText, setPostText] = useState(""); // State for post text
  const [postImage, setPostImage] = useState(null); // State for post image
  const [textInput, setTextInput] = useState(false); // State to track if input field has text or image

  // Format the current date
  const currentDate = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-IL", options);

  // Handle changes in the text field
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextInput(inputText.trim() !== "" || postImage != null);
    setPostText(inputText);
  };

  let id = 1;
  // Function to handle the send button click
  const handleSend = () => {
    // Create a new post object
    const newPost = {
      id: ++id,
      userName: "Ronen",
      subheader: formattedDate,
      image: postImage,
      text: postText,
    };
    addNewPost(newPost); // Add the new post to context
    setPostText(""); // Reset post text
    setPostImage(null); // Reset post image
    setTextInput(false); // Reset text input state
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
      <TextField
        variant="standard"
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder="What's new?"
        size="small"
        multiline
        value={postText}
        onChange={handleTextChange}
        sx={{
          "& .MuiInput-underline:before": {
            // Normal state
            borderBottom: (theme) =>
              `${theme.palette.primary.AuxiliaryColor} solid 1px`,
          },
          "&:hover .MuiInput-underline:before": {
            // Hover state
            borderBottom: (theme) => `${theme.palette.primary.main} solid 1px`,
          },
          "& .MuiInput-underline:after": {
            // Focused state
            borderBottom: (theme) => `${theme.palette.primary.main} solid 2px`,
          },
        }}
      />
      {/* Display selected image with cancel option */}
      <Box
        sx={getFlexStyles("none", {
          justifyContent: "center",
        })}
      >
        {postImage && (
          <Box position="relative">
            <Cancel
              // Cancel icon to remove the selected image
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                cursor: "pointer",
                zIndex: 1,
                padding: 0.5,
                fontSize: 40,
              }}
              onClick={() => setPostImage(null)}
            />
            <img
              src={postImage}
              alt="Selected Image"
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Box>
        )}
      </Box>
      {/* Options to add image and emoji */}
      <Stack direction="row" pt={0} justifyContent={"space-between"}>
        <Box>
          {/* Components to add image and emoji */}
          <Box
            component={"span"}
            sx={{
              cursor: "pointer",
            }}
          >
            <AddImage setPostImage={setPostImage} />
          </Box>
          <Box
            component={"span"}
            ml={0.5}
            sx={{
              cursor: "pointer",
              display: { xs: "none", sm: "none", md: "inline" },
            }}
          >
            <AddEmojiEmotions onEmojiSelect={handleEmojiSelect} />
          </Box>
        </Box>
        {/* Send button */}
        <Button variant="contained" onClick={handleSend} disabled={!textInput}>
          Send
        </Button>
      </Stack>
    </Stack>
  );
};

export default Add;
