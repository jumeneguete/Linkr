import Loader from "react-loader-spinner";
import { useLocation } from 'react-router-dom'

import { PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts } from "./Styles";
import Post from '../SinglePost/Post';
import UserInput from '../UserPosts/UserInput'

export default function GenericPage({ title, arrayOfPosts, setArrayOfPosts}) {
    const location = useLocation().pathname;
    const loading = <Loader type="Circles" color="#FFF" height={80} width={80}/>;

    return(
        <>
            <PageTitle>{title}</PageTitle>
            <ContainerPostsAndTrendings>
                <ContainerPosts>
                    {setArrayOfPosts!==null ? <UserInput setArrayOfPosts={setArrayOfPosts}/> : ""}
                    {arrayOfPosts!==null ? (arrayOfPosts.length>0 ? arrayOfPosts.map(p => <Post key ={p.id} postDetails={p}/>) : <span>Nenhum post encontrado</span>) : <span>{loading}</span>}
                </ContainerPosts>
                <Trendings>Em breve</Trendings>
            </ContainerPostsAndTrendings>
        </>
    );
}