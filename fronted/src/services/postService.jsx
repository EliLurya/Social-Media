import { OptionsUrl } from "../utils/OptionsUrl";
import { sendRequest } from "../utils/SendRequest";

export const createPost = async (postData) => {
  return sendRequest(OptionsUrl.newPost.url, {
    method: OptionsUrl.newPost.method,
    body: { post: postData },
  });
};
