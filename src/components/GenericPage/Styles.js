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
    background: #FFF;
    border-radius: 15px;
    color: #707070;
    display: flex;
    font: 300 16px 'Lato', sans-serif;
    height: 250px;
    margin-bottom: 20px;
    padding: 25px;
    width: 600px;
    img {
        border-radius: 50%;
        height: 50px;
        margin-right: 20px;
        width: 50px;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
        button {
            background: ${ props => props.clicked ? '#CCC' : '#1877F2'};
            border-radius: 5px;
            color: #FFF;
            font-weight: 700;
            padding: 10px;
            text-align: center;
            width: 120px;
        }
        h2 {
            font-size: 20px;
            margin-bottom: 10px;
            width: 100%;
        }
        input {
            background: #EFEFEF;
            border-radius: 5px;
            cursor: text;
            flex-grow: grow;
            margin-bottom: 10px;
            overflow-wrap: anywhere;
            padding: 10px;
            width: 100%;
            box-shadow:none;
        }
        input[type=text] {
            flex-grow: 1;
        }
    }
    @media (max-width: 614px) {
        border-radius: 0;
        height: 200px;
        padding: 15px;
        width: 100vw;
        form {
            button {
                font-size: 15px;
                margin-top: 3px;
                padding: 3px;
                width: 120px;
            }
        
            h2 {
                font-size: 18px;
                letter-spacing: -0.5px;
                margin-bottom: 15px;
                text-align: center;
            }
            input {
                font-size: 16px;
                margin-bottom: 5px;
            }
        }
        
        img {
            display: none;
        }
    }
    }
`;

const TrendingStyle = styled.div`
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    color: #fff;
    display: flex;
    flex-direction: column;
    position: sticky;
    right: auto;
    top: 200px;

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
        width: 90%;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1px;
        margin-top: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export { HeaderStyles, Menu, ToggleMenu, PageTitle, ContainerPostsAndTrendings, CreatePost, ContainerPosts, TrendingStyle, Title, Separator, TrendingList };