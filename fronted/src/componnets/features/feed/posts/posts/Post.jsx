import { useContext, useEffect, useState } from "react";
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
import { CountextData } from "../../../../../context/ContextData";
import { useSharePost } from "../useSharePost";
export const Post = ({ fetchPostsFunction }) => {
  const [posts, setPosts] = useState([]);

  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const { setPostDetails, allPosts } = useContext(CountextData);
  const { handleShare } = useSharePost();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchPostsFunction();
        console.log(response);
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [fetchPostsFunction]);

  const hendleClickPost = (post) => {
    setPostDetails(post);
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
      {posts.map((post) => (
        <Box
          key={post._id}
          sx={{
            margin: "10px 1.1rem 1px 0.1rem",
            // border: "0.1px solid #EEE5F1",
            mr: "16px",
            borderRadius: 1,
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {post.user.userName.charAt(0).toUpperCase()}
                {/* Add here pofile photo if exist */}
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
              to={`/post/${post.user.userName}/${post._id}`}
              underline="none"
              onClick={() => hendleClickPost(post)}
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
            handleShare={() =>
              handleShare(`/post/${post.user.userName}/${post._id}`)
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
