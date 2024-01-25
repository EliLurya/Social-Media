import React, { useState } from "react";
import { Box, Divider, Typography, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PostCardHeader from "../../../header/postCardHeader";
import { getFlexStyles } from "../../../../../common/style/CommonStyles";
import Icons from "../../icons/Icons"; // Import icons if you have specific icons for comments
import { useSharePost } from "../../icons/useSharePost";
import ShowImage from "../../ShowImage";
import useResponsive from "../../../../../../utils/UseResponsive";
export const ShowComment = ({
  comments,
  loadMoreComments,
  totalLengthComments,
}) => {
  const { handleShare } = useSharePost();
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const matches = useResponsive(); // Custom hook for responsive design

  /**
   * Handles click event on a post to set details for viewing or further interaction.
   * @param {Object} post - The post object to set details for.
   */
  const handleCommentClick = (comment) => {
    setPostDetails(comment);
  };

  // Functions to manage the state of the image modal
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
      <Box
        sx={getFlexStyles("none", {
          width: "90%",
          ml: matches ? "4%" : "3%",
          mt: 3,
        })}
      >
        <Divider
          sx={{
            bgcolor: (theme) => theme.palette.text.secondary,
            flexGrow: 1,
          }}
        ></Divider>

        <Typography sx={{ ml: 3, mr: 3 }} variant="h6">
          {totalLengthComments > 0 ? "COMMENTS" : "Be the first to comment"}
        </Typography>
        <Divider
          sx={{
            bgcolor: (theme) => theme.palette.text.secondary,
            flexGrow: 1,
          }}
        ></Divider>
      </Box>
      {comments.map((comment) => (
        <Box
          key={comment._id}
          sx={{ margin: "10px 1.1rem 1px 0.1rem", mr: "16px", borderRadius: 1 }}
        >
          <PostCardHeader post={comment}></PostCardHeader>

          <Box component="span">
            <Link
              component={RouterLink}
              to={`/comment/${comment.user.userName}/${comment._id}`}
              underline="none"
              onClick={() => handleCommentClick(comment)}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 3, mr: 3 }}
              >
                {comment.comment}
              </Typography>
            </Link>
            <ShowImage
              image={JSON.parse(comment.imageUrl)}
              isImageModalOpen={isImageModalOpen}
              openImageModal={openImageModal}
              closeImageModal={closeImageModal}
              enlargedImage={enlargedImage}
            />
          </Box>
          <Icons
            handleShare={() =>
              handleShare(`/comment/${comment.user.userName}/${comment._id}`)
            }
            post={comment}
            addComment={false}
          />

          <Divider
            sx={{
              bgcolor: (theme) => theme.palette.text.secondary,
              borderBottomWidth: "1.5px",
            }}
          />

          {/* The Load More button is already handled outside this map function */}
        </Box>
      ))}

      {comments.length < totalLengthComments && ( // Check if there are more comments to load
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button onClick={loadMoreComments}>Load More</Button>
        </Box>
      )}
    </>
  );
};
