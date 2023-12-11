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
