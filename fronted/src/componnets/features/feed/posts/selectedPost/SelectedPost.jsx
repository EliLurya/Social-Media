import { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";
import TopIcons from "./TopIcons";
import Add from "../../../newPost/add/Add";

// SelectedPost component for displaying a single post in detail
export const SelectedPost = () => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const { postId } = useParams(); // Retrieving URL parameters
  const [post, setPost] = useState({});
  const { handleShare } = useSharePost();
  const [postUpdate, setPostupdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.onePost(postId);
        setPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (postId) {
      fetchPost();
    } else {
      console.log("No postId found");
    }
  }, [postId, postUpdate]);

  console.log(post);
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

   const onPostUpdated = () => {
     setPostupdate(false);
     // fetchPost();
   };
  return (
    <Box flex={4} p={0}>
      <TopIcons
        handleBackClick={handleBackClick}
        setPostupdate={setPostupdate}
      ></TopIcons>
      {postUpdate ? (
        <Box sx={{ mt: 6, mr: 1 }}>
          <Add
            updateText={post.text}
            updateImage={post.imageUrl}
            postId={post._id}
            onPostUpdated={onPostUpdated}
          ></Add>
        </Box>
      ) : (
        <Card sx={{ mt: 4, mr: "16px" }}>
          {/* Card Header with user avatar and more options icon */}

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {post?.user?.userName.charAt(0).toUpperCase()}
              </Avatar>
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
          {post && post._id && (
            <Icons
              handleShare={() =>
                handleShare(`/post/${post.user.userName}/${post._id}`)
              }
              post={post}
            />
          )}
        </Card>
      )}
      {postUpdate && (
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => setPostupdate(false)}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};
