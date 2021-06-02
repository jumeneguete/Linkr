import axios from 'axios';
import Post from '../SinglePost/Post';

function loadMorePosts(arrayOfPosts, setArrayOfPosts, setMorePostsToLoad, url, config) {
    
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

function callServer(setArrayOfPosts, url, erroAlert, config) {
        
    const request = axios.get(url, config);
    request.then(response => {
        setArrayOfPosts(response.data.posts)
    });
    request.catch(erro => alert(erroAlert))
}

function reloadPosts(arrayOfPosts, setArrayOfPosts, url, erroAlert, config) {
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

function renderPosts(arrayOfPosts, setArrayOfPosts, location, followers) {

    const ListOfPosts = arrayOfPosts && arrayOfPosts.map((p, i) => (
        <Post key ={p.id} index={i} postDetails={p} setArrayOfPosts={setArrayOfPosts} arrayOfPosts={arrayOfPosts}/>
        ))

    return(
        arrayOfPosts!==null ? 
            arrayOfPosts.length > 0 ? 
                location === "/timeline" ?
                    followers && followers.length > 0 ? 
                        ListOfPosts
                        : <span>Voce nao segue ninguem ainda, procure por perfis na busca</span>
                :ListOfPosts
            : <span>Nenhum post encontrado</span>
        : ""
    )
}

export {loadMorePosts, callServer, reloadPosts, renderPosts}