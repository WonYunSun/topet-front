import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/homescreen.module.css";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";

const LoginPage = () => {
  const goKaKaoLogin = () => {
    axios
      .get('http://localhost:8081/api/member/kakaoLogin', {
        withCredentials: true,
      })
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("서버 응답:", error);
        return error;
      });
  };

  return (
    <div>
      <h1>로그인페이지</h1>
      <div className={styles.tempWrap}>
        <img
          src="/img/kakao_login_large_narrow.png"
          onClick={goKaKaoLogin}
          alt="카카오 로그인"
        />
        <IoIosLogOut size={20} />
      </div>
    </div>
  );
};

export default LoginPage;
