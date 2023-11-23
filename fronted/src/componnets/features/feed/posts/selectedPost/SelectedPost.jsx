import { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { CountextData } from "../../../../../context/ContextData";
import { useContext } from "react";
import Icons from "../Icons";
import ShowImage from "../ShowImage";
import { useParams } from "react-router-dom";

// SelectedPost component for displaying a single post in detail
export const SelectedPost = () => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const { postDetails } = useContext(CountextData); // Accessing post details from context
  const { username, postId } = useParams(); // Retrieving URL parameters

  useEffect(() => {
    // Debugging: Logging postDetails
    console.log(postDetails + " postDetails");
  }, [username, postId, postDetails]);

  // Function to handle post sharing using the Web Share API
  const handleShare = async (title, text, url) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  // Functions to manage image modal state
  const openImageModal = (image) => {
    setEnlargedImage(image);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  // Finding the specific post using the username and postId from the URL
  const selectedPost = postDetails.find(
    (post) => post.userName === username && post.id == postId
  );

  if (!selectedPost) {
    // Handling the case where the post is not found
    return <div>Post not found</div>;
  }

  return (
    <Box flex={4} p={2}>
      <Card sx={{ marginRight: 2, marginLeft: 0, marginBottom: 5 }}>
        {/* Card Header with user avatar and more options icon */}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          subheader={
            <Box>
              <Typography variant="h6" component="div">
                {selectedPost.userName}
              </Typography>
              {selectedPost.subheader}
            </Box>
          }
        />
        {/* Post content */}
        <Box component="span">
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {selectedPost.text}
            </Typography>
          </CardContent>
          {selectedPost.image && (
            <ShowImage
              image={selectedPost.image}
              isImageModalOpen={isImageModalOpen}
              openImageModal={openImageModal}
              closeImageModal={closeImageModal}
              enlargedImage={enlargedImage}
            />
          )}
        </Box>
        {/* Icons for actions like sharing */}
        <Icons
          handleShare={() =>
            handleShare(
              selectedPost.userName,
              selectedPost.text,
              `post/${selectedPost.userName}/${selectedPost.id}`
            )
          }
        />
      </Card>
    </Box>
  );
};
