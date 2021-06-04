import { useState, useContext, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { IoHeartSharp, IoHeartOutline, IoCalculator } from "react-icons/io5";
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineComment } from "react-icons/ai"
import ReactHashtag from "react-hashtag";
import Modal from "../UserPosts/Modal";
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';
import RepostButton from '../repost/ButtonRepost'
import UserContext from '../../contexts/UserContext'
import { SinglePost, Profile, PostContent, CreatorName, Description, Hashtag, LikesContainer, StyledReactTooltip, CommentsContainer } from "./Styles";
import ReactTooltip from 'react-tooltip';
import PostComments from './PostComments';
import LInkBox from './LinkBox';

export default function Post({ postDetails, setArrayOfPosts, index, arrayOfPosts }) {


    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const textEditRef = useRef();
    const location = useLocation().pathname;
    const { text, link, linkTitle, linkDescription, linkImage, likes, id, user, post, repostCount, commentCount, repostedBy } = postDetails;
    const [postLiked, setPostLiked] = useState(likes.find(l => l["user.id"] === userProfile.user.id || l["id"] === userProfile.user.id))
    const { username, avatar } = postDetails.user;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [OnEditingPost, setOnEditingPost] = useState(false);
    const [postMainDescription, setPostMainDescription] = useState(text);
    const [onSendingPostEdition, setOnSendingPostEdition] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [repostCounter, setRepostCounter] = useState(postDetails.repostCount);
    const [counter, setCounter] = useState(postDetails.commentCount);
    const [commentCounter, setCommentCounter] = useState(postDetails.commentCount);

    useEffect(() => {
        if (textEditRef.current)
            textEditRef.current.focus();
    }, [OnEditingPost]);

    function sendEditedPostToServer() {
        setOnSendingPostEdition(true);
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`, { 'text': postMainDescription }, config);

        request.then(({ data }) => {
            setOnSendingPostEdition(false);  //input desabilitado
            setOnEditingPost(false);  //edição finalizada
            getPost(true);   //refresh Timeline
        })
        request.catch(() => {
            setOnSendingPostEdition(false);
            setOnEditingPost(false);
            alert("A alteração não foi possível de ser concluída!");
            setPostMainDescription(text);
        })
    }

    function likePost() {
        ReactTooltip.rebuild();
        const newArrayOfPosts = [...arrayOfPosts];
        const config = { headers: { Authorization: `Bearer ${token}` } }
        let request;
        if (!postLiked) {
            request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, {}, config);
        } else {
            request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`, {}, config);
        }
        request.then(response => {
            const newPost = { ...postDetails, likes: response.data.post.likes };
            newArrayOfPosts[index] = newPost;
            setArrayOfPosts(newArrayOfPosts)
            setPostLiked(!postLiked);

        })
    }

    function Delete() {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        setIsLoading(true);
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`, config);
        request.then(deleteSucceeded).catch(errorHandle);
    }

    function deleteSucceeded() {
        setIsLoading(false);
        setModalIsOpen(!modalIsOpen);
        getPost();
    }

    function getPost() {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        let request;
        if (location === "/timeline") {
            request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config);
        } else {
            request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userProfile.user.id}/posts`, config);
        }
        request.then(response => {
            setArrayOfPosts(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts"))
    }

    function errorHandle() {
        setIsLoading(false);
        setModalIsOpen(!modalIsOpen);
        alert(`Sorry, we couln't delete your post`);
    }

    function toggleComments(e) {
        e.stopPropagation();

        const selection = !openComments;
        setOpenComments(selection);

    }


    useEffect(function loadComments() {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } };

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comments`, config);
        request.then(response => {
            setComments(response.data.comments);
        });
        request.catch(() => alert("Erro ao carregar comentários"));

    }, [])

    const youtubeLink = getYouTubeID(link);

       
    return(
        <>
        <SinglePost>
            <Profile>
                <Link to={`/user/${user.id}`}><img src={avatar} alt={username}/></Link>
                {postLiked ? <IoHeartSharp onClick={likePost} color={'#AC0000'} /> : <IoHeartOutline onClick={likePost} color={'#FFFFFF'}  />}
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
                <CommentsContainer onClick={(event) => toggleComments(event)} >
                    <AiOutlineComment color={'#FFFFFF'} />
                    <p>{comments.length} comments</p>
                </CommentsContainer>
                <RepostButton
            post={post}
            counter={repostCounter}
            setCounter={setRepostCounter}
          />
            </Profile>
            <PostContent>
                <div className='icones'>
                    <Link to={`/user/${postDetails.user.id}`}><CreatorName>{username}</CreatorName></Link>
                    
                <div className='iconesseparados'>
                    {userProfile.user.username === username && 
                            <BsTrash color="#FFFFFF" cursor="pointer" onClick={() => setModalIsOpen(!modalIsOpen)}/>
                        } 

                    < Modal 
                        modalIsOpen = { modalIsOpen }
                        setModalIsOpen = { setModalIsOpen }
                        Delete={Delete}
                        isLoading = { isLoading }
                    />

                    {userProfile.user.username === username && 
                            <BsPencil color={'#FFFFFF'} cursor="pointer" onClick={() => {
                                setOnEditingPost(!OnEditingPost)
                                setPostMainDescription(text);
                            }}/>
                    }
                </div>
                </div>

                {OnEditingPost ? 
                    <input 
                        ref = {textEditRef}
                        disabled = {onSendingPostEdition}
                        value = {postMainDescription}
                        onChange ={e => setPostMainDescription(e.target.value)}
                        onKeyDown = { (event) => {
                            if(event.key === "Escape") {
                                setOnEditingPost(false);
                                setPostMainDescription(text);
                            }                               
                            else if (event.key === "Enter") 
                                sendEditedPostToServer();
                        }}
                    /> : <Description>
                    <ReactHashtag renderHashtag={(val) => (
                        <Link to={`/hashtag/${val.replace("#", "")}`} ><Hashtag >{val}</Hashtag></Link>)}>
                        {text}
                    </ReactHashtag>
                    </Description> }
        
                {youtubeLink ? 
                    <>
                        <iframe id={youtubeLink} type="text/html" width="100%" height="300"
                        src={`http://www.youtube.com/embed/${youtubeLink}`}
                        frameBorder="0"/>
                        <div id={youtubeLink}></div>
                        <span style={{color: '#B7B7B7'}}>{link}</span>
                    </>
                     : <LInkBox linkTitle={linkTitle} linkDescription={linkDescription} link={link} linkImage={linkImage}/> }
            </PostContent>
        </SinglePost>
        <PostComments key={id} PostId={id} authorId={user.id} openComments={openComments} setComments={setComments} comments={comments} setComments={setComments} />

        </>
    );
}

/**/