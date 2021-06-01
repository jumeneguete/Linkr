import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import UserFollowersContext from '../../contexts/UserFollowersContext';
import GenericPage from '../GenericPage/GenericPage';

export default function UserPosts() {

    
    const { userProfile } = useContext(UserContext);
    const { followers } = useContext(UserFollowersContext);
    const { token } = userProfile
    const { id } = useParams();
    const history = useHistory();
    const [userPostsList, setUserPostsList] = useState(null);
    const [isFollowing, setIsFollowing] = useState({status: followers && followers.find(f => f.id === Number(id)), isDisabled: false})
    const userName = userPostsList && userPostsList[0].user.username;

    useEffect(() => {
        if(Number(id) === userProfile.user.id) {
            history.push("/my-posts")
            return;
        };
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`, config);
        request.then(response => {
            setUserPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts do usuario"))
    }, [id, token, history, userProfile])

    function followUser() {
        if(isFollowing.isDisabled) return;
        setIsFollowing({...isFollowing, isDisabled:true})
        const url = isFollowing.status ?
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/unfollow`:
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/follow`
       
        const config ={ headers: { Authorization: `Bearer ${token}` }}

        const request = axios.post(url, {}, config);
        request.then(response => {
            setIsFollowing({status: !isFollowing.status, isDisabled: false});
        });
        request.catch(erro => alert("Ocorreu um erro ao seguir esse usuario"));
    }

    return(
        <>
            {userPostsList &&  <GenericPage title={`${userName}'s Posts`} arrayOfPosts={userPostsList} isFollowing={isFollowing} followUser={followUser}/>}
        </>
    );
}