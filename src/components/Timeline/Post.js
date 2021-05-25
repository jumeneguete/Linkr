import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import styled from 'styled-components';
import ReactHashtag from "react-hashtag";
import axios from 'axios';

import { SinglePost } from "./Styles";

export default function Post({ postDetails}) {

    const token = '8181382a-f871-4195-ade8-982e9eb999fa';
    const history = useHistory()
    const[postLiked, setPostLiked] = useState(false)
    const userId = 11;
    const { text, link, linkTitle, linkDescription, linkImage, user, likes } = postDetails;
    const { username, avatar } = user;

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
                {postLiked ? <IoHeartSharp color={'#AC0000'} size={25} /> : <IoHeartOutline onClick={likePost} color={'#FFFFFF'} size={25} />}
                <p>{likes === undefined ? 0 : likes.length } likes</p>
            </Profile>
            <PostContent>
                <Link to={`/user/${user.id}`}><CreatorName>{username}</CreatorName></Link>
                <Description>
                    <ReactHashtag onHashtagClick={val => history.push(`/hashtag/${val}`)}>{text}</ReactHashtag>
                </Description>
                <a href={link} target="_blank"><LinkContainer>
                    <LinkInfo>
                    <h1>{linkTitle}</h1>
                    <p>{linkDescription}</p>
                    <span>{link}</span>
                    </LinkInfo>
                    <LinkImg backgroud={linkImage} />
                </LinkContainer></a>
            </PostContent>
        </SinglePost>
    );
}

const Profile = styled.div`
display: flex;
flex-direction: column;
align-items: center;
    img {
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        border-radius: 27px;
        object-fit: cover;
    }
    p {
        margin-top: 5px;
        color: #fff;
    }
`;
const PostContent = styled.div`
width: 503px;
`;
const CreatorName = styled.div`
height: 23px;
font-size: 19px;
line-height: 23px;
color: #FFFFFF;
`;
const Description = styled.div`
font-size: 17px;
line-height: 20px;
color: #B7B7B7;
margin: 10px 0;
    span{
        color: #FFFFFF;
    }
`;
const LinkContainer = styled.div`
display: flex;
justify-content: space-between;
height: 155px;
border: 1px solid #4D4D4D;
box-sizing: border-box;
border-radius: 11px;
`;
const LinkInfo = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 20px;

    h1 {
        font-size: 16px;
        line-height: 19px;
        color:#CECECE;
    }
    p {
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
    }
    span {
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
    }
`;
const LinkImg = styled.div`
min-width: 154px;
background: url(${props => props.backgroud});
background-size: cover;
border-radius: 0px 12px 13px 0px;
`;
