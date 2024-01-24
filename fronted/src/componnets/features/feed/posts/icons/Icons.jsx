import { Share } from "@mui/icons-material";
import { Box, CardActions } from "@mui/material";
import LikeButton from "./LikeButton";
import CommentInputField from "../../comment/addComment/CommentInputField";
import CommentIcon from "../../comment/addComment/CommentIcon";
import { useState } from "react";
import CustomTooltip from "../../../../../utils/Tooltip/CustomTooltip";
import CommentsButton from "./CommentsButton";

/**
 * Icons component to display action icons like Like, Comment, and Share.
 * @param {{ handleShare: function, post: object, addComment: boolean, numComments: boolean }} props
 * @returns JSX.Element
 */
function Icons({ handleShare, post, addComment = true, numComments = false }) {
  const [showCommentField, setShowCommentField] = useState(false); // State to manage comment input field visibility

  /**
   * Toggle the visibility of the comment input field.
   */
  const toggleCommentField = () => {
    setShowCommentField((prev) => !prev);
  };

  return (
    <CardActions sx={{ flexDirection: "column", alignItems: "start" }}>
      <Box sx={{ display: "flex", width: "100%", cursor: "pointer" }}>
        {/* Display the number of comments badge and the comment icon */}
        {numComments && <CommentsButton post={post}></CommentsButton>}

        {/* Display the add comment icon */}
        {addComment && <CommentIcon handleCommentField={toggleCommentField} />}

        {/* Like Button component */}
        <LikeButton post={post} />

        {/* Share button with custom tooltip */}
        <CustomTooltip
          title="Share"
          onClick={() => handleShare(window.location.href)}
        >
          <Share sx={{ color: (theme) => theme.palette.text.primary }} />
        </CustomTooltip>
      </Box>

      {/* Display the comment input field if showCommentField is true */}
      {showCommentField && (
        <Box sx={{ width: "100%", position: "relative" }}>
          <CommentInputField
            post={post}
            handleCommentField={toggleCommentField}
          />
        </Box>
      )}
    </CardActions>
  );
}

export default Icons;
