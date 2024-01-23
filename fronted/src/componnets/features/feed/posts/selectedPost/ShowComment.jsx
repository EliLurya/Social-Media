import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import PostCardHeader from "../../header/postCardHeader";
import { getFlexStyles } from "../../../../common/style/CommonStyles";

export const ShowComment = ({ comments, loadMoreComments, totalLengthComments }) => {
  console.log(JSON.stringify(comments, null, 4) + "aaaaaaaaaaa");
  console.log(totalLengthComments + "ppppppppp");
  return (
    <Box>
      <Box>
        {comments.length > 0 && (
          <>
            <Box sx={getFlexStyles("none", { width: "90%", ml: "5%" , mt: 1})}>
              <Divider
                sx={{
                  bgcolor: (theme) => theme.palette.text.secondary,
                  flexGrow: 1,
                }}
              ></Divider>

              <Typography sx={{ ml: 3, mr: 3 ,}} variant="h6">
                Comments
              </Typography>
              <Divider
                sx={{
                  bgcolor: (theme) => theme.palette.text.secondary,
                  flexGrow: 1,
                }}
              ></Divider>
            </Box>
            {comments.map((comment) => (
              <Box key={comment._id}>
                <PostCardHeader post={comment}></PostCardHeader>
              </Box>
            ))}
            {comments.length < totalLengthComments && ( // Check if there are more comments to load
              <Button onClick={loadMoreComments}>Load More</Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
