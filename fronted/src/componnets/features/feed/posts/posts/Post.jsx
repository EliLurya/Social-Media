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

import { useContext } from "react";
import { CountextData } from "../../../../../context/ContextData";
import Icons from "../Icons";
import ShowImage from "../ShowImage";

export const Post = () => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const { postDetails } = useContext(CountextData); // Using context to access post details

  useEffect(() => {}, [postDetails]); // Effect to handle updates in postDetails

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
      {postDetails.map((post, index) => (
        <Box
          key={index}
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
            subheader={
              <Box>
                <Typography variant="h6" component="div">
                  {post.userName}
                </Typography>
                {post.subheader}
              </Box>
            }
          />
          <Box component="span">
            <Link
              key={index}
              component={RouterLink}
              to={`/post/${post.userName}/${post.id}`}
              underline="none"
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.text}
                </Typography>
              </CardContent>
              {post.image && (
                <ShowImage
                  image={post.image}
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
              handleShare(title, text, post.userName, post.id)
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
