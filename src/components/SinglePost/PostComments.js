import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsDot } from 'react-icons/bs';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

export default function PostComments({ setComments, openComments, comments, PostId }) {
    const { userProfile } = useContext(UserContext);
    const [ newComment, setNewComment ] = useState("");

    function SendComment(e){
        e.preventDefault();

        const config ={ headers: { Authorization: `Bearer ${userProfile.token}` }}
        const body = {text: newComment}

        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${PostId}/comment`, body, config);
        
        request.then((response) => {
            setComments([...comments, {
                id: response.data.comment.id, 
                text: response.data.comment.text, 
                user: {id: userProfile.user.id, username: userProfile.user.username, avatar:userProfile.user.avatar} 
            }]);
            setNewComment("");
        });
        request.catch((error) => {
           console.log(error)
        })
    }
    console.log(comments)
    return (
        <CommentBox openComments={openComments} >

            {comments.lenght === 0 ? "" :
                comments.map((c) => ( 
                        <div key={c.id}>
                            <Comments>
                                <Link to="#"><img src={c.user.avatar} alt={c.user.username} /></Link>
                                <CommentInfo>
                                    <div>
                                        <p>{c.user.username}</p>
                                        <BsDot color={"#565656"} />
                                        <span>{c.user.id === userProfile.user.id ? "Post's author" : "following"}</span>
                                    </div>
                                    <span>{c.text}</span>
                                </CommentInfo>
                                <Divider />
                            </Comments>
                            <Divider />
                        </div>
                        ))
            }

                        <AddCommentForm onSubmit={SendComment}>
                            <Link to="#"><img src={userProfile.user.avatar} alt={userProfile.user.username} /></Link>
                            <div>
                                <Input placeholder="write a comment..." onChange={(e)=> setNewComment(e.target.value)} value={newComment} />
                                <ButtonComment type="submit"><IoPaperPlaneOutline color={"#fff"} /></ButtonComment>
                            </div>
                        </AddCommentForm>
                    </CommentBox>
    );
}

const CommentBox = styled.div`
    width: 100%;
    background-color: #1e1e1e;
    margin: -25px 0 16px 0;
    border-radius: 0 0 16px 16px;
    display: ${props => props.openComments ? "block" : "none"};
    z-index: 0;

    @media (max-width: 614px) {
    border-radius: 0;
}
    
`;

const Comments = styled.div`
    padding: 10px 20px; 
    display: flex;
    align-items: flex-start;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
        object-fit: cover;
        margin-right: 13px;
    }


`;

const CommentInfo = styled.div`
    width: 85%;
        font-size: 14px;
 
    div {
        display: flex;
        align-items: center;
        margin-bottom: 7px;

        p {
            color: #fff;
            font-weight: 700;
        }

        span {
            color: #565656;
        }
    }

    & > span {
        word-break: break-all;
        color: #acacac;
    }
    
`;

const Divider = styled.div`
    height: 1px;
    background-color: #353535;
    margin: 0 20px;
    
`;

const AddCommentForm = styled.form`
    padding: 15px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
   
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
        object-fit: cover;
        margin-right: 13px;
    }

    & > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    padding-left: 10px;
    color: #fff;
    border: none;
    border-radius: 8px 0 0 8px;
    background-color: #252525;

    &:focus{
        box-shadow: 0 0 0 0;
        outline: 0;
    }

    &::placeholder {
        color: #575757;
        font-weight: 700;
        font-style: italic;
    }
`;

const ButtonComment = styled.button`
    height: 40px;
    border: none;
    padding: 0 15px;
    border-radius: 0 8px 8px 0;
    background-color: #252525;
    display: flex;
    align-items: center;
    justify-content: center;
`;