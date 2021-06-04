import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CreatePost, StyledButtom } from '../GenericPage/Styles'
import UserContext from '../../contexts/UserContext';
import LocationButton from '../UserPosts/LocationButton'
import { Link } from 'react-router-dom';

export default function UserInput ({ setArrayOfPosts }) {
    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const [ clicked, setClicked ] = useState(false);
    const [ userComment, setUserComment ] = useState('');
    const [ userLink, setUserLink ] = useState('');
    const [location, setLocation] = useState(false);

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

        if (location) {
            postObj.geolocation = {};
            postObj.geolocation.latitude = location.latitude;
            postObj.geolocation.longitude = location.longitude;
          }

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
        <CreatePost clicked={clicked}>
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

                <div className= "footer">
                <LocationButton setLocation={setLocation} />
                {   clicked
                    ? <StyledButtom disabled={clicked}>Publicando...</StyledButtom> 
                    : <StyledButtom type='submit'>Publicar</StyledButtom>  
                }
                </div>  
            </form>
        </CreatePost>
    );
}

