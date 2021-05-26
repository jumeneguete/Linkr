import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import GenericPage from '../GenericPage/GenericPage';

export default function UserPosts() {

    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const { id } = useParams();
    const [userPostsList, setUserPostsList] = useState(null);
    const userName = userPostsList[0].user.username;

    useEffect(() => {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`, config);
        request.then(response => {
            setUserPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts do usuario"))
    }, [id, token])

    return(
        <>
            {userPostsList && <GenericPage title={userName === userProfile.user.username ? "My Posts" : `${userName}'s Posts`} arrayOfPosts={userPostsList}/>}
        </>
    );
}