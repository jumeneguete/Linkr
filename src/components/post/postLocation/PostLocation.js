import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { IoLocationSharp } from "react-icons/io5";

import "./StyleModal.css";
import PostLocationModal from './PostLocationModal';

Modal.setAppElement("body");

export default function PostLocation({ user, geolocation }) {

  const [locationIsOpen, setLocationIsOpen] = useState(false);
  

  function toggleLocationModal() {
    setLocationIsOpen(!locationIsOpen);
  }

  return (
    <>
      <LocationIcon onClick={toggleLocationModal}>
        <IoLocationSharp />
      </LocationIcon>
      <PostLocationModal
        locationIsOpen={locationIsOpen}
        onRequestClose={toggleLocationModal}
        user={user}
        geolocation={geolocation}    
      />
    </>
  );
}

const LocationIcon = styled(IoLocationSharp)`
  color: white;
  font-size: 20px;
`;