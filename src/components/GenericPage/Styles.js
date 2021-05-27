import styled from 'styled-components';

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
        background-image: ${props => props.url ? `url(${props.url})` : ""};
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

const PageTitle = styled.div`
width: 937px;
font-size: 43px;
color: #FFFFFF;
margin: 125px auto 0 auto;
@media (max-width: 614px) {
    width: 100%;
    margin: 91px 0 0 0px;
    padding: 0 20px;
}
`;

const ContainerPostsAndTrendings = styled.div`
display: flex;
justify-content: space-between;
width: 937px;
margin: 29px auto;
@media (max-width: 614px) {
    width: 100%;
}
`;
const Trendings = styled.div`
width: 301px;
height: 406px;
background: #171717;
border-radius: 16px;
color: #fff;
@media (max-width: 614px) {
    display: none;
}
`;
const ContainerPosts =styled.div`
width: 611px;
    & > span {
        display: flex;
        justify-content: center;
        color: #FFFFFF;
        font-size: 23px;
        margin-top: 50px;
    }
@media (max-width: 614px) {
    width: 100%;
}
`;

const CreatePost = styled.div`
height: 209px;
margin-bottom: 29px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`;


export { HeaderStyles, Menu, ToggleMenu, PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts };