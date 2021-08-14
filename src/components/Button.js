import styled from "styled-components";

export default function Button ({children, disabled}){
    return (
        <ButtonStyle type="submit" disabled={disabled}>{children}</ButtonStyle>
    );
}

const ButtonStyle = styled.button`
    width: 80%;
    height: 45px;
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;;
    margin-bottom: 5px;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.disabled ? "#5ea1ed" : "#1F81F2"};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    
    @media (max-width: 600px) {
        width: 90%;
    }

`;