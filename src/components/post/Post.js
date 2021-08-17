import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactHashtag from "react-hashtag";

import getYouTubeID from 'get-youtube-id';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import Profile from "./Profile";
import { loadComments } from'../../functions/apiFunctions';
import PostComments from './postComments/PostComments';
import LinkToContent from './postLink/LinkToContent';
import PostHeader from './PostHeader';
import EditPost from './postFeatures/EditPost';
import YoutubeVideo from './postFeatures/YoutubeVideo';
import RePostDetails from './postRePost/RePostDetails';

export default function Post({ postDetails, setArrayOfPosts, index, arrayOfPosts, pageUrl }) {
    
    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const { text, link, linkTitle, linkDescription, linkImage, id, repostId } = postDetails;
    const [OnEditingPost, setOnEditingPost] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [comments, setComments] = useState([]);
    const youtubeLink = getYouTubeID(link);

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const url = `${process.env.REACT_APP_API_BASE_URL}/posts/${id}/comments`;
        loadComments(url, setComments, config);
    // eslint-disable-next-line
    }, [])
    
    return(
        <>
            {repostId && 
                <RePostDetails 
                    postDetails={postDetails}
                />}
            <PostContainer>
                <Profile 
                    index={index}
                    postDetails={postDetails} 
                    openComments={openComments}
                    setOpenComments={setOpenComments}
                    comments={comments}
                    arrayOfPosts={arrayOfPosts}
                    setArrayOfPosts={setArrayOfPosts}
                    pageUrl={pageUrl}
                />
                    
                <PostContent>
                    <PostHeader 
                        postDetails={postDetails} 
                        OnEditingPost={OnEditingPost}
                        setOnEditingPost={setOnEditingPost}
                        setArrayOfPosts={setArrayOfPosts}
                        pageUrl={pageUrl}
                    /> 
                    {OnEditingPost ? 
                        <EditPost 
                            postDetails={postDetails} 
                            setOnEditingPost={setOnEditingPost}
                            setArrayOfPosts={setArrayOfPosts}
                            pageUrl={pageUrl}
                        /> : 
                        <Description>
                            <ReactHashtag renderHashtag={(val) => (
                                <Link to={`/hashtag/${val.replace("#", "")}`} >
                                    <Hashtag >
                                        {val}
                                    </Hashtag>
                                </Link>)}>
                                {text}
                            </ReactHashtag>
                        </Description> 
                    }
                    {youtubeLink ? 
                        <YoutubeVideo youtubeLink={youtubeLink} postDetails={postDetails}/>
                        : <LinkToContent linkTitle={linkTitle} linkDescription={linkDescription} link={link} linkImage={linkImage}/> 
                    }
                </PostContent>
            </PostContainer>
            <PostComments 
                key={id} 
                postDetails={postDetails}
                openComments={openComments} 
                setComments={setComments} 
                setOpenComments={setOpenComments}
                comments={comments} 
            />
        </>
    );
}

const PostContainer = styled.div`
display:flex;
justify-content: space-between;
margin-bottom: 16px;
padding:21px;
background: #171717;
border-radius: 16px;
z-index: 1;

@media (max-width: 614px) {
    border-radius: 0;
    padding: 15px;
}
`;

const PostContent = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width: calc(90% - 20px);
word-break: break-all;
`;

const Description = styled.div`
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    margin: 20px 0;
`;
const Hashtag = styled.span`
    color: #FFFFFF;
    cursor: pointer;
`;