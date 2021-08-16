import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from 'styled-components';

import UserContext from "../contexts/UserContext";

export default function Trending (){
    const [hashtags, setHashtags] = useState([]);
    const [ hashtagSearched, setHashtagSearched ] = useState('');
    let history = useHistory();
    const {userProfile} = useContext(UserContext);

    useEffect(() =>{
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` }}

        const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/hashtags/trending`, config);
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
            <Separator />

            <TrendingList>
                { hashtags.length !== 0 &&
                    hashtags.map(h =>(
                        <Link to={`/hashtag/${h.name}`} key ={h.id}><li>#&nbsp;{h.name}</li></Link>
                    ))
                }
            </TrendingList>
            <FormContainer onSubmit={(event) => searchHashtag(event)}>
                <HashtagInput 
                    type='text' 
                    placeholder='type a hashtag' 
                    onChange={(e) => setHashtagSearched(e.target.value)} 
                    value={hashtagSearched}
                />
                <span>#</span>
            </FormContainer>

        </TrendingStyle>
    );
}

const TrendingStyle = styled.div`
    width: 301px;
    height: 450px;
    background: #171717;
    border-radius: 16px;
    color: #fff;
    display: flex;
    flex-direction: column;
    position: sticky;
    right: auto;
    top: 200px;

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
        width: 90%;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1px;
        margin-top: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const FormContainer = styled.form`
    margin-top: 10px;
    text-align: center;
    width: 100%;

    span{
        position: absolute; 
        display: block; 
        left: 22px; 
        top: 405px; 
        z-index: 1;
        color: #FFF;
        font: bold 19px "Lato";
    }
`;

const HashtagInput = styled.input`
    background: #333;
    border-radius: 5px;
    cursor: text;
    font: 400 18px 'Lato', sans-serif;
    padding: 5px 20px;
    text-align: left;
    width: 90%;
`;