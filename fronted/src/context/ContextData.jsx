import { createContext, useState } from "react";

export const CountextData = createContext();
import * as postService from "../services/postService";

function CountextDataProvider({ children }) {

  const [postDetails, setPostDetails] = useState([]);

  // Function to create a new post
  const createPost = async (postData) => {
    console.log(typeof postData);
    try {
      const response = await postService.createPost(postData);
      if (!response.success) {
        console.error("Failed to create post:", response.error);
        return;
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const allPosts = async () => {
    try {
      const response = await postService.feedPosts();
      console.log(response);
      console.log(typeof response);
      return response
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <CountextData.Provider
      value={{ postDetails, createPost, allPosts, setPostDetails }}
    >
      {children}
    </CountextData.Provider>
  );
}

export default CountextDataProvider;
