import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";

import { PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts } from "./Styles";
import GlobalStyle from '../../styles/GlobalStyle';
import Post from '../SinglePost/Post';

export default function Timeline() {
    const token = '8181382a-f871-4195-ade8-982e9eb999fa';
    const [postsList, setPostsList] = useState(null);
    const loading = <Loader type="Circles" color="#FFF" height={80} width={80}/>
    

    useEffect(() => {
        const config ={ headers: { Authorization: `Bearer ${token}` }}
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config);
        request.then(response => {
            setPostsList(response.data.posts)
        });
        request.catch(erro => alert("Ocorreu um erro ao carregar os posts"))
    }, [])

    return(
        <>
            <GlobalStyle />
            <PageTitle>timeline</PageTitle>
            <ContainerPostsAndTrendings>
                <ContainerPosts>
                    <CreatePost>Em breve</CreatePost>
                    {postsList!==null ? (postsList.length>0 ? postsList.map(p => <Post key ={p.id} postDetails={p}/>) : <span>Nenhum post encontrado</span>) : <span>{loading}</span>}
                </ContainerPosts>
                <Trendings>Em breve</Trendings>
            </ContainerPostsAndTrendings>
        </>
    );
}