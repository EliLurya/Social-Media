import { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import Icons from "../Icons";
import ShowImage from "../ShowImage";
import * as postService from "../../../../../services/postService";
export const Post = () => {
  const [posts, setPosts] = useState([]);

  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  // const { allPosts } = useContext(CountextData); // Using context to access post details

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.feedPosts();
        console.log(response + "dddddddddd");
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Function to handle post sharing using the Web Share API
  const handleShare = async (title, text, userName, id) => {
    if (navigator.share) {
      try {
        const shareData = {
          title: title,
          text: text,
          url: `post/${userName}/${id}`,
        };
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback if Web Share API is not supported
      alert("Web Share API is not supported in this browser.");
    }
  };

  // Functions to handle image modal opening and closing
  const openImageModal = (image) => {
    setEnlargedImage(image);
    setImageModalOpen(true);
  };

  const closeImageModal = (image) => {
    image.preventDefault();
    image.stopPropagation();
    setImageModalOpen(false);
  };

  return (
    <>
      <Divider
        sx={{
          bgcolor: (theme) => theme.palette.text.secondary,
          borderBottomWidth: "1.5px",
          mr: "1.1rem",
        }}
      ></Divider>
      {posts.map((post, index) => (
        <Box
          key={post._id}
          sx={{
            margin: "10px 1.1rem 1px 0.1rem",
            // border: "0.1px solid #EEE5F1",
            borderRadius: 1,
          }}
        >
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
            title={post.user.userName}
            subheader={new Date(post.createdAt).toLocaleDateString()} // format date as needed
          />
          <Box component="span">
            <Link
              key={post._id}
              component={RouterLink}
              to={`/post/${post.user.userName}/${post.id}`}
              underline="none"
            >
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
            </Link>
          </Box>
          <Icons
            handleShare={(title, text) =>
              handleShare(title, text, post.user.userName, post.id)
            }
          />
          <Divider
            sx={{
              bgcolor: (theme) => theme.palette.text.secondary,
              borderBottomWidth: "1.5px",
            }}
          ></Divider>
        </Box>
      ))}
    </>
  );
};
