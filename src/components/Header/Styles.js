import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

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
    z-index: ${props => props.searching ? "10" : "0"};

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
        width: 20px;
        color:  #fff;
    }

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
        cursor: pointer;
    }
`;




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

export { HeaderStyles, Menu, ToggleMenu, SearchStyle, StyledInput, Suggestions, NotFound, UserSearched };