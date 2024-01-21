import { Box } from "@mui/material";
import { Post } from "./posts/posts/Post";
import Add from "../newPost/add/Add";
import { getFlexStyles } from "../../common/style/CommonStyles";
import useResponsive from "../../../utils/UseResponsive";
import * as postService from "../../../services/postService";

// Feed component represents the main area where posts are displayed
const Feed = () => {
  const matches = useResponsive(); // Custom hook to get responsive behavior

  return (
    <>
      {/* Main container for the feed */}
      <Box flex={6} p={2} pl={matches ? 4 : 2}>
        {/* Container for the 'Add' component */}
        <Box
          sx={getFlexStyles("column", {
            margin: "1rem 1.5rem 2rem 0",
          })}
        >
          <Add /> {/* Component to add a new post */}
        </Box>
        <Post fetchPostsFunction={postService.feedPosts} />
        {/* Post component to display individual posts */}
      </Box>
    </>
  );
};

export default Feed;
