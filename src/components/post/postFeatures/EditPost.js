import { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { callServer } from'../../../functions/apiFunctions';
import UserContext from '../../../contexts/UserContext';

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
        <EditInput 
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

const EditInput = styled.input`
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    cursor: text;
    flex-grow: grow;
    margin-bottom: 10px;
    overflow-wrap: anywhere;
    padding: 10px;
    width: 100%;
    box-shadow:none;
    flex-grow: 1;
    box-shadow: 0 0 0 0;
    outline: 0;
`;