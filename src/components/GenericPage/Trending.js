import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TrendingStyle, Title, Separator, TrendingList } from "./Styles.js";
import UserContext from "../../contexts/UserContext";

export default function Trending (){
    const [hashtags, setHashtags] = useState([]);
    const [ hashtagSearched, setHashtagSearched ] = useState('');
    let history = useHistory();
    const {userProfile} = useContext(UserContext);

    useEffect(() =>{
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }}

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending", config);

        request.then(response => {
            setHashtags(response.data.hashtags)
        });
    },[userProfile])

    function searchHashtag (event) {
        event.preventDefault();

        if (hashtagSearched.length) {
            history.push(`/hashtag/${hashtagSearched}`);
            setHashtagSearched('');
        }
        else {
            alert('Please fill in the search field');
        }
    }

    return (
        <TrendingStyle>
            <Title>trending</Title>
            <Separator></Separator>
            <TrendingList>
                { hashtags.length !== 0 &&
                hashtags.map(h =>(
                    <>
                    <Link to={`/hashtag/${h.name}`}><li key ={h.id}>#&nbsp;{h.name}</li></Link>
                    </>
                ))}
            </TrendingList>
            <form onSubmit={(event) => searchHashtag(event)}>
                <input type='text' 
                    placeholder='type a hashtag' 
                    onChange={(e) => setHashtagSearched(e.target.value)} 
                    value={hashtagSearched}
                />
                <span>#</span>
            </form>

        </TrendingStyle>
    );
}

