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
import Icons from "../Icons";
import ShowImage from "../ShowImage";
import { useParams } from "react-router-dom";
import * as postService from "../../../../../services/postService";
import { useSharePost } from "../useSharePost";

// SelectedPost component for displaying a single post in detail
export const SelectedPost = () => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  // const { postDetails } = useContext(CountextData); // Accessing post details from context
  const { username, postId } = useParams(); // Retrieving URL parameters
  const [post, setPost] = useState([]);
  const { handleShare } = useSharePost();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.onePost(postId);
        setPost(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // Functions to manage image modal state
  const openImageModal = (image) => {
    setEnlargedImage(image);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  return (
    <Box flex={4} p={2}>
      <Card sx={{ mt: 8, mr: "16px" }}>
        {/* Card Header with user avatar and more options icon */}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {post?.user?.userName.charAt(0).toUpperCase()}
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
                {post?.user?.userName}
              </Typography>
              {new Date(post.createdAt).toLocaleDateString()}
            </Box>
          }
        />
        {/* Post content */}
        <Box component="span">
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.text}
            </Typography>
          </CardContent>
          {post.imageUrl && (
            <ShowImage
              image={post.imageUrl}
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
            handleShare(`/post/${post.user.userName}/${post._id}`)
          }
        />
      </Card>
    </Box>
  );
};
