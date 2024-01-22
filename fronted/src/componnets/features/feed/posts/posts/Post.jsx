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
import Icons from "../icons/Icons";
import ShowImage from "../ShowImage";
import { CountextData } from "../../../../../context/ContextData";
import { useSharePost } from "../icons/useSharePost";
import { getFlexStyles } from "../../../../common/style/CommonStyles";
import { ShowComment } from "../../comment/ShowComment";
/**
 * Component to render a list of posts.
 * Supports infinite scrolling by fetching more posts as the user scrolls down.
 * @param {Function} fetchPostsFunction - Function to fetch posts.
 */
export const Post = ({ fetchPostsFunction }) => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const { setPostDetails } = useContext(CountextData);
  const { handleShare } = useSharePost();
  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  /**
   * Loads more posts when called. It fetches posts after the last loaded post.
   */
  const loadMorePosts = async () => {
    if (!hasMorePosts) return;

    try {
      const newPosts = (await fetchPostsFunction(lastPostId)) || [];
      // Check if newPosts is not an array (which can happen if logged out and a token error occurs)
      // or if newPosts is an empty array (meaning no more posts to load)
      if (!Array.isArray(newPosts) || newPosts.length === 0) {
        setHasMorePosts(false);
        return;
      }
      setPosts([...posts, ...newPosts]);
      setLastPostId(newPosts[newPosts.length - 1]._id);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  // Load initial posts on component mount
  useEffect(() => {
    loadMorePosts();
  }, [fetchPostsFunction]);

  // Attach scroll event listener for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMorePosts();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts, hasMorePosts]);

  /**
   * Handles click event on a post to set details for viewing or further interaction.
   * @param {Object} post - The post object to set details for.
   */
  const hendleClickPost = (post) => {
    setPostDetails(post);
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
      <Divider
        sx={{
          bgcolor: (theme) => theme.palette.text.secondary,
          borderBottomWidth: "1.5px",
          mr: "1.1rem",
        }}
      />
      {posts.map((post) => (
        <Box
          key={post._id}
          sx={{ margin: "10px 1.1rem 1px 0.1rem", mr: "16px", borderRadius: 1 }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }}>
                {post.user.userName.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={post?.user?.userName || ""}
            subheader={new Date(post.createdAt).toLocaleDateString()}
          />

          <Box component="span">
            <Link
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
            post={post}
          />
          <Box>
            <ShowComment post={post}></ShowComment>
          </Box>

          <Divider
            sx={{
              bgcolor: (theme) => theme.palette.text.secondary,
              borderBottomWidth: "1.5px",
            }}
          />
        </Box>
      ))}
    </>
  );
};
