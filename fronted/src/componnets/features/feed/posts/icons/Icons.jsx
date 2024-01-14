import { MapsUgcOutlined, Share } from "@mui/icons-material";
import { CardActions, IconButton } from "@mui/material";
import LikeButton from "./LikeButton";

// Icons component for handling actions liking 
function Icons({ handleShare, post }) {
  return (
    <CardActions>
      {/* Comment Icon */}
      <IconButton aria-label="MapsUgcOutlined">
        <MapsUgcOutlined
          sx={{ color: (theme) => theme.palette.text.primary }}
        />
      </IconButton>
      <LikeButton post={post}></LikeButton>
      {/* Share Icon */}
      <IconButton
        aria-label="share"
        onClick={() => {
          // Handle share action
          handleShare(
            window.location.href // URL of the current page
          );
        }}
      >
        <Share sx={{ color: (theme) => theme.palette.text.primary }} />
      </IconButton>
    </CardActions>
  );
}

export default Icons;
