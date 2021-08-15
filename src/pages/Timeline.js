import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useInterval from 'react-useinterval';

import UserContext from '../contexts/UserContext';
import UserFollowersContext from '../contexts/UserFollowersContext';
import GenericPage from '../components/GenericPage/GenericPage';
import {callServer, reloadPosts} from '../components/GenericPage/GenericFunctions';

export default function Timeline() {

    const { userProfile } = useContext(UserContext);
    const { setFollowers } = useContext(UserFollowersContext);
    const [postsList, setPostsList] = useState(null);
    const [morePostsToLoad, setMorePostsToLoad] = useState(true);
    const pageUrl = `${process.env.REACT_APP_API_BASE_URL}/following/posts`;
    const erroAlert = "Ocorreu um erro ao carregar os posts";
    let urlToGetMorePosts = "";

    if(postsList && postsList.length > 0) {
        const lastPostId = postsList[postsList.length - 1].id;
        urlToGetMorePosts = `${process.env.REACT_APP_API_BASE_URL}/following/posts?olderThan=${lastPostId}`;
    }

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        callServer(setPostsList, pageUrl, erroAlert, config);

        const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/follows`, config);
        request.then( response => {
            setFollowers(response.data.users)
        })
        // eslint-disable-next-line
    }, []);
    
    useInterval(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        reloadPosts(postsList, setPostsList, pageUrl, erroAlert, config)
    }, 15000);
    
    return(
        <>
            <GenericPage 
            title={`timeline`} 
            arrayOfPosts={postsList} 
            setArrayOfPosts={setPostsList}
            morePostsToLoad={morePostsToLoad}
            setMorePostsToLoad={setMorePostsToLoad}
            url={urlToGetMorePosts}
            />
        </>
    );
}