import { useContext, useState } from "react";
import axios from "axios";
import { BiRepost } from "react-icons/bi";
import styled from "styled-components";

import UserContext from "../../../contexts/UserContext";
import RePostModal from "./RePostModal";
import { callServer } from "../../../functions/apiFunctions";

export default function RePost({ postDetails, setArrayOfPosts, pageUrl }) {
  const { id, repostCount } = postDetails;
  const [repostCounter, setRepostCounter] = useState(repostCount);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userProfile } = useContext(UserContext);
  const { token } = userProfile;

  function repostPost() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const repostRequest = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/posts/${id}/share`,
      {},
      config
    );

    setIsLoading(true);
    repostRequest.then(() => {
      setModalIsOpen(false);
      setIsLoading(false);
      setRepostCounter(repostCounter + 1);
      const erroAlert = "Sorry, we couln't load this posts";
      callServer(setArrayOfPosts, pageUrl, erroAlert, config);
    });
    repostRequest.catch(() => {
      setError(true);
      setIsLoading(false);
    });
  }

  return (
    <>
      <StyledRepostButton onClick={() => setModalIsOpen(true)}>
        <BiRepost color={"#FFFFFF"} />
        <p>
          {repostCounter} repost{repostCounter > 0 ? "s" : null}
        </p>
      </StyledRepostButton>

      <RePostModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        isLoading={isLoading}
        repostPost={repostPost}
        error={error}
        setError={setError}
      />

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
  color: #ffffff;
  cursor: pointer;
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
