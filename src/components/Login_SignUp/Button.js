import {ButtonStyle} from "./Styles"

export default function Button ({children, disabled}){
    return (
        <ButtonStyle type="submit" disabled={disabled}>{children}</ButtonStyle>
    );
}