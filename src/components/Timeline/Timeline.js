import { useState, useEffect } from 'react';
import axios from 'axios';

import { PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts } from "./Styles";
import GlobalStyle from '../../styles/GlobalStyle';
import Post from './Post';

export default function Timeline() {
    const token = '8181382a-f871-4195-ade8-982e9eb999fa';
    const [postsList, setPostsList] = useState(null);
    

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
                    {postsList!==null ? (postsList.length>0 ? postsList.map(p => <Post key ={p.id} postDetails={p}/>) : "Nenhum post encontrado") : "Loading"}
                </ContainerPosts>
                <Trendings>Em breve</Trendings>
            </ContainerPostsAndTrendings>

        </>
    );
}