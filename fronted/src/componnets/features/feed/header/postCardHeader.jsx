import { MoreVert } from "@mui/icons-material";
import { Avatar, CardHeader, IconButton } from "@mui/material";
import React from "react";

const PostCardHeader = ({post}) => {
  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "red" }}>
          {post.user.userName.charAt(0).toUpperCase()}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVert />
        </IconButton>
      }
      title={post?.user?.userName || ""}
      subheader={new Date(post.createdAt).toLocaleDateString()}
    />
  );
};

export default PostCardHeader;
