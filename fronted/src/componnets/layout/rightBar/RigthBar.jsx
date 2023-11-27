import {
  Avatar,
  AvatarGroup,
  Box,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import RecentTrend from "./RecentTrend";
import useResponsive from "../../../utils/useResponsive";
import { getFlexStyles } from "../../common/style/CommonStyles";
const RigthBar = () => {
  // Image data for the latest photos section

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    // {
    //   img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    //   title: "Coffee",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    //   title: "Hats",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    //   title: "Honey",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    //   title: "Basketball",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    //   title: "Fern",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    //   title: "Mushrooms",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    //   title: "Tomato basil",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    //   title: "Sea star",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    //   title: "Bike",
    // },
  ];
  const matches = useResponsive("xl");

  return (
    <Box
      flex={3}
      p={0}
      sx={{
        display: { xs: "none", lg: "block" },
      }}
    >
      <Box
        sx={getFlexStyles("column", {
          position: "fixed",
          flexDirection: "column",
          right: 30,
          justifyItems: "end",
        })}
      >
        {/* Online Friends Section */}
        <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          Online Friends
        </Typography>
        <AvatarGroup max={7}>
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Travis Howard"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
          <Avatar
            alt="Cindy Baker"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
          <Avatar
            alt="Agnes Walker"
            src="https://material-ui.com/static/images/avatar/4.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/5.jpg"
          />
          <Avatar
            alt="Cindy Baker"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
          <Avatar
            alt="Agnes Walker"
            src="https://material-ui.com/static/images/avatar/4.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="/https://material-ui.com/static/images/avatar/5.jpg"
          />
        </AvatarGroup>
        <Typography variant="h6" fontWeight={100} mt={3} mb={2}>
          Latest Photos
        </Typography>
        <ImageList
          sx={
            matches
              ? {
                  width: 400,
                  maxHeight: 100,
                  overflow: "hidden",
                }
              : {
                  width: 250,
                  maxHeight: 100,
                  overflow: "hidden",
                }
          }
          cols={matches ? 3 : 2}
          rowHeight={150}
        >
          {itemData.slice(0, matches ? 3 : 2).map((item) => (
            <ImageListItem key={item.img}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  style={{ width: "100%", height: "80%" }}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
            </ImageListItem>
          ))}
        </ImageList>
        <RecentTrend></RecentTrend>
      </Box>
    </Box>
  );
};

export default RigthBar;
