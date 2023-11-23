import { useState, useEffect, useRef } from "react";
import { EmojiEmotionsOutlined } from "@mui/icons-material";
import Picker from "emoji-picker-react";
import { Box } from "@mui/material";

// AddEmojiEmotions component allows users to select emojis
const AddEmojiEmotions = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker visibility
  const emojiPickerRef = useRef(null); // Ref for the emoji picker element

  // Function to toggle the visibility of the emoji picker
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  useEffect(() => {
    // Function to handle clicks outside the emoji picker to close it
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    // Add or remove event listeners based on the visibility of the emoji picker
    if (showEmojiPicker) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <Box
      component={"span"}
      position={"absolute"}
      sx={{ zIndex: 1000 }}
      ref={emojiPickerRef}
    >
      {/* Emoji icon to open/close the emoji picker */}
      <EmojiEmotionsOutlined onClick={toggleEmojiPicker} />

      {/* Conditionally render the emoji picker based on its visibility state */}
      {showEmojiPicker && (
        <Picker
          previewConfig={{ showPreview: false }} // Disable emoji preview
          searchDisabled // Disable search functionality
          disableAutoFocus={true} // Disable auto focus
          pickerStyle={{ position: "absolute", bottom: "70px", right: "10px" }} 
          emojiStyle="twitter"
          lazyLoadEmojis={false} // Disable lazy loading for emojis
          onEmojiClick={(e) => {
            onEmojiSelect(e.emoji); 
          }}
        />
      )}
    </Box>
  );
};



export default AddEmojiEmotions;
