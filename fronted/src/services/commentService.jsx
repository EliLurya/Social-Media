import { OptionsUrl } from "../utils/OptionsUrl";
import { sendRequest } from "../utils/SendRequest";

export const createComment = async (commentData) => {
    console.log(JSON.stringify(commentData, null, 4) + "commentData");
  return sendRequest(OptionsUrl.createComment.url, {
    method: OptionsUrl.createComment.method,
    body: commentData ,
  });
};
