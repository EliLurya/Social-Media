import { Box } from "@mui/material";
import { getFlexStyles } from "../../../common/style/CommonStyles";
import { Cancel } from "@mui/icons-material";
import { useEffect, useState } from "react";

const ImagePreview = ({ postImage, setPostImage }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (postImage && postImage instanceof File) {
      const url = URL.createObjectURL(postImage);
      setImageSrc(url);

      // Cleanup function to revoke object URL
      return () => URL.revokeObjectURL(url);
    } else if (typeof postImage === "string") {
      // If postImage is already a URL string
      setImageSrc(postImage);
    } else {
      // Handle the case when postImage is null
      setImageSrc("");
    }
  }, [postImage]);

  return (
    <Box sx={getFlexStyles("none", { justifyContent: "center" })}>
      {imageSrc && (
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
            src={imageSrc}
            alt="Selected Image"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImagePreview;
