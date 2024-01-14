import { Box } from "@mui/material";
import React from "react";
import { getFlexStyles } from "../../../../../common/style/CommonStyles";
import Update from "./update";
import Remove from "./Remove";
const UpdateAndRemove = ({ setPostupdate }) => {
  return (
    <>
      <Box sx={getFlexStyles("none", {})}>
        <Update setPostupdate={setPostupdate}></Update>
        <Remove></Remove>
      </Box>
    </>
  );
};

export default UpdateAndRemove;
