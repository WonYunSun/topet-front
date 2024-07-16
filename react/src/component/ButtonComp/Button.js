import React from "react";
import style from "../../css/button.module.css";

const Button = ({
  text,
  btnstyle,
  onClick,
  disabled,
}) => {
  const textVerification = () => {
    if (text === "작성 완료" || text === "완료") {
      onClick();
    } else if(text === "취소") {
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
