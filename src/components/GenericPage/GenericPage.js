import Loader from "react-loader-spinner";
import { useLocation } from 'react-router-dom'

import { PageTitle, ContainerPostsAndTrendings, ContainerPosts } from "./Styles";
import Post from '../SinglePost/Post';
import UserInput from '../UserPosts/UserInput'
import Header from "./Header";
import Trending from "./Trending";

export default function GenericPage({ title, arrayOfPosts, setArrayOfPosts}) {
    const location = useLocation().pathname;
    const loading = <Loader type="Circles" color="#FFF" height={80} width={80} />;

    return (
        <>
            <Header />
            <PageTitle>{title}</PageTitle>
            <ContainerPostsAndTrendings>
                <ContainerPosts>
                    {location === "/timeline" ? <UserInput setArrayOfPosts={setArrayOfPosts}/> : ""}
                    {arrayOfPosts!==null ? (
                        (arrayOfPosts.length>0 ? arrayOfPosts.map((p, i) => <Post key ={p.id} index={i} postDetails={p} setArrayOfPosts={setArrayOfPosts} arrayOfPosts={arrayOfPosts}/>) : <span>Nenhum post encontrado</span>)
                    ) : <span>{loading}</span>}
                </ContainerPosts>
                <Trending />
            </ContainerPostsAndTrendings>
        </>
    );
}