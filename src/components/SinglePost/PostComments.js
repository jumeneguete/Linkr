import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsDot } from 'react-icons/bs';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

export default function PostComments({ openComments, postId }) {
    const { userProfile } = useContext(UserContext);
    const [comments, setComments] = useState(null);


    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } };

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/comments`, config);
        request.then(response => {
            console.log(response.data);
        });
        request.catch(error => {
            console.log(error.response.data) ;
        });

    }, [])



    return (
        <CommentBox openComments={openComments}>
            <div>
                <Comments>
                    <Link to="#"><img src={userProfile.user.avatar} alt={userProfile.user.username} /></Link>
                    <CommentInfo>
                        <div>
                            <p>João Tavares</p>
                            <BsDot color={"#565656"} />
                            <span>following</span>
                        </div>
                        <span> exemplo de comentário </span>
                    </CommentInfo>
                    <Divider />
                </Comments>
                <Divider />
            </div>

            <AddCommentForm>
                <Link to="#"><img src={userProfile.user.avatar} alt={userProfile.user.username} /></Link>
                <div>
                    <Input placeholder="write a comment..." />
                    <ButtonComment><IoPaperPlaneOutline color={"#fff"} /></ButtonComment>
                </div>
            </AddCommentForm>
        </CommentBox>
    );
}

const CommentBox = styled.div`
    width: 100%;
    background-color: #1e1e1e;
    margin: -30px 0 16px 0;
    border-radius: 0 0 16px 16px;
    display: ${props => props.openComments ? "block" : "none"};
    
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