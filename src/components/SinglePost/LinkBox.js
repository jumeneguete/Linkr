import { LinkContainer, LinkInfo, LinkImg } from "./Styles"
import Modal from './Modal';
import { useState } from "react";

export default function LInkBox({linkTitle,linkDescription, link, linkImage }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);


    return (
        <div >
            < Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />

            <LinkContainer onClick={() => setModalIsOpen(!modalIsOpen)}>
                <LinkInfo>
                    <h1>{linkTitle}</h1>
                    <p>{linkDescription}</p>
                    <span>{link}</span>
                </LinkInfo>
                <LinkImg backgroud={linkImage} />
            </LinkContainer>
        </div>
    );
}