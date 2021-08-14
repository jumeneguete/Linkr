import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useInterval from 'react-useinterval';

import UserContext from '../contexts/UserContext';
import GenericPage from '../components/GenericPage/GenericPage';
import {callServer, reloadPosts} from '../components/GenericPage/GenericFunctions';

export default function HashtagPosts() {

    const { userProfile } = useContext(UserContext);
    const { hashtag } = useParams();
    const [hashtagPostsList, setHashtagPostsList] = useState(null);
    const [morePostsToLoad, setMorePostsToLoad] = useState(true);

    const pageUrl = `${process.env.REACT_APP_API_BASE_URL}/linkr/hashtags/${hashtag}/posts`;
    const erroAlert = "Ocorreu um erro ao carregar os posts da hashtag";

    const lastPostId = hashtagPostsList[hashtagPostsList.length - 1].id
    const urlToGetMorePosts = (!hashtagPostsList || hashtagPostsList.length === 0) ? "": 
    `${process.env.REACT_APP_API_BASE_URL}/linkr/hashtags/${hashtag}/posts?olderThan=${lastPostId}`;

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        callServer(setHashtagPostsList, pageUrl, erroAlert, config);
    }, [userProfile, pageUrl])

    useInterval(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        reloadPosts(hashtagPostsList, setHashtagPostsList, pageUrl, erroAlert, config)
    }, 15000);

    return(
        <>
            {hashtagPostsList && 
            <GenericPage title={`# ${hashtag}`} 
            arrayOfPosts={hashtagPostsList} 
            setArrayOfPosts={setHashtagPostsList}
            morePostsToLoad={morePostsToLoad}
            setMorePostsToLoad={setMorePostsToLoad}
            url={urlToGetMorePosts}
            />}
        </>
    );
}