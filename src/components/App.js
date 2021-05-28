import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from '../contexts/UserContext';

import GlobalStyle from "../styles/GlobalStyle";
import Login from './Login_SignUp/Login';
import SignUp from './Login_SignUp/SignUp';
import Timeline from './Timeline/Timeline';
import UserPosts from "./UserPosts/UserPosts";
import HashtagPosts from "./HashtagPosts/HashtagPosts";

// eslint-disable-next-line
export default function App() {
    const alreadyLoggedIn = localStorage.getItem("lastLogin");
    const [userProfile, setUserProfile] = useState(JSON.parse(alreadyLoggedIn));    

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
                    <Route path="/timeline">
                        <Timeline />
                    </Route>
                    <Route path="/user/:id">
                        <UserPosts />
                    </Route>
                    <Route path="/user/:id">
                        <UserPosts />
                    </Route>
                    <Route path="/hashtag/:hashtag">
                        <HashtagPosts />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}