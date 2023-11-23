import { Box, Container, Stack } from "@mui/material";
import RigthBar from "./componnets/layout/rightBar/RigthBar";
import Sidebar from "./componnets/layout/sidebar/Sidebar";
import Navbar from "./componnets/layout/navbar/Navbar";
import {  useState } from "react";
import AllRoutes from "./routes/AllRoutes";
import SignRoutes from "./routes/signRoutes";
import { useAuth } from "./context/AuthContext";
import theme from "./theme/index";
import { ThemeProvider } from "@mui/material/styles";
function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const { signInSuccessful } = useAuth();

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Navbar className="a" openSearch={openSearch}></Navbar>
        {!signInSuccessful ? (
          <Container sx={{ maxWidth: "xs" }} className="background-container">
            <SignRoutes></SignRoutes>
          </Container>
        ) : (
          <Box>
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
        )}
      </ThemeProvider>
    </Box>
  );
}

export default App;
