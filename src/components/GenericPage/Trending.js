import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingStyle, Title, Separator, TrendingList } from "./Styles.js";
import UserContext from "../../contexts/UserContext";

export default function Trending (){
    const [hashtags, setHashtags] = useState("");
    const {userProfile} = useContext(UserContext);

    useEffect(() =>{
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }}

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending", config);

        request.then(response => {
            setHashtags(response.data.hashtags)
        });
        request.catch(error => {
            console.log(error)
        })
    },[])

    return (
        <TrendingStyle>
            <Title>trending</Title>
            <Separator></Separator>
            <TrendingList>
                { hashtags === "" ? "" :
                hashtags.map(h =>(
                    <Link to={`/hashtag/${h.name}}`}><li key ={h.id}># {h.name}</li></Link>
                ))}
            </TrendingList>

        </TrendingStyle>
    );
}

