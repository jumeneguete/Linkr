import styled from 'styled-components';

const PageTitle = styled.div`
width: 937px;
font-size: 43px;
color: #FFFFFF;
margin: 125px auto 0 auto;
`;

const ContainerPostsAndTrendings = styled.div`
display: flex;
justify-content: space-between;
width: 937px;
margin: 29px auto;
`;
const Trendings = styled.div`
width: 301px;
height: 406px;
background: #171717;
border-radius: 16px;
color: #fff;
`;
const ContainerPosts =styled.div`
width: 611px;
`;

const CreatePost = styled.div`
height: 209px;
margin-bottom: 29px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`;

const SinglePost = styled.div`
display:flex;
justify-content: space-between;
height: 276px;
margin-bottom: 16px;
padding:21px;
background: #171717;
border-radius: 16px;
`;

export { PageTitle, ContainerPostsAndTrendings, Trendings, CreatePost, ContainerPosts, SinglePost };