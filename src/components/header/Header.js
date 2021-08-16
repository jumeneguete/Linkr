import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import styled from 'styled-components';
import ClickAwayListener from 'react-click-away-listener';

import Search from "./Search";
import UserContext from "../../contexts/UserContext"

export default function Header() {
    const [menuSelected, setMenuSelected] = useState(false);
    const { userProfile, setUserProfile } = useContext(UserContext);
    const history = useHistory();

    function toggle(e) {
        e.stopPropagation();

        const selection = !menuSelected;
        setMenuSelected(selection);
    }

    function logout() {
        localStorage.removeItem("linkerUser");
        setUserProfile("");
        history.push("/");
    }

    return (
        <>
            <HeaderStyles>
                <span><Link to="/">linkr</Link></span>
                <HeaderSearch><Search /></HeaderSearch>
                <Menu onClick={(event) => toggle(event)}>
                    <span>{menuSelected ? <ArrowUp/> : <ArrowDown/>}</span>
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

const HeaderStyles = styled.header`
    width: 100%;
    height: 75px;
    background-color: #151515;
    padding: 0 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;

    & > span {
        font-family: "Passion One", sans-serif;
        font-weight: 700;
        font-size: 50px;
        letter-spacing: 1px;
        color: #fff;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    img {
        border-radius: 50%;
        height: 55px;
        margin-left: 10px;
        width: 55px;
        object-fit: cover;
    }
`;

const ToggleMenu = styled.div`
    width: 150px;
    height: 125px;
    background-color: #151515;
    position: fixed;
    top: 75px;
    right: 0;
    border-radius: 0px 0px 0px 20px;
    display: ${props => props.menuSelected ? "block" : "none"};
    z-index: 1;
    ul {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    li {
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        margin-top: 7px;
        cursor: pointer;
    }
`;

const HeaderSearch = styled.div`
@media (max-width: 640px) {
        display: none;
    }
`;

const ArrowDown = styled(IoChevronDownSharp)`
    font-size: 25px;
    color: #FFFFFF;
`;

const ArrowUp = styled(IoChevronUpSharp)`
    font-size: 25px;
    color: #FFFFFF;
`;