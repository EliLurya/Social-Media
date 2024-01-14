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
import Icons from "../icons/Icons";
import ShowImage from "../ShowImage";
import { useParams } from "react-router-dom";
import * as postService from "../../../../../services/postService";
import { useSharePost } from "../icons/useSharePost";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";import { useNavigate } from "react-router-dom";

// SelectedPost component for displaying a single post in detail
export const SelectedPost = () => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  // const { postDetails } = useContext(CountextData); // Accessing post details from context
  const { username, postId } = useParams(); // Retrieving URL parameters
  const [post, setPost] = useState([]);
  const { handleShare } = useSharePost();
  const navigate = useNavigate();

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

    const handleBackClick = () => {
      navigate(-1); // This will navigate back to the previous page
    };

    
  return (
    <Box flex={4} p={0}>
      <Card sx={{ mt: 8, mr: "16px" }}>
        {/* Card Header with user avatar and more options icon */}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {post?.user?.userName.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={handleBackClick}>
              <ArrowCircleRightOutlinedIcon sx={{ color: "text.secondary" }} />
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
          postId={post._id}
        />
      </Card>
    </Box>
  );
};
