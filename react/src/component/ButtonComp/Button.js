import React from "react";
import style from "../../css/button.module.css";

const Button = ({
  text,
  btnstyle,
  onClick, // 외부에서 전달받은 onClick 핸들러 추가
  disabled, // 버튼 disbaled 속성 받기
}) => {
  const textVerification = () => {
    // 정확한 조건 검사
    if (text === "작성 완료" || text === "완료") {
      onClick();
    }
  };

  return (
    <button
      className={style[btnstyle]}
      onClick={textVerification}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
