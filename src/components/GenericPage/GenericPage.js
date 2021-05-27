import Loader from "react-loader-spinner";
import { useLocation } from 'react-router-dom'

import { PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts } from "./Styles";
import Post from '../SinglePost/Post';

import Header from "./Header";

export default function GenericPage({ title, arrayOfPosts }) {
    const location = useLocation().pathname;
    const loading = <Loader type="Circles" color="#FFF" height={80} width={80} />;

    return (
        <>
            <Header />
            <PageTitle>{title}</PageTitle>
            <ContainerPostsAndTrendings>
                <ContainerPosts>
                    {location === "/timeline" ? <CreatePost>Em breve</CreatePost> : ""}
                    {arrayOfPosts !== null ? (arrayOfPosts.length > 0 ? arrayOfPosts.map(p => <Post key={p.id} postDetails={p} />) : <span>Nenhum post encontrado</span>) : <span>{loading}</span>}
                </ContainerPosts>
                <Trendings>Em breve</Trendings>
            </ContainerPostsAndTrendings>
        </>
    );
}