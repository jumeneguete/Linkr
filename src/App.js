import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import './assets/styles/reset.css';
import UserContext from './contexts/UserContext';
import UserFollowersContext from './contexts/UserFollowersContext';
import GlobalStyle from "./assets/styles/GlobalStyle";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Header from "./components/Header";
import Timeline from './pages/Timeline';
import UserPosts from "./pages/UserPosts";
import HashtagPosts from "./pages/HashtagPosts";
import MyPosts from './pages/MyPosts';
import MyLikes from './pages/MyLikes';
import axios from "axios";

export default function App() {
    const alreadyLoggedIn = localStorage.getItem("lastLogin");
    const [userProfile, setUserProfile] = useState(alreadyLoggedIn && JSON.parse(alreadyLoggedIn));  
    const [followers, setFollowers] = useState(null);
    
    useEffect(() => {
        if (userProfile){
            const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
            const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows', config);
            request.then( response => {
                setFollowers(response.data.users)
            })
        }
        // eslint-disable-next-line
    }, [])


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