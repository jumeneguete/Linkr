import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BsPencil } from 'react-icons/bs';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import DeletePost from './PostFeatures/DeletePost';
import { CreatorName } from "../SinglePost/Styles";

export default function PostHeader({postDetails, OnEditingPost, setOnEditingPost, setArrayOfPosts, pageUrl}) {

    const { userProfile } = useContext(UserContext);
    const { id, username } = postDetails.user;

    return (
        <HeaderContainer>
            <Link to={`/user/${id}`}><CreatorName>{username}</CreatorName></Link>
            
            {userProfile.user.id === id &&<IconsContainer>
                <DeletePost 
                    postDetails={postDetails}
                    setArrayOfPosts={setArrayOfPosts}
                    pageUrl={pageUrl}
                />
                <BsPencil 
                    color={'#FFFFFF'} 
                    cursor="pointer" 
                    onClick={() => {setOnEditingPost(!OnEditingPost)}}
                />
            </IconsContainer>}
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
`;

const IconsContainer = styled.div`
    width: 40px;
    display:flex;
    justify-content: space-between;
`;