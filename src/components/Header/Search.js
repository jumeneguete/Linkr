import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import UserFollowersContext from "../../contexts/UserFollowersContext";
import ClickAwayListener from 'react-click-away-listener';
import { SearchStyle, StyledInput, Suggestions, NotFound, UserSearched } from "./Styles"

export default function Search({search, setSearch}) {
    const { userProfile } = useContext(UserContext);
    const { followers } = useContext(UserFollowersContext);
    const [usersFound, SetUsersFound] = useState(null);


    useEffect(() => {
        if (search.length > 2) {
            const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }

            const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${search}`, config);

            request.then(response => {
                SetUsersFound(response.data.users);
            })
        }
    }, [search])

    return (

        <ClickAwayListener onClickAway={() => setSearch("")}>
            <SearchStyle>
                <StyledInput
                    minLength={3}
                    debounceTimeout={300}
                    onChange={(e) => setSearch(e.target.value)} value={search}
                    searching={search !== "" ? true : false}
                    placeholder="Search for people and friends" />
                <Suggestions searching={search !== "" ? true : false}>
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
