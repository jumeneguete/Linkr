import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoPaperPlaneOutline } from 'react-icons/io5';
import styled from 'styled-components';

import UserContext from "../../../contexts/UserContext";

export default function AddNewComment({ comments, setComments, postDetails }) {

    const { userProfile } = useContext(UserContext);
    const { id } = postDetails;
    const [newComment, setNewComment] = useState("");

    function SendComment(e) {
        e.preventDefault();

        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
        const body = { text: newComment }

        const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}/comment`, body, config);

        request.then((response) => {
            setComments([...comments, {
                id: response.data.comment.id,
                text: response.data.comment.text,
                user: { id: userProfile.user.id, username: userProfile.user.username, avatar: userProfile.user.avatar }
            }]);
            setNewComment("");
        });
        request.catch(()=> alert("Erro ao enviar o comentário"));
    }
    return(
        <AddCommentForm onSubmit={SendComment}>
            <Link to="#"><img src={userProfile.user.avatar} alt={userProfile.user.username} /></Link>
            <div>
                <InputComment placeholder="write a comment..." onChange={(e) => setNewComment(e.target.value)} value={newComment} />
                <ButtonComment type="submit"><IoPaperPlaneOutline color={"#fff"} /></ButtonComment>
            </div>
        </AddCommentForm>
    );
}

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

const InputComment = styled.input`
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