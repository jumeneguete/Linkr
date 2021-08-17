import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
    font-family: 'Lato', sans-serif;
    background-color: #333;
};
.ReactModal__Body--open {
    overflow: hidden;
}
`

export default GlobalStyle;