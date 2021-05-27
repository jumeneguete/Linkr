import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import ReactHashtag from "react-hashtag";
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import { SinglePost, Profile, PostContent, CreatorName, Description, LinkContainer, LinkInfo, LinkImg, Hashtag } from "./Styles";

export default function Post({ postDetails}) {

    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const[postLiked, setPostLiked] = useState(false)
    const { text, link, linkTitle, linkDescription, linkImage, user, likes } = postDetails;
    const { username, avatar } = user;
    console.log(text.split("#"))
    
    function likePost() {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postDetails.id}/like`,{}, config);
        request.then( response => {
            setPostLiked(true)
        })
    }
    return(
        <SinglePost>
            <Profile>
                <img src={avatar} alt={username}/>
                {postLiked ? <IoHeartSharp color={'#AC0000'} size={25} /> : <IoHeartOutline onClick={likePost} color={'#FFFFFF'}  />}
                <p>{likes === undefined ? 0 : likes.length } likes</p>
            </Profile>
            <PostContent>
                <Link to={`/user/${user.id}`}><CreatorName>{username}</CreatorName></Link>
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

