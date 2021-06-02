import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useInterval from 'react-useinterval';

import UserContext from '../../contexts/UserContext';
import UserFollowersContext from '../../contexts/UserFollowersContext';
import GenericPage from '../GenericPage/GenericPage';
import {callServer, reloadPosts} from '../GenericPage/GenericFunctions';

export default function Timeline() {

    const { userProfile } = useContext(UserContext);
    const { setFollowers } = useContext(UserFollowersContext);
    const [postsList, setPostsList] = useState(null);
    const [morePostsToLoad, setMorePostsToLoad] = useState(true);
    const pageUrl = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts';
    const erroAlert = "Ocorreu um erro ao carregar os posts";
    
    const urlToGetMorePosts = (!postsList || postsList.length === 0) ? "": 
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?olderThan=${postsList[postsList.length - 1].id}`;

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        callServer(setPostsList, pageUrl, erroAlert, config);

        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows', config);
        request.then( response => {
            setFollowers(response.data.users)
        })
    }, [userProfile, setFollowers]);
    
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