import React from "react";
import ReactModal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";
import styled from 'styled-components';

ReactModal.setAppElement("body");

export default function LinkPageContentModal({ locationIsOpen, onRequestClose, user, geolocation }) {
  
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  return (

    <ModalStyle locationIsOpen={locationIsOpen}>

        <Header>
          <h1>{user}'s location</h1>
          <button onClick={onRequestClose}>
            <AiOutlineClose />
          </button>
        </Header>
        <MapsFrame>
          <p>Loading location...</p>
          <LocationObject
            loading="lazy"
            allowFullScreen
            data={`https://www.google.com/maps/embed/v1/place?q=${geolocation.latitude},${geolocation.longitude}&key=${API_KEY}`}
          ></LocationObject>
        </MapsFrame>

    </ModalStyle>
  );
}

const ModalStyle = styled(ReactModal)`
    width:100%;
    height: 100vh;
    padding: 30px;
    background-color: #333333;
    position: fixed;
    top:0;
    left:0;
    z-index: 50;

    button {
      font-weight: 700;
      padding:10px 20px;
      margin-bottom: 15px;
      background-color: #1877F2;
      color: #FFF;
      border:none;
      border-radius: 7px;
    }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-family: Oswald;
    font-weight: bold;
    font-size: 38px;
    line-height: 56px;
    color: #ffffff;
  }
  button {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0px;
  }
`;

const MapsFrame = styled.div`
  font-family: Oswald;
  position: relative;
  font-size: 24px;
  width: 100%;
  height: 100%;
  max-width: 715px;
  height: 240px;
  margin-bottom: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LocationObject = styled.object`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: 715px;
    height: 240px;
    margin-bottom: 23px;

    @media (max-width: 614px) {
        height: 200px;
    }
`;