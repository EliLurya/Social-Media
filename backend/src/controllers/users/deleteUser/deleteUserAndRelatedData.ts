import mongoose from "mongoose";
import UserModel from "../../../models/userSchema";
import PostModel from "../../../models/postSchema";
import CommentModel from "../../../models/commentSchema";

export async function deleteUserAndRelatedData(userId) {
  // Start a session to ensure the operations are atomic
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Delete the user
    await UserModel.deleteOne({ _id: userId }).session(session);

    // Delete posts by the user and get IDs of those posts
    const posts = await PostModel.find({ user: userId }).session(session);
    const postIds = posts.map((post) => post._id);
    await PostModel.deleteMany({ user: userId }).session(session);

    await CommentModel.deleteMany({ postId: { $in: postIds } }).session(
      session
    );

    // Delete comments made by the user
    await CommentModel.deleteMany({ user: userId }).session(session);


    // Commit the transaction
    await session.commitTransaction();
  } catch (error) {
    // If an error occurs, abort the transaction and throw the error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
