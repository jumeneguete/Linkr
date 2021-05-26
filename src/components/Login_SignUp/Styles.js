import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    display: flex;

    @media (max-width: 600px) {
        width: 100%;
        flex-direction: column;
    }
`;

const Fields = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 600px) {
        width: 100%;
        margin: 20px auto 0 auto;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    p{
        font-size: 15px;
        font-family: "Lato", sans-serif;
        color: #fff;
        letter-spacing: 1px;
        text-decoration: underline;
        margin-top: 5px;
    }

    p:hover {
        color: rgba(250, 250, 250, 0.8)
    }

    @media (max-width: 600px) {
        p{
            margin-top: 13px;
        }
    }
`;

const BannerStyle = styled.div`
    width: 65%;
    padding-left: 25px;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 600px) {
        width: 100%;
        padding: 20px;
        text-align: center;
    }

    h1 {
        font-family: 'Passion One', sans-serif;
        color: #fff;
        font-size: 110px;
        font-weight: bold;
    }

    h2 {
        font-family: 'Oswald', sans-serif;
        color: #fff;
        font-size: 43px;
        font-weight: bold;
    }

    @media (max-width: 600px) {
        h1 {
            font-size: 76px;
        }
        h2 {
            font-size: 23px;
        }
    }
`;

const InputStyle = styled.input`
    width: 80%;
    height: 45px;
    padding-left: 10px;
    margin-bottom: 5px;
    border-radius: 5px;

    @media (max-width: 600px) {
        width: 90%;
    }

    &::placeholder{
            font-family: "Oswald", sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: #9F9F9F;
        }
        &:focus{
            box-shadow: 0 0 0 0;
            outline: 0;
        }
`;

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

export { Container, Fields, BannerStyle, InputStyle, ButtonStyle };