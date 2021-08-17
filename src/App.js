import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/reset.css";
import { UserProvider } from "./contexts/UserContext";
import { FollowersProvider } from "./contexts/UserFollowersContext";
import GlobalStyle from "./assets/styles/GlobalStyle";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/header/Header";
import Timeline from "./pages/Timeline";
import UserPosts from "./pages/UserPosts";
import HashtagPosts from "./pages/HashtagPosts";
import MyPosts from "./pages/MyPosts";
import MyLikes from "./pages/MyLikes";

export default function App() {
  return (
    <UserProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>

          <FollowersProvider>
            <Route path="/timeline">
              <Header />
              <Timeline />
            </Route>
            <Route path="/user/:id">
              <Header />
              <UserPosts />
            </Route>
            <Route path="/hashtag/:hashtag">
              <Header />
              <HashtagPosts />
            </Route>
            <Route path="/my-posts">
              <Header />
              <MyPosts />
            </Route>
            <Route path="/my-likes">
              <Header />
              <MyLikes />
            </Route>
          </FollowersProvider>
        </Switch>
      </Router>
    </UserProvider>
  );
}
