import styled from "styled-components";

export default function Trending (){
    return (
        <TrendingStyle>
            <Title>trending</Title>
            <Separator></Separator>
            <TrendingList>
                <li>#exemplo</li>
                <li>#exemplo</li>
                <li>#exemplo</li>
            </TrendingList>

        </TrendingStyle>
    );
}

const TrendingStyle = styled.div`
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    color: #fff;
    display: flex;
    flex-direction: column;

    @media (max-width: 614px) {
        display: none;
    }
`;

const Title = styled.div`
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
    padding: 15px;
`;

const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #484848;
`;

const TrendingList = styled.ul`
    padding: 15px;
    
    li {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1px;
        margin-top: 10px;
    }
`;