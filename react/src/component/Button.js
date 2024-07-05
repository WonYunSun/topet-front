import React from "react";
import style from "../css/button.module.css";

const Button = ({ text, postServer_withoutPhotos,postServer_withPhotos, btnstyle }) => {
  const textVerification = () => {
    // 정확한 조건 검사
    if (text === "작성 완료" || text === "완료") {
      postServer_withoutPhotos()
      postServer_withPhotos()
    }
  };

  return (
    <button className={style[btnstyle]} onClick={textVerification}>
      {text}
    </button>
  );
};

export default Button;
