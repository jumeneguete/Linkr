import { useState, useEffect, useContext } from 'react';

import UserContext from '../contexts/UserContext';
import GenericPage from '../components/GenericPage/GenericPage';
import {callServer} from '../components/GenericPage/GenericFunctions';

export default function UserPosts() {

    const { userProfile } = useContext(UserContext);
    const { user } = userProfile
    const { id } = user;
    const [myPostsList, setMyPostsList] = useState(null);
    const [morePostsToLoad, setMorePostsToLoad] = useState(true);

    const pageUrl = `${process.env.REACT_APP_API_BASE_URL}/linkr/users/${id}/posts`;
    const erroAlert = "Ocorreu um erro ao carregar os seus posts";

    const lastPostId = myPostsList[myPostsList.length - 1].id;
    const urlToGetMorePosts = (!myPostsList || myPostsList.length === 0) ? "": 
    `${process.env.REACT_APP_API_BASE_URL}/linkr/users/${id}/posts?olderThan=${lastPostId}`;

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