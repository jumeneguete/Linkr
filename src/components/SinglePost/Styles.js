
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const SinglePost = styled.div`
display:flex;
justify-content: space-between;
margin-bottom: 16px;
padding:21px;
background: #171717;
border-radius: 16px;
@media (max-width: 614px) {
    border-radius: 0;
    padding: 15px;
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
`;
const Profile = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: calc(15% - 20px);
    img {
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        border-radius: 27px;
        object-fit: cover;
    }
    p {
       
    }
    svg {
        font-size: 25px;
        cursor: pointer;
    }
@media (max-width: 614px) {
    img{
        width: 40px;
        height: 40px;
    }
    p{
        font-size: 9px;
    }
    svg {
        font-size: 15px;
    }
}
`;
const PostContent = styled.div`
width: calc(90% - 20px);
word-break: break-all;
.icones {
    display:flex;
    justify-content: space-between;
    align-items: center;
}

.iconesseparados {
    width: 40px;
    display:flex;
    justify-content: space-between;
}

input {
    border: none;
}

input:focus{
            box-shadow: 0 0 0 0;
            outline: 0;
        }
`;

const BsTrash = styled.div`
color: white;
`;

const CreatorName = styled.div`
height: 23px;
font-size: 19px;
color: #FFFFFF;
@media (max-width: 614px) {
    font-size: 17px;
}
`;
const Description = styled.div`
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    margin: 10px 0;
   
`;
const Hashtag = styled.span`
    color: #FFFFFF;
    cursor: pointer;
`;
const LinkContainer = styled.div`
display: flex;
justify-content: space-between;
border: 1px solid #4D4D4D;
box-sizing: border-box;
border-radius: 11px;
`;
const LinkInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width:70%;
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
    span {
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        word-break: break-all;
    }
@media (max-width: 614px) {
    padding: 10px;
    h1{
        font-size: 11px;
    }
    p{
        font-size: 9px;
    }
    span {
        font-size: 9px;
    }
}
`;
const LinkImg = styled.div`
    min-width: 30%;
    background: url(${props => props.backgroud});
    background-size: cover;
    border-radius: 0px 12px 13px 0px;
`;

const LikesContainer = styled.div`
 margin-top: 5px;
font-size: 11px;
color: #fff;
cursor: pointer;
`;

const StyledReactTooltip = styled(ReactTooltip)`

background: rgba(255, 255, 255, 0.9) !important;
color: #505050 !important;
border-radius: 3px !important;
padding: 5px !important;

    &:after{
        border-bottom-color: white !important;
    }
`;

const CommentsContainer = styled.div`
    margin-top: 18px;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        margin-top: 5px;
        font-size: 11px;
        color: #fff;
    }

`;

export { SinglePost, Profile, PostContent, CreatorName, Description, LinkContainer, LinkInfo, LinkImg, Hashtag, LikesContainer, StyledReactTooltip, CommentsContainer };