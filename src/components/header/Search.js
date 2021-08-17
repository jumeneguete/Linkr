import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ClickAwayListener from 'react-click-away-listener';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

import UserContext from "../../contexts/UserContext";
import SearchSuggestions from "./SearchSuggestions";

export default function Search({search, setSearch}) {

    const { userProfile } = useContext(UserContext);
    const [usersFound, SetUsersFound] = useState(null);

    useEffect(() => {
        if (search.length > 2) {
            const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
            const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/search?username=${search}`, config);

            request.then(response => {
                const suggestions = suggestFollowersFirst(response.data.users)
                SetUsersFound(suggestions);
            })
        }
    }, [search, userProfile])

    function suggestFollowersFirst(UsersArray) {
        const suggetionArray = [];
        UsersArray.forEach(s => {
            s.isFollowingLoggedUser ?
                suggetionArray.unshift(s)
            : suggetionArray.push(s)
        });
        return suggetionArray
    }

    return (

        <ClickAwayListener onClickAway={() => setSearch("")}>
            <SearchStyle>
                <StyledInput
                    minLength={3}
                    debounceTimeout={300}
                    onChange={(e) => setSearch(e.target.value)} value={search}
                    searching={search}
                    placeholder="Search for people and friends" 
                />
                <SearchSuggestions 
                    search={search}
                    usersFound={usersFound}
                />
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