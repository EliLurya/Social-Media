import { Badge, Box } from "@mui/material";
import React from "react";
import CustomTooltip from "../../../../../utils/Tooltip/CustomTooltip";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate } from "react-router-dom";

const CommentsButton = ({ post }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <Box sx={{ mr: 0, position: "relative", top: "1px" }}>
      <Badge
        badgeContent={post.commentsCount} // Show number of comments
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiBadge-badge": {
            right: 7,
            top: 32,
            padding: "0 4px",
            fontSize: "12px", // Smaller font size for the badge
          },
        }}
      >
        <CustomTooltip
          title="Comments"
          onClick={() => navigate(`/post/${post.user.userName}/${post._id}`)}
        >
          <ChatBubbleOutlineOutlinedIcon
            sx={{ color: (theme) => theme.palette.text.primary }}
          />
        </CustomTooltip>
      </Badge>
    </Box>
  );
};

export default CommentsButton;
