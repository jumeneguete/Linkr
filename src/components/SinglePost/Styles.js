
import styled from 'styled-components';



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

export { LinkContainer, LinkInfo, LinkImg, CommentBox, Comments, CommentInfo, Divider, AddCommentForm, InputComment, ButtonComment };