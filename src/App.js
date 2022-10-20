import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter as Router, /* Switch, Link,*/ Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Myvideos from "./pages/Myvideos";

const Container = styled.div`
  display:flex;
`;

const Main = styled.div`
  flex:7;
  background-color:${({ theme }) => theme.bg};
`;

const Wrapper = styled.div``;

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Router>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>

              <Routes>

                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trend"/>} />
                  <Route path="search" element={<Search/>} />
                  <Route path="myvideos" element={<Myvideos/>} />
                  <Route path="subscriptions" element={<Home type="sub"/>} />
                  <Route path="signin" element={<SignIn/>} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>

              </Routes>
              
            </Wrapper>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
