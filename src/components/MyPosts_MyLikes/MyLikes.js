import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import GenericPage from '../GenericPage/GenericPage';

export default function UserPosts() {

    const { userProfile } = useContext(UserContext);
    const { token, user } = userProfile
    const [myLikesList, setMyLikesList] = useState(null);

    useEffect(() => {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked`, config);
        request.then(response => {
            setMyLikesList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os seus likes"))
    }, [token])

    return(
        <>
            {myLikesList && <GenericPage title={`My Likes`} arrayOfPosts={myLikesList} setArrayOfPosts={""} />}
        </>
    );
}