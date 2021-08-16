import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BsDot } from 'react-icons/bs';
import { IoPaperPlaneOutline } from 'react-icons/io5';

import { CommentBox, Comments, CommentInfo, Divider, AddCommentForm, InputComment, ButtonComment } from "../SinglePost/Styles"
import UserContext from "../../contexts/UserContext";
import UserFollowersContext from "../../contexts/UserFollowersContext";
import axios from "axios";

export default function PostComments({ setComments, openComments, comments, PostId, authorId }) {
    const { userProfile } = useContext(UserContext);
    const { followers } = useContext(UserFollowersContext);
    const [newComment, setNewComment] = useState("");

    function SendComment(e) {
        e.preventDefault();

        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
        const body = { text: newComment }

        const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/posts/${PostId}/comment`, body, config);

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

    return (
        <CommentBox openComments={openComments} >

            {comments.lenght === 0 ? "" :
                comments.map((c) => (
                    <div key={c.id}>
                        <Comments>
                            <Link to={`/user/${c.user.id}`}><img src={c.user.avatar} alt={c.user.username} /></Link>
                            <CommentInfo>
                                <div>
                                    <Link to={`/user/${c.user.id}`}><p>{c.user.username}</p></Link>
                                    <BsDot color={"#565656"} />
                                    <span>{authorId === c.user.id ? "Post's author" : followers.find(f => f.id === c.user.id) ? "following" : ""}</span>
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
                    <InputComment placeholder="write a comment..." onChange={(e) => setNewComment(e.target.value)} value={newComment} />
                    <ButtonComment type="submit"><IoPaperPlaneOutline color={"#fff"} /></ButtonComment>
                </div>
            </AddCommentForm>
        </CommentBox>
    );
}

