import { createGlobalStyle } from "styled-components";
import "../asset/font/font.css";

const GlobalStyle = createGlobalStyle`
body {
    font-family: "SUIT Variable", sans-serif;
}

input{
    font-family: "SUIT Variable", sans-serif;
}
select{
    font-family: "SUIT Variable", sans-serif;
    outline:none;
    border: none;
}
button {
    font-family: "SUIT Variable", sans-serif;
}
`;

export default GlobalStyle;
