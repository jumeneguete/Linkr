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
    
    useInterval(callServer, 15000)
    useEffect(callServer, [token, setFollowers])

    function callServer() {
        const config = { headers: { Authorization: `Bearer ${token}` }};
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

    return(
        <>
            <GenericPage title={`timeline`} arrayOfPosts={postsList} setArrayOfPosts={setPostsList}/>
        </>
    );
}