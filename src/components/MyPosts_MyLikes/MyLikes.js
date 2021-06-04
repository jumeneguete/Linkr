import { useState, useEffect, useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import GenericPage from '../GenericPage/GenericPage';
import {callServer} from '../GenericPage/GenericFunctions';

export default function UserPosts() {

    const { userProfile } = useContext(UserContext);
    const [myLikesList, setMyLikesList] = useState(null);
    const [morePostsToLoad, setMorePostsToLoad] = useState(true);

    const pageUrl = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked`;
    const erroAlert = "Ocorreu um erro ao carregar os seus likes";

    const urlToGetMorePosts = (!myLikesList || myLikesList.length === 0) ? "": 
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked?olderThan=${myLikesList[myLikesList.length - 1].id}`;

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