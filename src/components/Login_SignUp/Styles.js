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

export { Container, Fields };