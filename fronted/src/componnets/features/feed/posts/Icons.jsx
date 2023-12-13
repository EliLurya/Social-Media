import {
  Favorite,
  FavoriteBorder,
  MapsUgcOutlined,
  Share,
} from "@mui/icons-material";
import { CardActions, Checkbox, IconButton } from "@mui/material";
import { useContext } from "react";
import { CountextData } from "../../../../context/ContextData";

// Icons component for handling actions like commenting, liking, and sharing
function Icons({ handleShare }) {
  const { postDetails } = useContext(CountextData); // Accessing post details from context

  return (
    <CardActions>
      {/* Comment Icon */}
      <IconButton aria-label="MapsUgcOutlined">
        <MapsUgcOutlined
          sx={{ color: (theme) => theme.palette.text.primary }}
        />
      </IconButton>

      {/* Like Icon with Checkbox for toggle behavior */}
      <IconButton aria-label="add to favorites">
        <Checkbox
          icon={<FavoriteBorder />} // Unchecked (default) state icon
          checkedIcon={<Favorite sx={{ color: "red" }} />} // Checked state icon
        />
      </IconButton>

      {/* Share Icon */}
      <IconButton
        aria-label="share"
        onClick={() => {
          // Handle share action
          handleShare(
            // postDetails.userName,
            // postDetails.text,
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
