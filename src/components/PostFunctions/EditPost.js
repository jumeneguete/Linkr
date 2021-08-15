import { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { callServer } from '../GenericPage/GenericFunctions';

import UserContext from '../../contexts/UserContext';

export default function EditPost({ postDetails, setOnEditingPost, setArrayOfPosts, pageUrl }) {

    const { userProfile } = useContext(UserContext);
    const { token } = userProfile

    const { text, id } = postDetails;
    const [postMainDescription, setPostMainDescription] = useState(text);
    const [onSendingPostEdition, setOnSendingPostEdition] = useState(false);

    const textEditRef = useRef();

    useEffect(() => {
        if (textEditRef.current)
            textEditRef.current.focus();
    }, []);

    function sendEditedPostToServer() {
        setOnSendingPostEdition(true);
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const request = axios.put(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`, { 'text': postMainDescription }, config);

        request.then(() => {
            setOnSendingPostEdition(false);  //input desabilitado
            setOnEditingPost(false);  //edição finalizada
            const erroAlert = "Ocorreu um erro ao carregar os posts";
            callServer(setArrayOfPosts, pageUrl, erroAlert, config);
        })
        request.catch(() => {
            setOnSendingPostEdition(false);
            setOnEditingPost(false);
            alert("A alteração não foi possível de ser concluída!");
            setPostMainDescription(text);
        })
    }
    return(
        <input 
            ref = {textEditRef}
            disabled = {onSendingPostEdition}
            value = {postMainDescription}
            onChange ={e => setPostMainDescription(e.target.value)}
            onKeyDown = { (event) => {
                if(event.key === "Escape") {
                    setOnEditingPost(false);
                    setPostMainDescription(text);
                }                               
                else if (event.key === "Enter") 
                    sendEditedPostToServer();
            }}
        /> 
    );
}