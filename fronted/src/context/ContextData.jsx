import { createContext, useState } from "react";

export const CountextData = createContext();
import * as postService from "../services/postService";
import * as commentService from "../services/commentService";

function CountextDataProvider({ children }) {
  const [postDetails, setPostDetails] = useState([]);

  // Function to create a new post
  const createPost = async (postData) => {
    try {
      const response = await postService.createPost(postData);
      if (!response.success) {
        console.error("Failed to create post:", response.error);
        return;
      }
      // Handle post creation success
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Function to update a post
  const updatePost = async (postData, postId) => {
    try {
      const response = await postService.updatePost(postData, "", postId);
      if (!response.success) {
        console.error("Failed to update post:", response.error);
        return;
      }
      // Handle post update success
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Function to delete a post
  const deletePost = async (postID) => {
    try {
      await postService.deletePost(postID);
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Function to fetch all posts
  const allPosts = async () => {
    try {
      const response = await postService.feedPosts();
      console.log(response);
      console.log(typeof response);
      return response;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function to create a comment
  const createComment = async (commentData) => {
    console.log(JSON.stringify(commentData, null, 4) + "commentData");
    try {
      const response = await commentService.createComment(commentData);
      if (!response.success) {
        console.error("Failed to create comment:", response.error);
        return;
      }
      // Handle comment creation success
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Providing the context values to the consuming components
  return (
    <CountextData.Provider
      value={{
        postDetails,
        createPost,
        allPosts,
        setPostDetails,
        updatePost,
        deletePost,
        createComment,
      }}
    >
      {children}
    </CountextData.Provider>
  );
}

export default CountextDataProvider;
