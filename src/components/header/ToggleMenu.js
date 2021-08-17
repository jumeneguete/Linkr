import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext"

export default function ToggleMenu({menuSelected}) {
    
    const history = useHistory();
    const { setUserProfile } = useContext(UserContext);

    function logout() {
        localStorage.removeItem("linkerUser");
        setUserProfile("");
        history.push("/");
    }

    return(
        <Menu menuSelected={menuSelected}>
            <Items>
                <Item><Link to={"/my-posts"}>My posts</Link></Item>
                <Item><Link to={"/my-likes"}>My likes</Link></Item>
                <Item onClick={logout}>Logout</Item>
            </Items>
        </Menu>
            
    );
}

const Menu = styled.div`
    width: 150px;
    height: 125px;
    background-color: #151515;
    position: fixed;
    top: 75px;
    right: 0;
    border-radius: 0px 0px 0px 20px;
    display: ${props => props.menuSelected ? "block" : "none"};
    z-index: 1;
    @media (max-width: 640px) {
        width: 100px;
        height: 100px;
    }
`;

const Items = styled.ul`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 640px) {
        margin-top: 5px;
    }
    
`;

const Item = styled.li`
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
    @media (max-width: 640px) {
        font-size: 13px;
    }
`;