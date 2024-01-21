import React from "react";
import { Post } from "../feed/posts/posts/Post";
import * as postService from "../../../services/postService";
import { Box } from "@mui/material";
import useResponsive from "../../../utils/UseResponsive";

const Myposts = () => {
  const matches = useResponsive(); // Custom hook to get responsive behavior

  return (
    <Box flex={6} p={2} pl={matches ? 4 : 2}>
      <Post fetchPostsFunction={postService.userPosts} />
    </Box>
  );
};

export default Myposts;
