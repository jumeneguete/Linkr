import { useState } from "react";
import styled from "styled-components";

import LinkPageContentModal from "./LinkPageContentModal";

export default function LinkToContent({ linkTitle, linkDescription, link, linkImage }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <LinkPageContentModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                link={link}
                linkTitle={linkTitle}
            />

            <LinkContainer onClick={() => setModalIsOpen(!modalIsOpen)}>
                <LinkInfo>
                    <h1>{linkTitle}</h1>
                    <p>{linkDescription}</p>
                    <span>{link}</span>
                </LinkInfo>
                <LinkImg backgroud={linkImage} />
            </LinkContainer>
        </div>
    );
}

const LinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid #4d4d4d;
    box-sizing: border-box;
    border-radius: 11px;
`;

const LinkInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 70%;
    padding: 20px;
    h1 {
        font-size: 16px;
        line-height: 19px;
        color: #cecece;
    }
    p {
        font-size: 11px;
        line-height: 13px;
        color: #9b9595;
    }
    span {
        font-size: 11px;
        line-height: 13px;
        color: #cecece;
        word-break: break-all;
    }
    @media (max-width: 614px) {
        padding: 10px;
        h1 {
            font-size: 11px;
        }
        p {
            font-size: 9px;
        }
        span {
            font-size: 9px;
        }
    }
`;
const LinkImg = styled.div`
    min-width: 30%;
    background: url(${(props) => props.backgroud});
    background-size: cover;
    border-radius: 0px 12px 13px 0px;
`;
