import { PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts } from "./Styles";
import GlobalStyle from '../../styles/GlobalStyle';
import Post from './Post';

export default function Timeline() {


    return(
        <>
            <GlobalStyle />
            <PageTitle>timeline</PageTitle>
            <ContainerPostsAndTrendings>
                <ContainerPosts>
                    <CreatePost>Em breve</CreatePost>
                    <Post/>
                    <Post/>
                </ContainerPosts>
                <Trendings>Em breve</Trendings>
            </ContainerPostsAndTrendings>

        </>
    );
}