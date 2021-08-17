import { Link } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";
import styled from 'styled-components';

import LikePost from './postFeatures/LikePost';
import RePost from './postRePost/RePost';

export default function Profile(props) {
    
    const { index, postDetails, openComments, setOpenComments, comments, arrayOfPosts, setArrayOfPosts, pageUrl } = props;
    const { id, username, avatar } = postDetails.user

    function toggleComments(e) {
        e.stopPropagation();

        const selection = !openComments;
        setOpenComments(selection);
    }

    return(
        <ProfileContainer>
            <Link to={`/user/${id}`}><img src={avatar} alt={username}/></Link>

            <LikePost postDetails={postDetails} index={index} arrayOfPosts={arrayOfPosts} setArrayOfPosts={setArrayOfPosts} />
            
            <CommentsContainer onClick={(event) => toggleComments(event)} >
                <AiOutlineComment color={'#FFFFFF'} />
                <p>{comments.length} comments</p>
            </CommentsContainer>

            <RePost 
                postDetails={postDetails}
                setArrayOfPosts={setArrayOfPosts}
                pageUrl={pageUrl}
            />
        </ProfileContainer>
    );
}
const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: calc(15% - 20px);
    img {
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        border-radius: 27px;
        object-fit: cover;
    }
    svg {
        font-size: 25px;
        cursor: pointer;
    }
@media (max-width: 614px) {
    img{
        width: 40px;
        height: 40px;
    }
    p{
        font-size: 9px;
    }
    svg {
        font-size: 15px;
    }
}
`;

const CommentsContainer = styled.div`
    margin-top: 18px;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        margin-top: 5px;
        font-size: 11px;
        color: #fff;
        text-align:center;
    }
`;