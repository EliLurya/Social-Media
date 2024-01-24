import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
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
import PostCardHeader from "../../header/postCardHeader";
import { ShowComment } from "./commentView/ShowComment";

// SelectedPost component for displaying a single post in detail
export const SelectedPost = () => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const { postId } = useParams(); // Retrieving URL parameters
  const [post, setPost] = useState();
  const { handleShare } = useSharePost();
  const [postUpdate, setPostupdate] = useState(false);
  const [reqAuthorPost, setReqAuthorPost] = useState(false);
  const [lastCommentId, setLastCommentId] = useState(null);
  const [comments, setComments] = useState([]);

  // Set the limit for the number of comments to fetch per request.
  const commentsLimit = 5;
  const navigate = useNavigate();

  // Function to fetch a single post and its comments from the server.
  const fetchPost = async () => {
    try {
      // Make an API call to fetch the post, passing the postId, the number of comments to fetch, and the ID of the last fetched comment for pagination.
      const response = await postService.onePost(
        postId,
        commentsLimit,
        lastCommentId
      );

      if (response) {
        // Update the comments state by appending the newly fetched comments.
        setComments((prevComments) => {
          // Create a Set of the IDs of the already fetched comments to ensure uniqueness.
          const commentIds = new Set(
            prevComments.map((comment) => comment._id)
          );
          // Filter out any new comments that have already been fetched.
          const newComments = response.comments.filter(
            (comment) => !commentIds.has(comment._id)
          );
          // Return the combination of the previously fetched comments and the new unique comments.
          return [...prevComments, ...newComments];
        });

        // Update the lastCommentId state to the ID of the last comment in the newly fetched batch. This will be used for the next 'Load More' request.
        const newLastComment = response.comments[response.comments.length - 1];
        if (newLastComment) {
          setLastCommentId(newLastComment._id);
        }

        // Update the post state with the data of the fetched post.
        setPost(response);
        // Update the reqAuthorPost state to indicate whether the authenticated user is the author of the post.
        setReqAuthorPost(response.isCreatorPost);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      // Redirect to the home page if there's an error fetching the post.
      navigate("/home");
    }
  };

  // useEffect hook to fetch the post and its comments when the component mounts or the postId changes.
  useEffect(() => {
    if (postId) {
      fetchPost();
    } else {
      console.log("No postId found");
    }
  }, [postId, postUpdate]);

  // Function to be called when the 'Load More' button is clicked. It fetches the next batch of comments for the post.
  const loadMoreComments = () => {
    fetchPost(); // This will use the current lastCommentId to fetch the next set of comments.
  };

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
console.log(post);
  return (
    <>
      {post && (
        <Box flex={4} p={0}>
          <TopIcons
            handleBackClick={handleBackClick}
            setPostupdate={setPostupdate}
            post={post}
            reqAuthorPost={reqAuthorPost}
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

              <PostCardHeader post={post}></PostCardHeader>
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
          {/* {postUpdate && (
            <Box display="flex" justifyContent="right" >
              <Button
                variant="contained"
                sx={{ mt: 3, mb:2 }}
                onClick={() => setPostupdate(false)}
              >
                Cancel
              </Button>
            </Box>
          )} */}
          <Box>
            <Box>
              <ShowComment
                comments={comments}
                loadMoreComments={loadMoreComments}
                totalLengthComments={post.commentsCount}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
