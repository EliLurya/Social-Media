import { TextField } from "@mui/material";

const PostInputField = ({ postText, handleTextChange }) => (
  <TextField
    variant="standard"
    hiddenLabel
    id="filled-hidden-label-small"
    placeholder="What's new?"
    size="small"
    multiline
    value={postText}
    onChange={handleTextChange}
    sx={{
      "& .MuiInput-underline:before": {
        borderBottom: (theme) =>
          `${theme.palette.primary.AuxiliaryColor} solid 1px`,
      },
      "&:hover .MuiInput-underline:before": {
        borderBottom: (theme) => `${theme.palette.primary.main} solid 1px`,
      },
      "& .MuiInput-underline:after": {
        borderBottom: (theme) => `${theme.palette.primary.main} solid 2px`,
      },
    }}
  />
);

export default PostInputField;
