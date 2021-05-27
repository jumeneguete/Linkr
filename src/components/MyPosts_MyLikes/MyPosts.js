import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import GenericPage from '../GenericPage/GenericPage';

export default function UserPosts() {

    const { userProfile } = useContext(UserContext);
    const { token, user } = userProfile
    const { id } = user;
    const [myPostsList, setMyPostsList] = useState(null);

    useEffect(() => {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`, config);
        request.then(response => {
            setMyPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os seus posts"))
    }, [id, token])

    return(
        <>
            {myPostsList && <GenericPage title={`My Posts`} arrayOfPosts={myPostsList} setArrayOfPosts={setMyPostsList} />}
        </>
    );
}