import { useState, useEffect, useContext } from 'react';

import UserContext from '../contexts/UserContext';
import GenericPage from '../components/GenericPage/GenericPage';
import {callServer} from '../components/GenericPage/GenericFunctions';

export default function UserPosts() {

    const { userProfile } = useContext(UserContext);
    const [myLikesList, setMyLikesList] = useState(null);
    const [morePostsToLoad, setMorePostsToLoad] = useState(true);

    const pageUrl = `${process.env.REACT_APP_API_BASE_URL}/linkr/posts/liked`;
    const erroAlert = "Ocorreu um erro ao carregar os seus likes";

    const lastPostId = myLikesList[myLikesList.length - 1].id;
    const urlToGetMorePosts = (!myLikesList || myLikesList.length === 0) ? "": 
    `${process.env.REACT_APP_API_BASE_URL}/linkr/posts/liked?olderThan=${lastPostId}`;

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        callServer(setMyLikesList, pageUrl, erroAlert, config);

    }, [pageUrl, userProfile])

    return(
        <>
            {myLikesList && 
            <GenericPage 
            title={`My Likes`} 
            arrayOfPosts={myLikesList} 
            setArrayOfPosts={setMyLikesList} 
            morePostsToLoad={morePostsToLoad}
            setMorePostsToLoad={setMorePostsToLoad}
            url={urlToGetMorePosts}
            />}
        </>
    );
}