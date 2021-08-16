import { Link } from "react-router-dom";
import { useContext } from "react";
import { BsDot } from 'react-icons/bs';
import styled from 'styled-components';

import UserFollowersContext from "../../../contexts/UserFollowersContext";
import AddNewComment from "./AddNewComment";

export default function PostComments({ setComments, openComments, comments, postDetails }) {

    const { user, commentCount } = postDetails;
    const { followers } = useContext(UserFollowersContext);

    function checkIfIsFollowingCommentAuthor(comment) {
        return (
            <span>
                {user.id === comment.user.id ? 
                    "Post's author" 
                :(followers.find(f => f.id === comment.user.id) ? 
                    "following" 
                : "")}
            </span>
        );
    }

    return (
        <CommentBox openComments={openComments} >
            {commentCount  ? 
                comments.map(c => (
                    <div key={c.id}>
                        <Comments>
                            <Link to={`/user/${c.user.id}`}>
                                <img src={c.user.avatar} alt={c.user.username} />
                            </Link>
                            <CommentContainer>
                                <CommentInfo>
                                    <Link to={`/user/${c.user.id}`}>
                                        <p>{c.user.username}</p>
                                    </Link>
                                    <BsDot color={"#565656"} />
                                    {checkIfIsFollowingCommentAuthor(c)}
                                </CommentInfo>
                                <span>
                                    {c.text}
                                </span>
                            </CommentContainer>
                            <Divider />
                        </Comments>
                        <Divider />
                    </div>
                ))
            : ""
            }
            <AddNewComment 
                comments={comments}
                setComments={setComments}
                postDetails={postDetails}
            />
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

const CommentContainer = styled.div`
    width: 85%;
    font-size: 14px;
    & > span {
        word-break: break-all;
        color: #acacac;
    }
`;

const CommentInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    p {
        color: #fff;
        font-weight: 700;
    }
    span {
        color: #565656;
        margin-left: 5px;;
    }
`;

const Divider = styled.div`
    height: 1px;
    background-color: #353535;
    margin: 0 20px;
    
`;