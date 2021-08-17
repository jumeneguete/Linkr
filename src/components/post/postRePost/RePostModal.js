import ReactModal from "react-modal";
import styled from "styled-components";

ReactModal.setAppElement("body");

export default function RePostModal({
    modalIsOpen,
    setModalIsOpen,
    isLoading,
    repostPost,
    error,
    setError,
}) {
    return (
        <>
            <RePostModalStyle
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(!modalIsOpen)}
                bodyOpenClassName={"ReactModal__Body--open"}
                style={{ overlay: { zIndex: 100 } }}>
                <ModalContent error={error}>
                    {!error ? (
                        <>
                            <ModalMassage>Do you want to re-post this link?</ModalMassage>
                            <ButtonContainer>
                                <RePostModalButton
                                    className="cancel"
                                    onClick={() => setModalIsOpen(false)}
                                    disabled={isLoading}>
                                    No, cancel
                                </RePostModalButton>
                                <RePostModalButton
                                    onClick={repostPost}
                                    disabled={isLoading}>
                                    {isLoading ? "Sharing..." : "Yes, share!"}
                                </RePostModalButton>
                            </ButtonContainer>
                        </>
                    ) : (
                        <>
                            <ModalMassage>
                                Error: Could not repost this link at this time.
                            </ModalMassage>
                            <ButtonContainer>
                                <RePostModalButton
                                    className="cancel"
                                    onClick={() => {
                                        setModalIsOpen(false);
                                        setError(false);
                                    }}
                                    disabled={isLoading}>
                                    Ok, go back
                                </RePostModalButton>
                            </ButtonContainer>
                        </>
                    )}
                </ModalContent>
            </RePostModalStyle>
            {isLoading && <Overlay />}
        </>
    );
}

const RePostModalStyle = styled(ReactModal)`
    top: 0;
    left: 0;
    transform: translate(100%, 150%);
    background: #333333;
    border-radius: 20px;
    width: 30%;
    min-width: 450px;
    padding: 20px 50px;
    z-index: 10;
    @media (max-width: 600px) {
        min-width: 0;
        width: 100%;
        flex-direction: column;
        transform: translate(0, 150%);
        border-radius: 0;
        padding: 20px 15px;
    }
`;

const ModalContent = styled.div`
    color: white;
`;

const ModalMassage = styled.p`
    max-width: 360px;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    margin-bottom: 47px;
    @media (max-width: 614px) {
        font-size: 20px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.error ? "center" : "space-around")};
    padding: 0px 30px;
    @media (max-width: 614px) {
        justify-content: ${(props) => (props.error ? "center" : "space-between")};
    }
`;

const RePostModalButton = styled.button`
    width: 134px;
    height: 37px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border: none;
    color: #ffffff;
    background: #1877f2;
    cursor: pointer;
    &.cancel {
        background: #ffffff;
        color: #1877f2;
    }
    &:disabled {
        filter: brightness(0.7);
    }
    @media (max-width: 614px) {
        padding: 5px 20px;
        font-size: 14px;
        margin-right: 20px;
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    z-index: 5;
`;
