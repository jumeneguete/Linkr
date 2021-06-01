import axios from 'axios';

function loadMorePosts(arrayOfPosts, setArrayOfPosts, setMorePostsToLoad, url, config) {

    if(!url) return;
    const request = axios.get( url, config );
    request.then(response => {
        if(response.data.posts.length > 0){
            setArrayOfPosts(arrayOfPosts.concat(response.data.posts))
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
        const newPosts = (arrayOfPosts.filter(p => response.data.posts.includes(p)))
        setArrayOfPosts(newPosts.concat(arrayOfPosts))
    });
    request.catch(erro => alert(erroAlert));
}

export {loadMorePosts, callServer, reloadPosts}