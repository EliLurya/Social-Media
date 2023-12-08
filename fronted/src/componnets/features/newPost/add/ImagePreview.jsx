import { Box } from "@mui/material";
import { getFlexStyles } from "../../../common/style/CommonStyles";
import { Cancel } from "@mui/icons-material";

const ImagePreview = ({ postImage, setPostImage }) => (
  <Box sx={getFlexStyles("none", { justifyContent: "center" })}>
    {postImage && (
      <Box position="relative">
        <Cancel
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
          src={URL.createObjectURL(postImage)}
          alt="Selected Image"
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </Box>
    )}
  </Box>
);

export default ImagePreview;
