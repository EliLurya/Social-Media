import { Box, Button, CardMedia, Modal } from "@mui/material";
import useResponsive from "../../../../utils/UseResponsive";
import { getFlexStyles } from "../../../common/style/CommonStyles";
// ShowImage component for displaying an image and handling image modal
const ShowImage = ({
  image, // Image URL
  isImageModalOpen, // State to control modal visibility
  openImageModal, // Function to open the modal
  closeImageModal, // Function to close the modal
  enlargedImage, // URL of the image to be shown in the modal
}) => {
  const matches = useResponsive(); // Custom hook to get responsive behavior

  // Function to prevent click events on the modal content from closing the modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Box
      sx={getFlexStyles("none", {
        justifyContent: "center",
      })}
    >
      {/* Button to open the modal */}
      <Button
        sx={{
          backgroundColor: "transparent",
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={(e) => {
          openImageModal(image); // Open the modal with the image
          e.preventDefault();
        }}
      >
        {/* CardMedia to display the image */}
        <CardMedia
          component="img"
          height="20%"
          image={image}
          alt="Image"
          sx={{ maxWidth: "400px", }} // Set a maximum width for the image
        />
      </Button>

      {/* Modal for enlarged image view */}
      <Modal open={isImageModalOpen} onClose={closeImageModal}>
        <Box
          sx={getFlexStyles("none", {
            justifyContent: "center",
            position: "fixed",
            width: "100%",
            height: "100%",
          })}         
          onClick={closeImageModal} // Close the modal when clicking outside the image
        >
          <img
            style={{
              maxWidth: matches ? "70%" : "100%", // Responsive max width
              backgroundColor: "black", // Background color
            }}
            src={enlargedImage} // Source of the enlarged image
            alt="Picture"
            onClick={handleModalContentClick} // Prevent closing when clicking the image
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ShowImage;
