import { createGlobalStyle } from "styled-components";
import "../asset/font/font.css";

const GlobalStyle = createGlobalStyle`

*{
  -webkit-tap-highlight-color:transparent; /* 요소 클릭 시 배경 제거 */
  -webkit-tap-highlight-color:rgba(0, 0,0,0);/* 일부 안드로이드 브라우저를 위한 설정 */ 
  -webkit-focus-ring-color:transparent;/* 일부 최신 버전의 크롬을 위한 설정 */

}
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
    user-select: none;
}
button {
  outline: none; /* 포커스 시 생기는 테두리 제거 */
  background-color: initial;

}

button:focus {
  outline: none; /* 포커스 시 생기는 테두리 제거 */

  
}

button:active {
  -webkit-tap-highlight-color: transparent;
  outline: none !important; box-shadow: none !important;
  background-color: transparent !important; /* 클릭 시 배경색 변경 방지 */
}
`;

export default GlobalStyle;
