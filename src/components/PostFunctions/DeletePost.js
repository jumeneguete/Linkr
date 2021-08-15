import { useState, useContext } from 'react';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import DeleteModal from "../UserPosts/DeleteModal";

export default function DeletePost({postDetails}) {

    const { userProfile } = useContext(UserContext);
    const { token } = userProfile
    const { id, user } = postDetails;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function Delete() {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        setIsLoading(true);
        const request = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`, config);
        request.then(deleteSucceeded).catch(errorHandle);
    }

    function deleteSucceeded() {
        setIsLoading(false);
        setModalIsOpen(!modalIsOpen);
        //getPost();
    }

    function errorHandle() {
        setIsLoading(false);
        setModalIsOpen(!modalIsOpen);
        alert(`Sorry, we couln't delete your post`);
    }

    return(
        <>
            {userProfile.user.username === user.username && 
                <BsTrash color="#FFFFFF" cursor="pointer" onClick={() => setModalIsOpen(!modalIsOpen)}/>
            } 

            < DeleteModal 
                modalIsOpen = { modalIsOpen }
                setModalIsOpen = { setModalIsOpen }
                Delete={Delete}
                isLoading = { isLoading }
            />
        </>
    );
}