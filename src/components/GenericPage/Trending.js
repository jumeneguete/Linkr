import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function Trending (){
    const [hashtags, setHashtags] = useState("");
    const {userProfile} = useContext(UserContext);
    console.log(userProfile)

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
                    <li key ={h.id}># {h.name}</li>
                ))}
            </TrendingList>

        </TrendingStyle>
    );
}

const TrendingStyle = styled.div`
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    color: #fff;
    display: flex;
    flex-direction: column;

    @media (max-width: 614px) {
        display: none;
    }
`;

const Title = styled.div`
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
    padding: 15px;
`;

const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #484848;
`;

const TrendingList = styled.ul`
    padding: 15px;
    
    li {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1px;
        margin-top: 12px;
    }
`;