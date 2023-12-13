import { Box, Button, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { CountextData } from "../../../context/ContextData"; // Correct the filename
import useResponsive from "../../../utils/useResponsive";
import { getFlexStyles } from "../../common/style/CommonStyles";

const RecentTrend = () => {
  // useResponsive hook to check for larger screens
  const matches = useResponsive("xl");

  // Accessing post details from ContextData
  const { postDetails } = useContext(CountextData);

  return (<></>
    // <Box
    //   sx={getFlexStyles("column", {
    //     left: 150, // Position the component
    //   })}
    // >
    //   {/* Heading for Recent Trends */}
    //   <Typography variant="h6" fontWeight={100} mt={3}>
    //     Recent trend
    //   </Typography>

    //   {/* Container for trend items */}
    //   <Box
    //     sx={{
    //       width: 400,
    //       height: 300,
    //       display: "flex",
    //     }}
    //   >
    //     <Box sx={{ alignItems: "center" }}>
    //       <CardContent>
    //         {/* Mapping through the post details to display recent trends */}
    //         {postDetails.slice(0, matches ? 3 : 2).map((item, index) => (
    //           <Box key={index} sx={{ marginLeft: matches ? 0 : 8 }}>
    //             {/* Title of the trend item */}
    //             <Typography
    //               sx={{
    //                 fontSize: matches ? 14 : 10,
    //               }}
    //               color="text.secondary"
    //               gutterBottom
    //             >
    //               {item.title}
    //             </Typography>

    //             {/* Text content of the trend item */}
    //             <Typography
    //               sx={{
    //                 fontSize: matches ? 12 : 8,
    //               }}
    //             >
    //               {item.text.length < 80
    //                 ? item.text
    //                 : item.text.slice(0, 80) + "..."}
    //               {/* Read More button */}
    //               <Button
    //                 sx={{
    //                   backgroundColor: "transparent",
    //                   ":hover": {
    //                     backgroundColor: "transparent",
    //                   },
    //                   color: "secondary",
    //                 }}
    //                 size="small"
    //               >
    //                 Read More
    //               </Button>
    //             </Typography>
    //           </Box>
    //         ))}
    //       </CardContent>
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default RecentTrend;
