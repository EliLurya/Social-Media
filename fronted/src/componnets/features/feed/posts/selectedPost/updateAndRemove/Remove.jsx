import { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CountextData } from "../../../../../../context/ContextData";
import { useNavigate } from "react-router-dom";
import { deleteImageFirebase } from "../../../../../../utils/imagesOperations/deleteImageFirebase";

const Remove = ({ post }) => {
  const { deletePost } = useContext(CountextData);
  const navigate = useNavigate();
  // State to control the open state of the dialog
  const [openDialog, setOpenDialog] = useState(false);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Function to handle the deletion of the post
  const handleDelete = async () => {
    await deletePost(post._id); // Call the deletePost function with the postId
    await deleteImageFirebase(post.imageUrl); //Remove the photo from Firebase
    navigate("/home"); // Navigate to the home page after deletion
  };

  return (
    <>
      {/* Delete icon button */}
      <DeleteIcon
        sx={{
          pr: 2,
          "&:hover": {
            cursor: "pointer",
            color: (theme) => theme.palette.secondary.main,
          },
          fontSize: "30px",
        }}
        onClick={handleClickOpen} // Open the dialog when icon is clicked
      />
      {/* Dialog component for confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Remove;
