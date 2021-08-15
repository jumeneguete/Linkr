
import styled from 'styled-components';


const SinglePost = styled.div`
display:flex;
justify-content: space-between;
margin-bottom: 16px;
padding:21px;
background: #171717;
border-radius: 16px;
z-index: 1;

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

const CommentBox = styled.div`
    width: 100%;
    background-color: #1e1e1e;
    margin: -25px 0 16px 0;
    border-radius: 0 0 16px 16px;
    display: ${props => props.openComments ? "block" : "none"};
    z-index: 0;

    @media (max-width: 614px) {
    border-radius: 0;
}
    
`;

const Comments = styled.div`
    padding: 10px 20px; 
    display: flex;
    align-items: flex-start;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
        object-fit: cover;
        margin-right: 13px;
    }


`;

const CommentInfo = styled.div`
    width: 85%;
        font-size: 14px;
 
    div {
        display: flex;
        align-items: center;
        margin-bottom: 7px;

        p {
            color: #fff;
            font-weight: 700;
        }

        span {
            color: #565656;
            margin-left: 5px;;
        }
    }

    & > span {
        word-break: break-all;
        color: #acacac;
    }
    
`;

const Divider = styled.div`
    height: 1px;
    background-color: #353535;
    margin: 0 20px;
    
`;

const AddCommentForm = styled.form`
    padding: 15px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
   
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
        object-fit: cover;
        margin-right: 13px;
    }

    & > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
`;

const InputComment = styled.input`
    width: 100%;
    height: 40px;
    padding-left: 10px;
    color: #fff;
    border: none;
    border-radius: 8px 0 0 8px;
    background-color: #252525;

    &:focus{
        box-shadow: 0 0 0 0;
        outline: 0;
    }

    &::placeholder {
        color: #575757;
        font-weight: 700;
        font-style: italic;
    }
`;

const ButtonComment = styled.button`
    height: 40px;
    border: none;
    padding: 0 15px;
    border-radius: 0 8px 8px 0;
    background-color: #252525;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export { SinglePost, Profile, PostContent, CreatorName, Description, LinkContainer, LinkInfo, LinkImg, Hashtag, CommentsContainer, CommentBox, Comments, CommentInfo, Divider, AddCommentForm, InputComment, ButtonComment };