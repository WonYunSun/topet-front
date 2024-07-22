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
button {
  outline: none; /* 포커스 시 생기는 테두리 제거 */
  background-color: initial;
}

button:focus {
  outline: none; /* 포커스 시 생기는 테두리 제거 */
}

button:active {
  outline: none; /* 클릭 시 생기는 테두리 제거 */
  background-color: initial; /* 클릭 시 배경색 변경 방지 */
}
`;

export default GlobalStyle;
