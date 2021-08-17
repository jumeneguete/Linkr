import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";

ReactModal.setAppElement("body");

export default function LinkPageContentModal({
    modalIsOpen,
    setModalIsOpen,
    link,
    linkTitle,
}) {
    return (
        <ModalStyle
            isOpen={modalIsOpen}
            link={link}
            bodyOpenClassName={"ReactModal__Body--open"}
            style={{ overlay: { zIndex: 100 } }}>
            <OpenInANewTab>
                <a href={link} target="_blank" rel="noreferrer">
                    Open in new tab
                </a>
            </OpenInANewTab>
            <ClickAwayListener onClickAway={() => setModalIsOpen(!modalIsOpen)}>
                <LinkPageObject
                    src={link}
                    title={linkTitle}
                    loading="lazy"
                    type={"text/html"}
                />
            </ClickAwayListener>
        </ModalStyle>
    );
}

const ModalStyle = styled(ReactModal)`
    width: 75vw;
    height: 75vh;
    transform: translate(12vw, 12vh);
    padding: 30px;
    background-color: #333333;
    border-radius: 20px;
    border: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
`;

const OpenInANewTab = styled.button`
    font-weight: 700;
    padding: 10px 20px;
    margin-bottom: 15px;
    background-color: #1877f2;
    color: #fff;
    border: none;
    border-radius: 7px;
    cursor: pointer;
`;

const LinkPageObject = styled.iframe`
    width: 100%;
    height: 90%;
`;
