import {InputStyle} from "./Styles"

export default function Input({type, placeholder, value, onChange, disabled}) {
    return (
        <InputStyle type={type} placeholder={placeholder} onChange={onChange} value={value} disabled ={disabled}></InputStyle>
    );
}