import styled from "styled-components";

export default function Banner() {
    return (
        <BannerStyle>
            <h1>linkr</h1>
            <h2>
                save, share and discover <br /> the best links on the web
            </h2>
        </BannerStyle>
    );
}

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
        font-family: "Passion One", sans-serif;
        color: #fff;
        font-size: 110px;
        font-weight: bold;
    }

    h2 {
        font-family: "Oswald", sans-serif;
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
