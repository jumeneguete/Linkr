import { useState, useEffect, useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import GenericPage from '../GenericPage/GenericPage';
import {callServer} from '../GenericPage/GenericFunctions';

export default function UserPosts() {

    const { userProfile } = useContext(UserContext);
    const { user } = userProfile
    const { id } = user;
    const [myPostsList, setMyPostsList] = useState(null);
    const [morePostsToLoad, setMorePostsToLoad] = useState(true);

    const pageUrl = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`;
    const erroAlert = "Ocorreu um erro ao carregar os seus posts";

    const urlToGetMorePosts = (!myPostsList || myPostsList.length === 0) ? "": 
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts?olderThan=${myPostsList[myPostsList.length - 1].id}`;

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        callServer(setMyPostsList, pageUrl, erroAlert, config);
    }, [pageUrl, userProfile])

    return(
        <>
            {myPostsList && 
            <GenericPage title={`My Posts`} 
            arrayOfPosts={myPostsList} 
            setArrayOfPosts={setMyPostsList} 
            morePostsToLoad={morePostsToLoad}
            setMorePostsToLoad={setMorePostsToLoad}
            url={urlToGetMorePosts}
            />}
        </>
    );
}