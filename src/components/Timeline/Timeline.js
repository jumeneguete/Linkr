import { PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts } from "./Styles";
import GlobalStyle from '../../styles/GlobalStyles';
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
                </ContainerPosts>
                <Trendings>Em breve</Trendings>
            </ContainerPostsAndTrendings>

        </>
    );
}