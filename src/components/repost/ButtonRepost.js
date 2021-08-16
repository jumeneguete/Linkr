import { BiRepost } from "react-icons/bi";
import styled from "styled-components";
import UserContext from '../../contexts/UserContext'
import axios from "axios";
import Modal from "react-modal";
import './Modal.css'
import { useContext, useState } from "react";

Modal.setAppElement("body");


export default function RepostButton({ post, counter, setCounter, setArrayOfPosts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userProfile } = useContext(UserContext);
  const { token } = userProfile

  function repostPost() {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const repostRequest = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/share`,
        {},
        config
      );
      setIsLoading(true);
      repostRequest.then(() => {
        setIsOpen(false);
        setIsLoading(false);
        setCounter(counter + 1);
        getPost();
      });
      repostRequest.catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }

  function getPost(){
    const config ={ headers: { Authorization: `Bearer ${token}` }}
    const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config);
    request.then(response => {
        setArrayOfPosts(response.data.posts)
    });
    request.catch(erro => alert("Ocorreu um erro ao carregar os posts"))
}
  
  return (
    <>
      <StyledRepostButton onClick={() => setIsOpen(true)}>
        <BiRepost color={'#FFFFFF'} />
        <p>
          {counter} repost{counter > 0 ? "s" : null }
        </p>
      </StyledRepostButton>
      <Modal
        className="content"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <ModalContent error={error}>
          {error ? (
            <>
              <p>Error: Could not repost this link at this time.</p>
              <div>
                <button
                  className="cancel"
                  onClick={() => {
                    setIsOpen(false);
                    setError(false);
                  }}
                  disabled={isLoading}
                >
                  Ok, go back
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                Do you want to re-post <br />
                this link?
              </p>
              <div>
                <button
                  className="cancel"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  No, cancel
                </button>
                <button onClick={repostPost} disabled={isLoading}>
                  {isLoading ? "Sharing..." : "Yes, share!"}
                </button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      {isLoading && <Overlay />}
    </>
  );
}

const StyledRepostButton = styled.button`
  margin-top: 15px;
  width: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  color: #FFFFFF;
`;

const ModalContent = styled.div`
  color: white;
  p {
    max-width: 360px;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    margin-bottom: 47px;

    @media (max-width: 614px) {
    font-size: 20px;
}
  }
  div {
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.error ? "center" : "space-between")};
    padding: 0px 30px;
    button {
      width: 134px;
      height: 37px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      border: none;
      color: #ffffff;
      background: #1877f2;

      @media (max-width: 614px) {
      padding: 5px 20px;
      font-size: 14px;  
      margin-right: 5px;
    }
    }
    button.cancel {
      background: #ffffff;
      color: #1877f2;
    }
    button:disabled {
      filter: brightness(0.7);
    }
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