import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import GenericPage from '../GenericPage/GenericPage';
import GlobalStyle from '../../styles/GlobalStyle';

export default function UserPosts() {

    const { id } = useParams();
    const token = '8181382a-f871-4195-ade8-982e9eb999fa';
    const [userPostsList, setUserPostsList] = useState(null);

    useEffect(() => {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`, config);
        request.then(response => {
            setUserPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts do usuario"))
    }, [id])

    return(
        <>
            <GlobalStyle />
            {userPostsList && <GenericPage title={`${userPostsList[0].user.username}'s Posts`} arrayOfPosts={userPostsList}/>}
        </>
    );
}