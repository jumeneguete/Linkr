import { useState } from "react";
import styled from "styled-components"

export default function Header(){
    const [selected, setSelected] = useState(false);

    function toggle (){
        const selection = !selected;
        setSelected(selection);
    }

    return (
        <HeaderStyles>
            <span>linkr</span>
            <Menu>
                <span onClick={toggle}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg></span>
                <div></div>
            </Menu>
            <ToggleMenu selected={selected}>
                <ul>
                    <li>My posts</li>
                    <li>My likes</li>
                    <li>Logout</li>
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
    
    span {
        cursor: pointer;
    }

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
    display: ${props => props.selected ? "block" : "none"};
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