import { useState, useEffect } from 'react';
import axios from 'axios';

import GenericPage from '../GenericPage/GenericPage';
import GlobalStyle from '../../styles/GlobalStyle';

export default function Timeline() {
    const token = '8181382a-f871-4195-ade8-982e9eb999fa';
    const [postsList, setPostsList] = useState(null);

    useEffect(() => {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config);
        request.then(response => {
            setPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts"))
    }, [])

    return(
        <>
            <GlobalStyle />
            <GenericPage title={`timeline`} arrayOfPosts={postsList}/>
        </>
    );
}