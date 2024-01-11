import { Box, Container, Stack } from "@mui/material";
import RigthBar from "./componnets/layout/rightBar/RigthBar";
import Sidebar from "./componnets/layout/sidebar/Sidebar";
import Navbar from "./componnets/layout/navbar/Navbar";
import { useState } from "react";
import AllRoutes from "./routes/AllRoutes";
import SignRoutes from "./routes/SignRoutes";
import { useAuth } from "./context/AuthContext";
import { lightTheme, darkTheme } from "./theme/index";

import { ThemeProvider } from "@mui/material/styles";
function App() {
  const [openSearch, setOpenSearch] = useState(false);
const { signInSuccessful, isLoading } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  
  
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  return (
    <Box>
      <Box>
        {!signInSuccessful ? (
          <ThemeProvider theme={lightTheme}>
            {/* <Navbar className="a" openSearch={openSearch}></Navbar> */}

            <Box className="background-container">
              <SignRoutes></SignRoutes>
            </Box>
          </ThemeProvider>
        ) : (
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Navbar
              className="a"
              openSearch={openSearch}
              setDarkMode={setDarkMode}
            ></Navbar>
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.background.default,
                color: (theme) => theme.palette.text.primary,
                minHeight: "100vh",
              }}
            >
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Sidebar setOpenSearch={setOpenSearch} />
                <AllRoutes></AllRoutes>
                <RigthBar></RigthBar>
              </Stack>
            </Box>
          </ThemeProvider>
        )}
      </Box>
    </Box>
  );
}

export default App;
