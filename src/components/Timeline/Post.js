import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import styled from 'styled-components';
import { SinglePost } from "./Styles";

export default function Post({ postDetails}) {

    const { text, link, linkTitle, linkDescription, linkImage, user, likes } = postDetails;
    const { username, avatar } = user;

    return(
        <SinglePost>
            <Profile>
                <img src={avatar} alt={username}/>
                <IoHeartSharp color={'#AC0000'} size={25} />
                <IoHeartOutline color={'#FFFFFF'} size={25} />
                <p>13 likes</p>
            </Profile>
            <PostContent>
                <CreatorName>{username}</CreatorName>
                <Description>{text}</Description>
                <LinkContainer>
                    <LinkInfo>
                    <h1>{linkTitle}</h1>
                    <p>{linkDescription}</p>
                    <a href={link} >{link}</a>
                    </LinkInfo>
                    <LinkImg backgroud={linkImage}>
                    
                    </LinkImg>
                </LinkContainer>
            </PostContent>
        </SinglePost>
    );
}

const Profile = styled.div`
display: flex;
flex-direction: column;
align-items: center;
    img {
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        border-radius: 27px;
        object-fit: cover;
    }
    p {
        margin-top: 5px;
        color: #fff;
    }
`;
const PostContent = styled.div`
width: 503px;
`;
const CreatorName = styled.div`
height: 23px;
font-size: 19px;
line-height: 23px;
color: #FFFFFF;
`;
const Description = styled.div`
font-size: 17px;
line-height: 20px;
color: #B7B7B7;
margin: 10px 0;
`;
const LinkContainer = styled.div`
display: flex;
justify-content: space-between;
height: 155px;
border: 1px solid #4D4D4D;
box-sizing: border-box;
border-radius: 11px;
`;
const LinkInfo = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 20px;

    h1 {
        font-size: 16px;
        line-height: 19px;
        color:#CECECE;
    }
    p {
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
    }
    a {
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
    }
`;
const LinkImg = styled.div`
min-width: 154px;
background: url(${props => props.backgroud});
background-size: cover;
border-radius: 0px 12px 13px 0px;
`;
