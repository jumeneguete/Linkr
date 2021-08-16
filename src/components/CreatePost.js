import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import { callServer } from '../functions/apiFunctions';

export default function CreatePost ({ setArrayOfPosts, pageUrl }) {

    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ buttonText, setbuttonText ] = useState('Publicar');
    const [ userLink, setUserLink ] = useState('');
    const [ userComment, setUserComment ] = useState('');

    function submitComment (e) {
        e.preventDefault();

        if (userLink.length) {
            setIsDisabled(true);
            setbuttonText('Publicando...')
            sendPost(formatObj()); 
        }
        else {
            alert(`Desculpe, você não pode publicar sem um link`);
        }
    }

    function formatObj () {
        const postObj = userComment.length
            ? {link: userLink, text: userComment}
            : {link: userLink};
        return postObj;
    }

    function sendPost (postObj) {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/posts`,postObj,config);
        request.then(() => {
            setUserLink('');
            setUserComment('');
            setIsDisabled(false);
            setbuttonText('Publicar');
            const erroAlert = "Ocorreu um erro ao carregar os posts";
            callServer(setArrayOfPosts, pageUrl, erroAlert, config);

        }).catch(userPostFailed);
    }

    function userPostFailed () {
        alert('Desculpe, ocorreu um erro ao publicar seu link');
        setIsDisabled(false);
        setbuttonText('Publicar');
    }

    return (
        <CreatePostContainer isDisabled={isDisabled}>
            <Link to="/my-posts">
                <ProfileImage 
                    src={userProfile.user.avatar} 
                    alt={userProfile.user.username}
                />
            </Link>
            <NewPostForm onSubmit={(event) => submitComment(event)}>

                <CreatePostTitle>O que você tem pra favoritar hoje?</CreatePostTitle>

                <NewLinkInput type='url' 
                    placeholder='https//...' 
                    onChange={(e) => setUserLink(e.target.value)} 
                    value={userLink} 
                    disabled={isDisabled}
                />

                <NewPostComment type='text' 
                    placeholder='Muito irado esse post falando de #JavaScript' 
                    onChange={(e) => setUserComment(e.target.value)} 
                    value={userComment} 
                    disabled={isDisabled}
                />

                <StyledButtom disabled={isDisabled} type='submit'>{buttonText}</StyledButtom>

            </NewPostForm>
        </CreatePostContainer>
    );
}

const CreatePostContainer = styled.div`
    background: #fff;
    border-radius: 15px;
    color: #707070;
    display: flex;
    font: 300 16px 'Lato', sans-serif;
    height: 250px;
    margin-bottom: 20px;
    padding: 25px;
    width: 600px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    @media (max-width: 614px) {
        border-radius: 0;
        height: 200px;
        padding: 20px;
        width: 100vw;
    }
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    height: 50px;
    margin-right: 20px;
    width: 50px;
    object-fit: cover;
    @media (max-width: 614px) {
        display: none;
    }
`;

const CreatePostTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 10px;
    width: 100%;
    @media (max-width: 614px) {
        font-size: 18px;
        letter-spacing: -0.5px;
        margin-bottom: 15px;
        text-align: center;
    }
`;

const NewPostForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;

    @media (max-width: 614px) {
        padding-right: 20px;
    }
`;

const NewPostComment = styled.textarea`

    background: #EFEFEF;
    border-radius: 5px;
    cursor: text;
    margin-bottom: 10px;
    overflow-wrap: anywhere;
    padding: 10px;
    width: 100%;
    border: none;
    box-shadow:none;
    height: 80px;
    resize: none;

    &::placeholder {
        font-family: "Lato", sans-serif;
        padding-top: 0;
        font-size: 15px;
        color: #949494;
    }

    &:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }

    @media (max-width: 614px) {
        font-size: 16px;
        margin-bottom: 5px;
        height: 60px;
    }
`;

const NewLinkInput = styled.input`
    background: #EFEFEF;
    border-radius: 5px;
    cursor: text;
    margin-bottom: 10px;
    overflow-wrap: anywhere;
    padding: 10px;
    width: 100%;
    border: none;
    box-shadow:none;
    height: 30px;
    &::placeholder {
        font-family: "Lato", sans-serif;
        padding-top: 0;
        font-size: 15px;
        color: #949494;
    }

    &:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }
    @media (max-width: 614px) {
        font-size: 16px;
        margin-bottom: 5px;
        height: 40px;
    }
`;

const StyledButtom = styled.button`
    font-size: 15px;
    background: ${ props => props.disabled ? '#EFEFEF' : '#1877F2'};
    border-radius: 5px;
    cursor: ${ props => props.clicked ? 'not-allowed' : 'pointer'};
    color: ${ props => props.disabled ? '#1877F2' : '#FFF'};
    font-weight: 700;
    padding: 10px;
    text-align: center;
    border: none;
    width: 120px;

    @media (max-width: 614px) {
        font-size: 15px;
        margin-top: 5px;
        padding: 7px;
    }
`;

