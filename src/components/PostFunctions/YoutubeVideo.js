


export default function YoutubeVideo({youtubeLink, postDetails}) {

    const { link, linkTitle } = postDetails;
    return(
        <>
            <object 
                data={`http://www.youtube.com/embed/${youtubeLink}`} 
                width="100%" 
                height="300" 
                title={linkTitle}>
            </object>
            <div id={youtubeLink}></div>
            <span style={{color: '#B7B7B7'}}>{link}</span>
        </>
    );
}