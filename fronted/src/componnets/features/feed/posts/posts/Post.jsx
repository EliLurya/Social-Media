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
import Link from "@mui/material/Link";
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

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  return (
    <>
      {postDetails.map((post, index) => (
        <Card
          key={index}
          sx={{ marginRight: 2, marginLeft: 0, marginBottom: 5 }}
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
              href={`post/${post.userName}/${post.id}`}
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
        </Card>
      ))}
    </>
  );
};
