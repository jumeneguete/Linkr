import { useState, useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import styled from 'styled-components';

import UserContext from '../../../contexts/UserContext';

export default function LikePost({postDetails, index, arrayOfPosts, setArrayOfPosts}) {

    const { userProfile } = useContext(UserContext);
    const token = userProfile.token
    const { id, likes } = postDetails;
    const [postLiked, setPostLiked] = useState(likes.find(l => l["user.id"] === userProfile.user.id || l["id"] === userProfile.user.id))

    function handleLikes() {
        ReactTooltip.rebuild();
        const newArrayOfPosts = [...arrayOfPosts];
        const config = { headers: { Authorization: `Bearer ${token}` } }
        let request;
        if (!postLiked) {
            request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}/like`, {}, config);
        } else {
            request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}/dislike`, {}, config);
        }
        request.then(response => {
            const newPost = { ...postDetails, likes: response.data.post.likes };
            newArrayOfPosts[index] = newPost;
            setArrayOfPosts(newArrayOfPosts)
            setPostLiked(!postLiked);
    
        })
    };

    return(
        <>
            {postLiked ? <IoHeartSharp onClick={handleLikes} color={'#AC0000'} /> : <IoHeartOutline onClick={handleLikes} color={'#FFFFFF'}  />}
            <LikesContainer data-tip data-for={`${id}`}>
                {likes ? `${likes.length} likes` : "0 like" }
            </LikesContainer>
            <StyledReactTooltip border place="bottom" effect="solid" id={`${id}`}>
                <span>
                    {likes[0] ? 
                        likes[1] ? 
                            likes[2] ? 
                                `${likes[0]["user.username"]||likes[0]["username"]}, ${likes[1]["user.username"]||likes[1]["username"]} e outras ${likes.length - 2} pessoas` 
                            : `${likes[0]["user.username"]||likes[0]["username"]}, ${likes[1]["user.username"]||likes[1]["username"]} ` 
                        : `${likes[0]["user.username"]||likes[0]["username"]}`
                    : `0 like`}
                </span>
            </StyledReactTooltip>
        </>
        
    );
}

const LikesContainer = styled.div`
 margin-top: 5px;
font-size: 11px;
color: #fff;
cursor: pointer;
`;

const StyledReactTooltip = styled(ReactTooltip)`

background: rgba(255, 255, 255, 0.9) !important;
color: #505050 !important;
border-radius: 3px !important;
padding: 5px !important;

    &:after{
        border-bottom-color: #e7e7e7 !important;
    }
`;