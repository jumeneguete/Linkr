import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from '../contexts/UserContext';
import UserFollowersContext from '../contexts/UserFollowersContext';

import GlobalStyle from "../styles/GlobalStyle";
import Login from './Login_SignUp/Login';
import SignUp from './Login_SignUp/SignUp';
import Header from "./Header/Header";
import Timeline from './Timeline/Timeline';
import UserPosts from "./UserPosts/UserPosts";
import HashtagPosts from "./HashtagPosts/HashtagPosts";
import MyPosts from './MyPosts_MyLikes/MyPosts';
import MyLikes from './MyPosts_MyLikes/MyLikes';

export default function App() {
    const alreadyLoggedIn = localStorage.getItem("lastLogin");
    const [userProfile, setUserProfile] = useState(alreadyLoggedIn && JSON.parse(alreadyLoggedIn));  
    const [followers, setFollowers] = useState(null);  

    return (
        <UserContext.Provider value={{ userProfile, setUserProfile }}>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/sign-up">
                        <SignUp />
                    </Route>
                    <UserFollowersContext.Provider value={{ followers, setFollowers }}>
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
                        <Route path= "/my-posts">
                            <Header />
                            <MyPosts />
                        </Route>
                        <Route path= "/my-likes">
                            <Header />
                            <MyLikes />
                        </Route>
                    </UserFollowersContext.Provider>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}