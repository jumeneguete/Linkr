import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';

import DeletePost from '../PostFunctions/DeletePost';
import { CreatorName } from "./Styles";

export default function DeleteAndEditIcons({postDetails, OnEditingPost, setOnEditingPost, setArrayOfPosts, pageUrl}) {

    const { username } = postDetails.user;
    return (
        <div className='icones'>
            <Link to={`/user/${postDetails.user.id}`}><CreatorName>{username}</CreatorName></Link>
            
            <div className='iconesseparados'>
                
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
            </div>
        </div>
    );
}