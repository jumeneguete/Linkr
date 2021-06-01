import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useInterval from 'react-useinterval';

import UserContext from '../../contexts/UserContext';
import UserFollowersContext from '../../contexts/UserFollowersContext';
import GenericPage from '../GenericPage/GenericPage';

export default function Timeline() {

    const { userProfile } = useContext(UserContext);
    const { setFollowers } = useContext(UserFollowersContext);
    const { token } = userProfile
    const [postsList, setPostsList] = useState(null);
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const [morePostsToLoad, setMorePostsToLoad] = useState(true)
    console.log(postsList)

    useInterval(reloadPosts, 15000)
    useEffect(callServer, [token, setFollowers])

    function callServer() {
        
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts', config);
        request.then(response => {
            setPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts"))
        
        const followersRequest = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows', config);
        followersRequest.then( response => {
            setFollowers(response.data.users)
        })
    }
    function loadMorePosts() {
        if(!postsList || postsList.length === 0) return;
        const lastPostId = postsList[postsList.length - 1].id;
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?olderThan=${lastPostId}`, config);
        request.then(response => {
            if(response.data.posts.length > 0){
                setPostsList(postsList.concat(response.data.posts))
            } else {
                setMorePostsToLoad(false)
            }
        });
    }
    function reloadPosts() {
        if(!postsList || postsList.length === 0) return;
        
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts', config);
        request.then(response => {
            const newPosts = (postsList.filter(p => response.data.posts.includes(p)))
            setPostsList(newPosts.concat(postsList))
        });
    }

    return(
        <>
            <GenericPage 
            title={`timeline`} 
            arrayOfPosts={postsList} 
            setArrayOfPosts={setPostsList} 
            loadMorePosts={loadMorePosts} 
            morePostsToLoad={morePostsToLoad}
            />
        </>
    );
}