import { useRef } from "react";
import { ImageOutlined } from "@mui/icons-material";

const AddImage = ({ setPostImage }) => {
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostImage(file);
      // Reset the input value after setting the image
      event.target.value = null;
    }
  };

  return (
    <>
      <ImageOutlined onClick={handleImageClick} />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </>
  );
};

export default AddImage;
