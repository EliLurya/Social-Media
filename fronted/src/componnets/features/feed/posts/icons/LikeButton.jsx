import React, { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import * as postService from "../../../../../services/postService";

// Custom icon component with badge
const LikeIconWithBadge = ({ likes }) => {
  return (
    <Badge
      sx={{
        "& .MuiBadge-badge": {
          color: (theme) => theme.palette.text.primary,
        },
      }}
      badgeContent={likes}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Favorite
        sx={{
          color: "red",
        }}
      />
    </Badge>
  );
};

const LikeButton = ({ post }) => {
  const [likes, setLikes] = useState(post.idPeopleThatLike.length);
  const [isLiked, setIsLiked] = useState(post.userLiked);

  const handleLikeClick = async () => {
    try {
      const response = await postService.controlLikes(
        null,
        "toggleLike",
        post._id
      );
      if (response && response.data) {
        setLikes(response.data.idPeopleThatLike.length); // Update like count
        setIsLiked(response.userLiked); // Update like status based on backend response
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  return (
    <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
      {isLiked ? (
        <LikeIconWithBadge likes={likes} />
      ) : (
        <Badge
          sx={{
            "& .MuiBadge-badge": {
              color: (theme) => theme.palette.text.primary,
            },
          }}
          badgeContent={likes}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <FavoriteBorder
            sx={{ color:  (theme) => theme.palette.text.primary }}
          />
        </Badge>
      )}
    </IconButton>
  );
};

export default LikeButton;
