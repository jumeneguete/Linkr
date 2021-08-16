import { useState } from "react";

import LinkPageContentModal from './LinkPageContentModal';
import { LinkContainer, LinkInfo, LinkImg } from "../../SinglePost/Styles"

export default function LinkToContent({linkTitle,linkDescription, link, linkImage }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    return (
        <div >
            < LinkPageContentModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                link={link}
                linkTitle ={linkTitle}
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