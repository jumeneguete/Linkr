import styled from 'styled-components';
import { SinglePost } from "./Styles";

export default function Post() {
    return(
        <SinglePost>
            <Profile>img</Profile>
            <PostContent>
                <CreatorName>Juvenal</CreatorName>
                <Description>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</Description>
                <LinkContainer>
                Teste
                </LinkContainer>
            </PostContent>
        </SinglePost>
    );
}

const Profile = styled.div`

`;

const PostContent = styled.div`
background-color: #666;
`;
const CreatorName = styled.div`
height: 23px;
font-size: 19px;
line-height: 23px;
color: #FFFFFF;
`;

const Description = styled.div`
`;

const LinkContainer = styled.div`
height: 155px;
border: 1px solid #4D4D4D;
box-sizing: border-box;
border-radius: 11px;
`;