import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import useInterval from 'react-useinterval';

import UserContext from '../../contexts/UserContext';
import UserFollowersContext from '../../contexts/UserFollowersContext';
import GenericPage from '../GenericPage/GenericPage';
import {callServer, reloadPosts} from '../GenericPage/GenericFunctions';

export default function UserPosts() {

    
    const { userProfile } = useContext(UserContext);
    const { followers } = useContext(UserFollowersContext);
    const { id } = useParams();
    const history = useHistory();
    const [userPostsList, setUserPostsList] = useState(null);
    const [isFollowing, setIsFollowing] = useState({status: followers && followers.find(f => f.id === Number(id)), isDisabled: false})
    const userName = userPostsList && userPostsList[0].user.username;
    const [morePostsToLoad, setMorePostsToLoad] = useState(true)

    const pageUrl = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`;
    const erroAlert = "Ocorreu um erro ao carregar os posts do usuario";
    
    const urlToGetMorePosts = (!userPostsList || userPostsList.length === 0) ? "": 
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts?olderThan=${userPostsList[userPostsList.length - 1].id}`;

    useInterval(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        reloadPosts(userPostsList, setUserPostsList, pageUrl, erroAlert, config)
    }, 15000);
    
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        if(Number(id) === userProfile.user.id) {
            history.push("/my-posts")
            return;
        };
        callServer(setUserPostsList, pageUrl, erroAlert, config);
    }, [history, pageUrl, id, userProfile])

    function followUser() {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
        if(isFollowing.isDisabled) return;
        setIsFollowing({...isFollowing, isDisabled:true})
        const url = isFollowing.status ?
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/unfollow`:
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/follow`

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