import Loader from "react-loader-spinner";
import { useLocation } from 'react-router-dom'
import { useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from "styled-components";

import UserContext from '../contexts/UserContext';
import UserFollowersContext from '../contexts/UserFollowersContext';
import CreatePost from './CreatePost'
import Trending from "./Trending";
import RenderPosts from './RenderPosts'
import { loadMorePosts } from'../functions/apiFunctions';

export default function GenericPage(props) {

    const { userProfile } = useContext(UserContext);
    const config = { headers: { Authorization: `Bearer ${userProfile.token}` }};
    const { followers } = useContext(UserFollowersContext);
    const { title, arrayOfPosts, setArrayOfPosts, morePostsToLoad, setMorePostsToLoad, urlToGetMorePosts, pageUrl } = props;
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
                    {location === "/timeline" ? <CreatePost setArrayOfPosts={setArrayOfPosts}/> : ""}
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => loadMorePosts(arrayOfPosts,setArrayOfPosts, setMorePostsToLoad, urlToGetMorePosts, config)}
                        hasMore={morePostsToLoad}
                        loader={<Loading key={0}>
                            <span>{loading}</span>
                            <span>Loading more posts...</span>
                        </Loading>}
                    >
                        <RenderPosts
                            arrayOfPosts={arrayOfPosts}
                            setArrayOfPosts={setArrayOfPosts}
                            location={location}
                            followers={followers}
                            pageUrl={pageUrl}
                        />
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

const StyledButtom = styled.button`
font-size: 15px;
background: ${ props => props.clicked ? '#EFEFEF' : '#1877F2'};
border-radius: 5px;
color: ${ props => props.clicked ? '#1877F2' : '#FFF'};
font-weight: 700;
padding: 10px;
text-align: center;
border: none;
width: 120px;
cursor: pointer;
`;

const Loading = styled.div`
display:flex;
flex-direction: column;
align-items:center;
color: #6D6D6D;
`;