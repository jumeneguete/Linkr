import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";
import ReactHashtag from "react-hashtag";
import getYouTubeID from 'get-youtube-id';
import { BsPencil } from 'react-icons/bs';

import UserContext from '../../contexts/UserContext';
import { SinglePost, Profile, PostContent, CreatorName, Description, Hashtag, CommentsContainer } from "./Styles";

import {loadComments} from '../GenericPage/GenericFunctions';
import PostComments from './PostComments';
import LinkToContent from './LinkToContent';
import LikePost from '../PostFunctions/LikePost';
import DeletePost from '../PostFunctions/DeletePost';
import EditPost from '../PostFunctions/EditPost';
import YoutubeVideo from '../PostFunctions/YoutubeVideo';

export default function Post({ postDetails, setArrayOfPosts, index, arrayOfPosts }) {
    

    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    
    const { text, link, linkTitle, linkDescription, linkImage, id, user } = postDetails;
    
    const { username, avatar } = postDetails.user;
    
    
    const [OnEditingPost, setOnEditingPost] = useState(false);
    
    const [openComments, setOpenComments] = useState(false);
    const [comments, setComments] = useState([]);

    const youtubeLink = getYouTubeID(link);

    function toggleComments(e) {
        e.stopPropagation();

        const selection = !openComments;
        setOpenComments(selection);

    }

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const url = `${process.env.REACT_APP_API_BASE_URL}/posts/${id}/comments`;
        loadComments(url, setComments, config);
    // eslint-disable-next-line
    }, [])
    
    return(
        <>
        <SinglePost>
            <Profile>
                <Link to={`/user/${user.id}`}><img src={avatar} alt={username}/></Link>

                <LikePost postDetails={postDetails} index={index} arrayOfPosts={arrayOfPosts} setArrayOfPosts={setArrayOfPosts} />
                
                <CommentsContainer onClick={(event) => toggleComments(event)} >
                    <AiOutlineComment color={'#FFFFFF'} />
                    <p>{comments.length} comments</p>
                </CommentsContainer>
            </Profile>
            <PostContent>
                <div className='icones'>
                    <Link to={`/user/${postDetails.user.id}`}><CreatorName>{username}</CreatorName></Link>
                    
                    <div className='iconesseparados'>
                        
                        <DeletePost postDetails={postDetails} />
                        <BsPencil 
                            color={'#FFFFFF'} 
                            cursor="pointer" 
                            onClick={() => {setOnEditingPost(!OnEditingPost)}}
                        />

                    </div>
                </div>

                {OnEditingPost ? 
                    <EditPost postDetails={postDetails} setOnEditingPost={setOnEditingPost}/> 
                    : 
                    <Description>
                        <ReactHashtag renderHashtag={(val) => (
                            <Link to={`/hashtag/${val.replace("#", "")}`} >
                                <Hashtag >
                                    {val}
                                </Hashtag>
                            </Link>)}>
                            {text}
                        </ReactHashtag>
                    </Description> }
        
                {youtubeLink ? 
                    <YoutubeVideo youtubeLink={youtubeLink} postDetails={postDetails}/>
                     : <LinkToContent linkTitle={linkTitle} linkDescription={linkDescription} link={link} linkImage={linkImage}/> }
            </PostContent>
        </SinglePost>
        <PostComments key={id} PostId={id} authorId={user.id} openComments={openComments} setComments={setComments} comments={comments} />

        </>
    );
}