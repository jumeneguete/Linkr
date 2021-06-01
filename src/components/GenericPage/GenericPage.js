import Loader from "react-loader-spinner";
import { useLocation } from 'react-router-dom'
import { useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import UserContext from '../../contexts/UserContext';
import UserFollowersContext from '../../contexts/UserFollowersContext';
import { PageTitle, ContainerPostsAndTrendings, ContainerPosts, StyledButtom } from "./Styles";
import Post from '../SinglePost/Post';
import UserInput from '../UserPosts/UserInput'
import Trending from "./Trending";

export default function GenericPage(props) {

    const { userProfile } = useContext(UserContext);
    const { followers } = useContext(UserFollowersContext);
    const { title, arrayOfPosts, setArrayOfPosts} = props;
    const { isFollowing, followUser } = props;
    const location = useLocation().pathname;
    const loading = <Loader type="Circles" color="#FFF" height={80} width={80} />;
    const id = arrayOfPosts && arrayOfPosts[0].user.id;
    const ListOfPosts = arrayOfPosts && arrayOfPosts.map((p, i) => (
    <Post key ={p.id} index={i} postDetails={p} setArrayOfPosts={setArrayOfPosts} arrayOfPosts={arrayOfPosts}/>
    ))

    return (
        <>
            <PageTitle>
                <span>{title}</span> 
                {location === `/user/${id}` && id !== userProfile.user.id ? 
                    <StyledButtom onClick={followUser} clicked={isFollowing.status}>{isFollowing.status?"Unfollow":"Follow"}</StyledButtom> 
                : ""}
            </PageTitle>
            <ContainerPostsAndTrendings>
                <ContainerPosts>
                    {location === "/timeline" ? <UserInput setArrayOfPosts={setArrayOfPosts}/> : ""}
                    {arrayOfPosts!==null ? 
                        arrayOfPosts.length > 0 ? 
                            location === "/timeline" ?
                                followers && followers.length > 0 ? 
                                    ListOfPosts
                                    : <span>Voce nao segue ninguem ainda, procure por perfis na busca</span>
                            :ListOfPosts
                        : <span>Nenhum post encontrado</span>
                    : <span>{loading}</span>}

                </ContainerPosts>
                <Trending />
            </ContainerPostsAndTrendings>
        </>
    );
}