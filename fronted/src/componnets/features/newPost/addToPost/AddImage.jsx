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
      let imageUrl = URL.createObjectURL(file); // Convert the file to a URL
      setPostImage(imageUrl); // Pass the selected image to the parent component

      // Clear the file input to allow selecting the same image
      event.target.value = "";
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
