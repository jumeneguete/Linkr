import axios from 'axios';
import styled from "styled-components";

import Post from '../SinglePost/Post';

export function loadMorePosts(arrayOfPosts, setArrayOfPosts, setMorePostsToLoad, url, config) {
    
    if(arrayOfPosts && arrayOfPosts.length === 0) {
        setMorePostsToLoad(false)
        return;
    }
    if(!url) return;
    
    const request = axios.get( url, config );
    request.then(response => {
        console.log(`teste${response.data.posts}`)
        const morePosts = response.data.posts;
        if( morePosts && morePosts.length > 0){
            setArrayOfPosts([...arrayOfPosts, ...response.data.posts])
        } else {
            setMorePostsToLoad(false)
        }
    });
}

export function loadComments(url, setArrayOfComments, config) {

    const request = axios.get(url, config);
    request.then(response => {
        setArrayOfComments(response.data.comments);
    });
    request.catch(() => alert("Erro ao carregar comentários"));
}

export function callServer(setArrayOfPosts, url, erroAlert, config) {
       
    const request = axios.get(url, config);
    request.then(response => {
        setArrayOfPosts(response.data.posts)
    });
    request.catch(erro => alert(erroAlert))
}

//Melhorar Performace
export function reloadPosts(arrayOfPosts, setArrayOfPosts, url, erroAlert, config) {
    if(!arrayOfPosts || arrayOfPosts.length === 0) return;
    const request = axios.get(url, config);
    request.then(response => {
        const newPosts = [];
        (response.data.posts.forEach(p => {
            if(!arrayOfPosts.find(a => a.id === p.id)){
                newPosts.push(p)
            }
        }))
        setArrayOfPosts([...newPosts, ...arrayOfPosts])
    });
    request.catch(erro => alert(erroAlert));
}



export function renderPosts(arrayOfPosts, setArrayOfPosts, location, followers) {

    return(
        arrayOfPosts!==null ? 
            arrayOfPosts.length > 0 ? 
                location === "/timeline" ?
                    followers && followers.length > 0 ? 
                        listOfPosts(arrayOfPosts, setArrayOfPosts)
                        : <Info>Voce nao segue ninguem ainda, procure por perfis na busca</Info>
                :listOfPosts(arrayOfPosts, setArrayOfPosts)
            : <Info>Nenhum post encontrado</Info>
        : ''
    )
}

function listOfPosts(arrayOfPosts, setArrayOfPosts) {
    
    return (
        arrayOfPosts?.map((p, i) => (
            <Post 
                key ={p.id} 
                index={i} 
                postDetails={p} 
                setArrayOfPosts={setArrayOfPosts} 
                arrayOfPosts={arrayOfPosts}
            />
        ))
    );
    
}

const Info = styled.div`
    display:flex;
    justify-content: center;
    color: #FFFFFF;
    font-size: 18px;
    margin-top: 50px;
`;