import { CircleNotifications, Home, People, PostAdd, Search, Settings } from "@mui/icons-material";

export  const menuItems = [
  { icon: <Home />, text: "Homepage", href: "/home" },
  {
    icon: <Search />,
    text: "Search",
  },
  { icon: <PostAdd />, text: "New post", href: "/newPost" },
  {
    icon: <CircleNotifications />,
    text: "Notifications",
    href: "/notifications",
  },
  { icon: <People />, text: "Friends", href: "/friends" },
  { icon: <Settings />, text: "Setting", href: "/setting" },
]; 