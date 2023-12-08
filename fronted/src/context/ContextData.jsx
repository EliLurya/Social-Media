import { createContext, useState } from "react";

export const CountextData = createContext();
import * as postService from "../services/postService";

function CountextDataProvider({ children }) {
  const [postDetails, setPostDetails] = useState([
    {
      id: 1,
      userName: "Ronen",
      subheader: "September 14, 2016",
      image:
        "https://images.unsplash.com/photo-1550522667-09c9bdb293a1?auto=format&fit=crop&q=80&w=1931&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
  ]);
  console.log(postDetails);
  // Create a function to add a new post
  const addNewPost = (newPost) => {
    setPostDetails((prevPostDetails) => [newPost, ...prevPostDetails]);
  };
  // Function to create a new post
  const createPost = async (postData) => {
    try {
      const response = await postService.createPost(postData);
      if (!response.success) {
        console.error("Failed to create post:", response.error);
        return;
      }
      // Handle successful post creation (if needed)
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <CountextData.Provider value={{ postDetails, addNewPost, createPost }}>
      {children}
    </CountextData.Provider>
  );
}

export default CountextDataProvider;
