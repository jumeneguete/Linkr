import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import ClickAwayListener from "react-click-away-listener";
import styled from "styled-components";

import Search from "./Search";
import ToggleMenu from "./ToggleMenu";
import UserContext from "../../contexts/UserContext";

export default function Header() {
    const [menuSelected, setMenuSelected] = useState(false);
    const [search, setSearch] = useState("");
    const { userProfile } = useContext(UserContext);

    function showMenu(e) {
        e.stopPropagation();
        setMenuSelected(!menuSelected);
    }

    return (
        <>
            <HeaderStyles searching={search !== "" ? true : false}>
                <Title>
                    <Link to="/">linkr</Link>
                </Title>
                <HeaderSearch>
                    <Search search={search} setSearch={setSearch} />
                </HeaderSearch>
                <Menu onClick={showMenu}>
                    {menuSelected ? <ArrowUp /> : <ArrowDown />}
                    <UserAvatar
                        src={userProfile.user.avatar}
                        alt={userProfile.user.username}
                    />
                    <ClickAwayListener onClickAway={() => setMenuSelected(false)}>
                        <ToggleMenu menuSelected={menuSelected} />
                    </ClickAwayListener>
                </Menu>
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
    z-index: 2;
`;

const Title = styled.span`
    font-family: "Passion One", sans-serif;
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 1px;
    color: #fff;
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const UserAvatar = styled.img`
    border-radius: 50%;
    height: 55px;
    margin-left: 10px;
    width: 55px;
    object-fit: cover;
    @media (max-width: 640px) {
        height: 40px;
        width: 40px;
    }
`;

const HeaderSearch = styled.div`
    @media (max-width: 640px) {
        display: none;
    }
`;

const ArrowDown = styled(IoChevronDownSharp)`
    font-size: 25px;
    color: #ffffff;
    @media (max-width: 640px) {
        font-size: 18px;
    }
`;

const ArrowUp = styled(IoChevronUpSharp)`
    font-size: 25px;
    color: #ffffff;
    @media (max-width: 640px) {
        font-size: 18px;
    }
`;
