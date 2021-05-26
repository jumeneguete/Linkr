import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components"
import MenuSelection from "../contexts/MenuSelection"
import UserContext from "../../contexts/UserContext"

export default function Header(){
    const {menuSelected, setMenuSelected} = useContext(MenuSelection);
    const {setUserProfile} = useContext(UserContext);
    const history = useHistory();
    const arrowUp = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" class="svg-inline--fa fa-chevron-up fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg>;
    const arrowDown = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>

    function toggle (e){
        e.stopPropagation(); 

        const selection = !menuSelected;
        setMenuSelected(selection);
    }

    function logout (){
        setUserProfile("");
        history.push("/");
    }

    return (
        <HeaderStyles onClick={()=> setMenuSelected(false)}>
            <span>linkr</span>
            <Menu onClick={(event) =>toggle(event)}>
                <span>{menuSelected ? arrowUp : arrowDown}</span>
                <div></div>
            </Menu>
            <ToggleMenu menuSelected={menuSelected}>
                <ul>
                    <Link to={"/my-posts"}><li>My posts</li></Link>
                    <Link to={"/my-likes"}><li>My likes</li></Link>
                    <li onClick={logout}>Logout</li>
                </ul>

            </ToggleMenu>

        </HeaderStyles>
    );
}

const HeaderStyles = styled.header`
    width: 100%;
    height: 75px;
    background-color: #000;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

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

    svg {
        width: 40px;
        color:  #fff;
    }

    div{
        width: 60px;
        height: 60px;
        margin-left: 10px;
        border-radius: 70px;
        background-image: url("https://i.pinimg.com/474x/a1/47/c0/a147c01b872bb34cc506fb3f50ae5165.jpg");
        background-size: cover;
        background-repeat: no-repeat;
    }
`;

const ToggleMenu = styled.div`
    width: 150px;
    height: 125px;
    background-color: #000;
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
    }
`;