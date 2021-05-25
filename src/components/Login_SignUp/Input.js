import styled from "styled-components";

export default function Input({type, placeholder}) {
    return (
        <InputStyle type={type} placeholder={placeholder}></InputStyle>
    );
}

const InputStyle = styled.input`
    width: 80%;
    height: 45px;
    padding-left: 10px;
    margin-bottom: 5px;
    border-radius: 5px;

    @media (max-width: 600px) {
        width: 90%;
    }

    &::placeholder{
            font-family: "Oswald", sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: #9F9F9F;
        }
        &:focus{
            box-shadow: 0 0 0 0;
            outline: 0;
        }
`;