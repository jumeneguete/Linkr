import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DebounceInput } from 'react-debounce-input';
import axios from "axios";
import { Link } from "react-router-dom";
import ClickAwayListener from 'react-click-away-listener';

import UserFollowersContext from "../../contexts/UserFollowersContext";
import UserContext from "../../contexts/UserContext";

export default function Search() {
    const { userProfile } = useContext(UserContext);
    const { followers } = useContext(UserFollowersContext);
    const [search, setSearch] = useState("");
    const [usersFound, SetUsersFound] = useState(null);


    useEffect(() => {
        if (search.length > 2) {
            const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }

            const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${search}`, config);

            request.then(response => {
                SetUsersFound(response.data.users);
            })
        }
        // eslint-disable-next-line
    }, [])

    return (

        <ClickAwayListener onClickAway={() => setSearch("")}>
            <SearchStyle>
                <StyledInput
                    minLength={3}
                    debounceTimeout={300}
                    onChange={(e) => setSearch(e.target.value)} value={search}
                    searching={search}
                    placeholder="Search for people and friends" />
                <Suggestions searching={search}>
                    {usersFound === null ? "" : usersFound.length === 0 ? <NotFound>Nenhum usuário encontrado</NotFound> :
                        usersFound.map(f => (
                            followers.find(fol => fol.id === f.id) ? (
                                <Link to={`/user/${f.id}`}>
                                    <UserSearched key={f.id}>
                                        <img src={f.avatar} alt={f.username} />
                                        <p>{f.username}</p>
                                        <span> • following</span>
                                    </UserSearched>
                                </Link>
                            ) : ""
                        ))}
                    {usersFound === null ? "" :
                        usersFound.map(u => (
                            followers.find(foll => foll.id === u.id) ? "" : (
                                <Link to={`/user/${u.id}`}>
                                    <UserSearched key={u.id}>
                                        <img src={u.avatar} alt={u.username} />
                                        <p>{u.username}</p>
                                    </UserSearched>
                                </Link>
                            )
                        ))}
                </Suggestions>
            </SearchStyle>
        </ClickAwayListener>
    );
}



const SearchStyle = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
   
`;

const StyledInput = styled(DebounceInput)`
    width: 350px;
    height: 35px;
    border:none;
    border-radius: ${props => props.searching ? "5px 5px 0 0" : "5px"};
    box-shadow: 0;
    padding: 20px 10px;

    @media (max-width: 640px) {
        width: 90vw;
    }


    &:focus{
        box-shadow: 0 0 0 0;
        outline: 0;
    }

    &::placeholder {
        font-family: "Lato", sans-serif;
        font-size: 15px;
        color: #C6C6C6;
    }

`;

const Suggestions = styled.div`
    width: 100%;
    background-color: whitesmoke;
    border-radius: 0 0 5px 5px;
    position: absolute;
    top:40px;
    left: 0;
    display: ${props => props.searching ? "block" : "none"};
`;

const NotFound = styled.div`
    width: 100%;
    padding: 20px;
    font-style: italic;
    color: #7f7f7f;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UserSearched = styled.div`
    padding: 15px 0;
    font-size: 16px;
    display: flex;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
        object-fit: cover;
        margin-right: 13px;
    }

    p {
        max-width: 150px;
        color:#515151;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span {
        margin-left: 10px;
        color: #c5c5c5;
    }
`;