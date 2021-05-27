import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import ReactHashtag from "react-hashtag";
import Modal from "../UserPosts/Modal";
import axios from 'axios';
import UserContext from '../../contexts/UserContext'

import { SinglePost, Profile, PostContent, CreatorName, Description, LinkContainer, LinkInfo, LinkImg, Hashtag } from "./Styles";

export default function Post({ postDetails, setArrayOfPosts}) {
    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const history = useHistory()
    const[postLiked, setPostLiked] = useState(false)
    const { text, link, linkTitle, linkDescription, linkImage, user, likes } = postDetails;
    const { username, avatar } = user;
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    function likePost() {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postDetails.id}/like`,{}, config);
        request.then( response => {
            setPostLiked(true)
        })
    }

    function Delete () {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        setIsLoading(true);
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postDetails.id}`,config);
        request.then(deleteSucceeded).catch(errorHandle);
    }

    function deleteSucceeded () {
        setIsLoading(false);
        setModalIsOpen(!modalIsOpen);
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

    function errorHandle () {
        setIsLoading(false);
        setModalIsOpen(!modalIsOpen);
        alert(`Sorry, we couln't delete your post`);
    }


    return(
        <SinglePost>
            <Profile>
                <img src={avatar} alt={username}/>
                {postLiked ? <IoHeartSharp color={'#AC0000'} size={25} /> : <IoHeartOutline onClick={likePost} color={'#FFFFFF'}  />}
                <p>{likes === undefined ? 0 : likes.length } likes</p>
            </Profile>
            <PostContent>
                <div className='icones'>
                    <Link to={`/user/${user.id}`}><CreatorName>{username}</CreatorName></Link>
                    
                    {userProfile.user.username === username && 
                            <BsTrash color="#FFFFFF" onClick={() => setModalIsOpen(!modalIsOpen)}/>
                        } 

                    < Modal 
                        modalIsOpen = { modalIsOpen }
                        setModalIsOpen = { setModalIsOpen }
                        Delete={Delete}
                        isLoading = { isLoading }
                    />

                </div>
                <Description>
                    <ReactHashtag renderHashtag={(val) => (
                        <Link to={`/hashtag/${val.replace("#", "")}`} ><Hashtag >{val}</Hashtag></Link>)}>
                        {text}
                    </ReactHashtag>
                </Description>
                <a href={link} target="_blank" rel="noreferrer">
                    <LinkContainer>
                        <LinkInfo>
                        <h1>{linkTitle}</h1>
                        <p>{linkDescription}</p>
                        <span>{link}</span>
                        </LinkInfo>
                        <LinkImg backgroud={linkImage} />
                    </LinkContainer>
                </a>
            </PostContent>
        </SinglePost>
    );
}
