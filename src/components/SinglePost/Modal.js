import React from "react";
import ReactModal from 'react-modal';

ReactModal.setAppElement("body");


const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#333333",
      borderRadius: "20px",
      margin: "20px 50px",
      margin: "0 auto",
      padding: "20px 50px",
    },
  };
  
  export default function Modal({ modalIsOpen,setModalIsOpen,style={customStyles} }) {
      
    return (
      <ReactModal isOpen={modalIsOpen}>

           <button onClick={()=> setModalIsOpen(!modalIsOpen)}>Close Modal</button>
       
      </ReactModal>
    );
  }