import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import GenericPage from '../GenericPage/GenericPage';

export default function HashtagPosts() {

    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const { hashtag } = useParams();
    const [hashtagPostsList, setHashtagPostsList] = useState(null);

    useEffect(() => {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`, config);
        request.then(response => {
            setHashtagPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts da hashtag"))
    }, [hashtag, token])

    return(
        <>
            {hashtagPostsList && <GenericPage title={`# ${hashtag}`} arrayOfPosts={hashtagPostsList} setArrayOfPosts={setHashtagPostsList}/>}
        </>
    );
}