import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const update = ({setPostupdate}) => {
  const hendleClick = () => {
    setPostupdate((prevState) => !prevState);
  };
  return (
    <>
      <BorderColorIcon
        sx={{
          pr: 2,
          "&:hover": {
            cursor: "pointer",
            color: (theme) => theme.palette.secondary.main,
          },
          fontSize: "30px",
        }}
        onClick={hendleClick}
      ></BorderColorIcon>
    </>
  );
};

export default update;
