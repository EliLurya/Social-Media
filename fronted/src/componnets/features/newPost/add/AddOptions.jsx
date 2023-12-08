import { Box, Stack } from "@mui/material";
import AddImage from "../addToPost/AddImage";
import AddEmojiEmotions from "../addToPost/AddEmojiEmotions";

const AddOptions = ({ setPostImage, handleEmojiSelect }) => (
  <Stack direction="row" pt={0} justifyContent={"space-between"}>
    <Box>
      <Box component={"span"} sx={{ cursor: "pointer" }}>
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
  </Stack>
);

export default AddOptions;
