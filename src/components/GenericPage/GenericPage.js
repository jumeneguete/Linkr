import Loader from "react-loader-spinner";
import { useLocation } from 'react-router-dom'
import { useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import UserContext from '../../contexts/UserContext';
import UserFollowersContext from '../../contexts/UserFollowersContext';
import { GenericSearch, PageTitle, ContainerPostsAndTrendings, ContainerPosts, StyledButtom, Loading } from "./Styles";
import UserInput from '../UserPosts/UserInput'
import Trending from "./Trending";
import {loadMorePosts , renderPosts} from'./GenericFunctions';
import Search from "../Header/Search";

export default function GenericPage(props) {

    const { userProfile } = useContext(UserContext);
    const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
    const { followers } = useContext(UserFollowersContext);
    const { title, arrayOfPosts, setArrayOfPosts, morePostsToLoad, setMorePostsToLoad } = props;
    const { isFollowing, followUser } = props;
    const location = useLocation().pathname;
    const loading = <Loader type="Oval" color="#6D6D6D" height={40} width={40} />;
    let id;
    if(location !== "/timeline") {
        id = arrayOfPosts && arrayOfPosts[0].user.id;
    }

    return (
        <>
            <GenericSearch><Search/></GenericSearch>
            <PageTitle>
                <span>{title}</span> 
                {location === `/user/${id}` && id !== userProfile.user.id ? 
                    <StyledButtom onClick={followUser} clicked={isFollowing.status}>{isFollowing.status?"Unfollow":"Follow"}</StyledButtom> 
                : ""}
            </PageTitle>
            <ContainerPostsAndTrendings>
                <ContainerPosts>
                    {location === "/timeline" ? <UserInput setArrayOfPosts={setArrayOfPosts}/> : ""}
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => loadMorePosts(arrayOfPosts,setArrayOfPosts, setMorePostsToLoad, props.url, config)}
                        hasMore={morePostsToLoad}
                        loader={<Loading key={0}>
                            <span>{loading}</span>
                            <span>Loading more posts...</span>
                        </Loading>}
                    >
                        {renderPosts(arrayOfPosts, setArrayOfPosts, location, followers)}
                    </InfiniteScroll>
                </ContainerPosts>
                <Trending />
            </ContainerPostsAndTrendings>
        </>
    );
}