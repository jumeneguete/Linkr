import { useState } from "react";
import styled from "styled-components";
import { IoLocationSharp } from "react-icons/io5";

import PostLocationModal from './PostLocationModal';

export default function PostLocation({ user, geolocation }) {

  const [locationIsOpen, setLocationIsOpen] = useState(false);

  function toggleLocationModal() {
    setLocationIsOpen(!locationIsOpen);
  }

  return (
    <>
      <LocationIcon 
        onClick={toggleLocationModal} 
      />
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
  font-size: 17px;
  cursor: pointer;
  margin-left: 10px;
`;