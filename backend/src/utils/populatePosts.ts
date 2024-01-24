import PostModel from "./../models/postSchema";
import CommentModel from "./../models/commentSchema";
import UserModel from "./../models/userSchema";
import mongoose from "mongoose";

const populatePosts = async (
  baseQuery,
  userId,
  limit,
  lastPostId,
  includeComment = false,
  commentsLimit = 5,
  lastCommentId = null
) => {
  const query = { ...baseQuery };

  if (lastPostId) {
    query._id = { ...query._id, $lt: new mongoose.Types.ObjectId(lastPostId) };
  }

  let commentQuery = {};
  if (lastCommentId) {
    commentQuery = { _id: { $lt: new mongoose.Types.ObjectId(lastCommentId) } };
  }

  const posts = await PostModel.find(query)
    .populate("user", "_id userName")
    .populate({
      path: "comments",
      match: commentQuery, // Apply the comment pagination query
      model: CommentModel,
      populate: { path: "user", model: UserModel, select: "_id userName" },
      select: "user comment createdAt likes idPeopleThatLike imageUrl",
      options: { sort: { createdAt: -1 }, limit: commentsLimit }, // Apply limit for comment pagination
    })
    .sort({ createdAt: -1 })
    .limit(limit);

  // Process the fetched posts to add additional information about user interaction (likes and creation status).
  const enrichedPosts = await Promise.all(
    posts.map(async (post) => {
      // Count the total number of comments for each post
      const commentsCount = await CommentModel.countDocuments({
        postId: post._id,
      });

      // Determine if the user has liked the post.
      const userLikedPost = post.idPeopleThatLike.some((id) =>
        id.equals(userId)
      );
      // Determine if the user is the creator of the post.
      const isCreatorPost = post.user._id.equals(userId);

      // Process each comment in the post to add additional information about user interaction.
      const enrichedComments = post.comments.map((comment) => {
        // Determine if the user is the creator of the comment.
        const isCreatorComment = comment.user._id.equals(userId);
        // Determine if the user has liked the comment.
        const userLikedComment = comment.idPeopleThatLike.some((id) =>
          id.equals(userId)
        );

        // Return the comment with added information about user interaction.
        return {
          ...comment.toObject(), // Convert the comment document to a plain JavaScript object.
          isCreatorComment, // Include information about whether the user is the creator of the comment.
          userLikedComment, // Include information about whether the user has liked the comment.
        };
      });

      // Return the post with added information about user interaction and enriched comments.
      return {
        ...post.toObject(), // Convert the post document to a plain JavaScript object.
        userLikedPost, // Include information about whether the user has liked the post.
        likes: post.idPeopleThatLike.length, // Include the total number of likes on the post.
        isCreatorPost, // Include information about whether the user is the creator of the post.
        commentsCount, // Include the total number of comments on the post.
        comments: includeComment ? enrichedComments : undefined, // Include comments details if includeComment is true
      };
    })
  );

  return enrichedPosts;
};

export default populatePosts;
