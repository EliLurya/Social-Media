import { OptionsUrl } from "../utils/OptionsUrl";
import { sendRequest } from "../utils/SendRequest";

export const createPost = async (postData) => {
  return sendRequest(OptionsUrl.newPost.url, {
    method: OptionsUrl.newPost.method,
    body: postData,
  });
};

export const feedPosts = async (lastPostId = null) => {
  const queryParams = lastPostId ? `?lastPostId=${lastPostId}` : "";
  return sendRequest(`${OptionsUrl.allPosts.url}${queryParams}`, {
    method: OptionsUrl.allPosts.method,
  });
};

export const onePost = async (postId) => {
  return sendRequest(OptionsUrl.getPost.url, {
    method: OptionsUrl.getPost.method,
    body: { id: postId },
  });
};

export const userPosts = async (lastPostId = null) => {
  const queryParams = lastPostId ? `?lastPostId=${lastPostId}` : "";
  return sendRequest(`${OptionsUrl.userPosts.url}${queryParams}`, {
    method: OptionsUrl.userPosts.method,
  });
};
export const controlLikes = async (post, like, postId) => {
  const queryParams = postId ? `${postId}` : "";
  return sendRequest(`${OptionsUrl.addOrRemovelLikes.url}${queryParams}`, {
    method: OptionsUrl.addOrRemovelLikes.method,
    body: { like: like },
  });
};

export const updatePost = async (postData, like, postId) => {
  const queryParams = postId ? `${postId}` : "";
  return sendRequest(`${OptionsUrl.updatePost.url}${queryParams}`, {
    method: OptionsUrl.updatePost.method,
    body: { post: postData },
  });
};

export const deletePost = async (postId) => {
  const queryParams = postId ? `${postId}` : "";
  return sendRequest(`${OptionsUrl.removePost.url}${queryParams}`, {
    method: OptionsUrl.removePost.method,
  });
};
