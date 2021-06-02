import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { HeaderStyles, Menu, ToggleMenu } from "./Styles"
import UserContext from "../../contexts/UserContext"
import ClickAwayListener from 'react-click-away-listener';

import { DebounceInput } from 'react-debounce-input';
import styled from "styled-components";

export default function Header() {
    const [menuSelected, setMenuSelected] = useState(false);
    const [search, setSearch] = useState("");
    const { userProfile, setUserProfile } = useContext(UserContext);
    const history = useHistory();
    const arrowUp = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" class="svg-inline--fa fa-chevron-up fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg>;
    const arrowDown = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>

    function toggle(e) {
        e.stopPropagation();

        const selection = !menuSelected;
        setMenuSelected(selection);
    }

    function logout() {
        localStorage.removeItem("lastLogin");
        setUserProfile("");
        history.push("/");
    }

    return (
        <>
            <HeaderStyles>
                <span><Link to="/">linkr</Link></span>
                <Search>
                    <StyledInput
                        minLength={2}
                        debounceTimeout={300}
                        onChange={(e) => setSearch(e.target.value)} value={search}
                        placeholder="Search for people and friends" />
                    <Suggestions>{search}</Suggestions>
                </Search>
                <Menu onClick={(event) => toggle(event)}>
                    <span>{menuSelected ? arrowUp : arrowDown}</span>
                    <img src={userProfile.user.avatar} alt={userProfile.user.username} />
                </Menu>
                <ClickAwayListener onClickAway={() => setMenuSelected(false)}>
                    <ToggleMenu menuSelected={menuSelected}>
                        <ul>
                            <Link to={"/my-posts"}><li>My posts</li></Link>
                            <Link to={"/my-likes"}><li>My likes</li></Link>
                            <li onClick={logout}>Logout</li>
                        </ul>
                    </ToggleMenu>
                </ClickAwayListener>
            </HeaderStyles>
        </>
    );
}

const Search = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const StyledInput = styled(DebounceInput)`
    width: 350px;
    height: 35px;
    border:none;
    border-radius: 5px;
    box-shadow: 0;
    padding: 20px 10px;


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
height: 100px;
background-color: whitesmoke;
border-radius: 0 0 5px 5px;
position: absolute;
top:30px;
left: 0;

`;