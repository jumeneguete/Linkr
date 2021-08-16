import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BsPencil } from 'react-icons/bs';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import PostLocation from './postLocation/PostLocation';
import DeletePost from './postFeatures/DeletePost';

export default function PostHeader({postDetails, OnEditingPost, setOnEditingPost, setArrayOfPosts, pageUrl}) {

    const { userProfile } = useContext(UserContext);
    const { user, geolocation } = postDetails;
    const { id, username } = user;

    return (
        <HeaderContainer>
            <PostCreator>
                <Link to={`/user/${id}`}>
                    {username}
                </Link>
                {geolocation && 
                    <PostLocation
                        user={username}
                        geolocation={geolocation}
                    />
                }
            </PostCreator>
            
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

const PostCreator = styled.div`
    display: flex;
    height: 23px;
    font-size: 19px;
    color: #FFFFFF;
    
    @media (max-width: 614px) {
        font-size: 17px;
    }
`;

const IconsContainer = styled.div`
    width: 40px;
    display:flex;
    justify-content: space-between;
`;