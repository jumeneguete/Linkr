import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import useInterval from 'react-useinterval';

import UserContext from '../contexts/UserContext';
import UserFollowersContext from '../contexts/UserFollowersContext';
import GenericPage from '../components/GenericPage/GenericPage';
import {callServer, reloadPosts} from '../components/GenericPage/GenericFunctions';

export default function UserPosts() {
    
    const { userProfile } = useContext(UserContext);
    const { followers } = useContext(UserFollowersContext);
    const { id } = useParams();
    const history = useHistory();
    const [userPostsList, setUserPostsList] = useState(null);
    const [isFollowing, setIsFollowing] = useState({status: followers && followers.find(f => f.id === Number(id)), isDisabled: false})
    const userName = userPostsList && userPostsList.length > 0 && userPostsList[0].user.username;
    const [morePostsToLoad, setMorePostsToLoad] = useState(true)

    const pageUrl = `${process.env.REACT_APP_API_BASE_URL}/users/${id}/posts`;
    const erroAlert = "Ocorreu um erro ao carregar os posts do usuario";
    
    let urlToGetMorePosts = "";

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        if(Number(id) === userProfile.user.id) {
            history.push("/my-posts")
            return;
        };
        callServer(setUserPostsList, pageUrl, erroAlert, config);
    }, [history, pageUrl, id, userProfile])

    if(userPostsList && userPostsList.length > 0) {
        const lastPostId = userPostsList[userPostsList.length - 1].id;
        urlToGetMorePosts = `${process.env.REACT_APP_API_BASE_URL}/users/${id}/posts?olderThan=${lastPostId}`;
    }

    useInterval(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        reloadPosts(userPostsList, setUserPostsList, pageUrl, erroAlert, config)
    }, 15000);

    function followUser() {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        if(isFollowing.isDisabled) return;
        setIsFollowing({...isFollowing, isDisabled:true})
        const url = isFollowing.status ?
        `${process.env.REACT_APP_API_BASE_URL}/users/${id}/unfollow`:
        `${process.env.REACT_APP_API_BASE_URL}/users/${id}/follow`

        const request = axios.post(url, {}, config);
        request.then(response => {
            setIsFollowing({status: !isFollowing.status, isDisabled: false});
        });
        request.catch(erro => alert("Ocorreu um erro ao seguir esse usuario"));
    }

    return(
        <>
            {userPostsList &&  
            <GenericPage 
            title={`${userName}'s Posts`} 
            arrayOfPosts={userPostsList} 
            setArrayOfPosts={setUserPostsList}
            isFollowing={isFollowing} 
            followUser={followUser}
            morePostsToLoad={morePostsToLoad}
            setMorePostsToLoad={setMorePostsToLoad}
            url={urlToGetMorePosts}
            />}
        </>
    );
}