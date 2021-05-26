import styled from 'styled-components';

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


export { PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts };