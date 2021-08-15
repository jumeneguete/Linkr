import React, { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function CreatePost ({ setArrayOfPosts }) {
    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const [ clicked, setClicked ] = useState(false);
    const [ userComment, setUserComment ] = useState('');
    const [ userLink, setUserLink ] = useState('');

    function submitComment (e) {
        e.preventDefault();

        if (userLink.length) {
            setClicked(true);
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
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts',postObj,config);
        request.then(userPostSucceeded).catch(userPostFailed);
    }
    
    function userPostSucceeded () {
        setUserLink('');
        setUserComment('');
        setClicked(false);
        getPost();
    }

    function getPost(){
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config);
        request.then(response => {
            setArrayOfPosts(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts"))
    }

    function userPostFailed () {
        alert('Desculpe, ocorreu um erro ao publicar seu link');
        setClicked(false);
    }

    return (
        <CreatePostContainer clicked={clicked}>
            <Link to="/my-posts"><img src={userProfile.user.avatar} alt={userProfile.user.username}/></Link>
            <form onSubmit={(event) => submitComment(event)}>

                <h2>O que você tem pra favoritar hoje?</h2>

                <input type='url' 
                    placeholder='https//...' 
                    onChange={(e) => setUserLink(e.target.value)} 
                    value={userLink} 
                    disabled={clicked}
                />

                <textarea type='text' 
                    placeholder='Muito irado esse post falando de #JavaScript' 
                    onChange={(e) => setUserComment(e.target.value)} 
                    value={userComment} 
                    disabled={clicked}
                />

                {   clicked
                    ? <StyledButtom disabled={clicked}>Publicando...</StyledButtom> 
                    : <StyledButtom type='submit'>Publicar</StyledButtom>  
                }  

            </form>
        </CreatePostContainer>
    );
}

const StyledButtom = styled.button`
font-size: 15px;
background: ${ props => props.clicked ? '#EFEFEF' : '#1877F2'};
border-radius: 5px;
color: ${ props => props.clicked ? '#1877F2' : '#FFF'};
font-weight: 700;
padding: 10px;
text-align: center;
border: none;
width: 120px;
cursor: pointer;
`;

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
    img {
        border-radius: 50%;
        height: 50px;
        margin-right: 20px;
        width: 50px;
        object-fit: cover;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
        button {
            font-size: 15px;
            background: ${ props => props.clicked ? '#CCC' : '#1877F2'};
            cursor: ${ props => props.clicked ? 'not-allowed' : 'pointer'};
            border-radius: 5px;
            color: #FFF;
            font-weight: 700;
            padding: 10px;
            text-align: center;
            border: none;
            width: 120px;
        }

        h2 {
            font-size: 20px;
            margin-bottom: 10px;
            width: 100%;
        }
        
        input, textarea {
            background: #EFEFEF;
            border-radius: 5px;
            cursor: text;
            flex-grow: grow;
            margin-bottom: 10px;
            overflow-wrap: anywhere;
            padding: 10px;
            width: 100%;
            border: none;
            box-shadow:none;
        }
        input[type=text] {
            flex-grow: 1;
        }

        textarea {
            height: 70px;
            resize: none;
        }

        input::placeholder, textarea::placeholder{
            font-family: "Lato", sans-serif;
            padding-top: 0;
            font-size: 15px;
            color: #949494;
        }

        input:focus, textarea:focus{
            box-shadow: 0 0 0 0;
            outline: 0;
        }
    }
    @media (max-width: 614px) {
        border-radius: 0;
        height: 200px;
        padding: 20px;
        width: 100vw;
        form {
            padding-right: 20px;

            button {
                font-size: 15px;
                margin-top: 5px;
                padding: 7px;
            }
        
            h2 {
                font-size: 18px;
                letter-spacing: -0.5px;
                margin-bottom: 15px;
                text-align: center;
            }
           
            input, textarea {
                font-size: 16px;
                margin-bottom: 5px;
            }
            input {
                height: 30px;
            }

            textarea {
                height: 60px;
            }

        }
        
        img {
            display: none;
        }
    }
`;