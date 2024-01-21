import { Box } from "@mui/material";
import React from "react";
import { getFlexStyles } from "../../../../../common/style/CommonStyles";
import Update from "./Update";
import Remove from "./Remove";
const UpdateAndRemove = ({ setPostupdate, post }) => {
  return (
    <>
      <Box sx={getFlexStyles("none", {})}>
        <Update setPostupdate={setPostupdate}></Update>
        <Remove post={post}></Remove>
      </Box>
    </>
  );
};

export default UpdateAndRemove;
