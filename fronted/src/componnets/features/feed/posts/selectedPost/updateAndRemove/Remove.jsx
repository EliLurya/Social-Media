import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const remove = () => {
  return (
    <DeleteIcon
      sx={{
        pr: 2,
        "&:hover": {
          cursor: "pointer",
          color: (theme) => theme.palette.secondary.main,
        },
        fontSize: "30px",
      }}
    ></DeleteIcon>
  );
};

export default remove;
