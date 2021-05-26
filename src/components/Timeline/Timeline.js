import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import GenericPage from '../GenericPage/GenericPage';

export default function Timeline() {

    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const [postsList, setPostsList] = useState(null);

    useEffect(() => {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config);
        request.then(response => {
            setPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts"))
    }, [token])

    return(
        <>
            <GenericPage title={`timeline`} arrayOfPosts={postsList}/>
        </>
    );
}