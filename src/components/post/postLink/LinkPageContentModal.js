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
            <a href={link} target="_blank" rel="noreferrer">
                <button>Open in new tab</button>
            </a>
            <ClickAwayListener onClickAway={() => setModalIsOpen(!modalIsOpen)}>
                <LinkPageObject data={link} title={linkTitle} />
            </ClickAwayListener>
        </ModalStyle>
    );
}

const ModalStyle = styled(ReactModal)`
    width: 100%;
    height: 100vh;
    padding: 30px;
    background-color: #333333;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;

    button {
        font-weight: 700;
        padding: 10px 20px;
        margin-bottom: 15px;
        background-color: #1877f2;
        color: #fff;
        border: none;
        border-radius: 7px;
    }
`;

const LinkPageObject = styled.object`
    width: 100%;
    height: 100%;
`;
