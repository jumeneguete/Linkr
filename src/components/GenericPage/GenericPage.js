import Loader from "react-loader-spinner";
import { useLocation } from 'react-router-dom'
import { useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from "styled-components";

import UserContext from '../../contexts/UserContext';
import UserFollowersContext from '../../contexts/UserFollowersContext';
import { StyledButtom, Loading } from "./Styles";
import UserInput from '../UserPosts/UserInput'
import Trending from "../Trending";
import {loadMorePosts , renderPosts} from'./GenericFunctions';

export default function GenericPage(props) {

    const { userProfile } = useContext(UserContext);
    const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
    const { followers } = useContext(UserFollowersContext);
    const { title, arrayOfPosts, setArrayOfPosts, morePostsToLoad, setMorePostsToLoad } = props;
    const { isFollowing, followUser } = props;
    const location = useLocation().pathname;
    const loading = <Loader type="Oval" color="#6D6D6D" height={40} width={40} />;
    let id;
    if(location !== "/timeline" && arrayOfPosts.length) {
        id = arrayOfPosts[0].user.id;
    }
    
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

const PageTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 937px;
    font-size: 43px;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    color: #FFFFFF;
    margin: 125px auto 0 auto;
    @media (max-width: 614px) {
        width: 100%;
        margin: 91px 0 0 0px;
        padding: 0 20px;
    }
`;

const ContainerPostsAndTrendings = styled.div`
    display: flex;
    justify-content: space-between;
    width: 937px;
    margin: 29px auto;
    @media (max-width: 614px) {
        width: 100%;
    }
`;

const ContainerPosts =styled.div`
    width: 611px;
    & > span {
        display: flex;
        justify-content: center;
        color: #FFFFFF;
        font-size: 23px;
        margin-top: 50px;
    }
    @media (max-width: 614px) {
        width: 100%;
    }
`;