import React from "react";
import ReactModal from "react-modal";
import Loader from "react-loader-spinner";
import styled from "styled-components";

ReactModal.setAppElement("body");

export default function DeleteModal({ modalIsOpen, setModalIsOpen, Delete, isLoading }) {
  const loading = <Loader type="Oval" color="#FFFFFF" height={40} width={40} />;

  return (
    <ModalStyle
      isOpen={modalIsOpen}
      bodyOpenClassName={"ReactModal__Body--open"}
      style={{ overlay: { zIndex: 100 } }}>
      {isLoading ? (
        <Loading>
          {loading} <span>Loading...</span>
        </Loading>
      ) : (
        <>
          <Title>Tem certeza que deseja excluir essa publicação?</Title>
          <ButtonsContainer>
            <BackButton onClick={() => setModalIsOpen(!modalIsOpen)}>
              Não, voltar
            </BackButton>

            <DeleteButton onClick={Delete}>Sim, excluir</DeleteButton>
          </ButtonsContainer>
        </>
      )}
    </ModalStyle>
  );
}

const ModalStyle = styled(ReactModal)`
  position: fixed;
  top: 300px;
  left: calc(50vw - 20%);
  background: #333333;
  border-radius: 20px;
  width: 50%;
  max-width: 500px;
  min-height: 200px;
  padding: 20px 50px;
  z-index: 5;
  @media (max-width: 600px) {
    width: 100%;
    left: 0;
    flex-direction: column;
    border-radius: 0;
    padding: 20px 0;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  span {
    color: #ffffff;
    margin-left: 15px;
  }
`;

const Title = styled.h1`
  color: white;
  font: 700 34px "Lato", sans-serif;
`;

const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin: 30px;
`;

const BackButton = styled.button`
  background: white;
  border: none;
  border-radius: 5px;
  color: #1877f2;
  cursor: pointer;
  outline: none;
  padding: 8px 20px;
  font-weight: 700;
  font-size: 16px;

  @media (max-width: 614px) {
    padding: 5px 20px;
    font-size: 14px;
    margin-right: 5px;
  }
`;

const DeleteButton = styled.button`
  background: #1877f2;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  outline: none;
  padding: 8px 20px;
  font-weight: 700;
  font-size: 16px;

  @media (max-width: 614px) {
    padding: 5px 20px;
    font-size: 14px;
    margin-left: 5px;
  }
`;
