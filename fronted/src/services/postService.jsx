import { OptionsUrl } from "../utils/OptionsUrl";
import { sendRequest } from "../utils/SendRequest";

export const createPost = async (postData) => {
  return sendRequest(OptionsUrl.newPost.url, {
    method: OptionsUrl.newPost.method,
    body: postData,
  });
};

export const feedPosts = async () => {
  return sendRequest(OptionsUrl.allPosts.url, {
    method: OptionsUrl.allPosts.method,
  });
};

export const onePost = async (postId) => {
  return sendRequest(OptionsUrl.getPost.url, {
    method: OptionsUrl.getPost.method,
    body: { id: postId },
  });
};

export const userPosts = async () => {
  return sendRequest(OptionsUrl.userPosts.url, {
    method: OptionsUrl.userPosts.method,
  });
};
