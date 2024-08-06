import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/loginpage.module.css";
import { IoIosLogOut } from "react-icons/io";
import { ReactComponent as Logo } from "../asset/icon/TopetLogo_Login.svg";
import { ReactComponent as KakaoLoginBtn } from "../asset/icon/KakaoLoginBtn.svg";
import { ReactComponent as MainImg } from "../asset/icon/MainImg.svg";

const LoginPage = () => {
  const goKaKaoLogin = () => {
    axios
      .get(
        // 'http://175.45.202.131:8081/api/member/kakaoLogin',
        // "http://localhost:8081/api/member/kakaoLogin",
        "https://thxkyu.kro.kr:5000/api/member/kakaoLogin",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("서버 응답:", error);
        return error;
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo_wrapper}>
        <div className={styles.subtitle}>반려동물 라이프스타일 매니저</div>
        <div className={styles.logo}>
          <Logo width={140} />
        </div>
      </div>
      {/* <IoIosLogOut className={styles.logout_icon} size={20} /> */}
      <MainImg className={styles.main_img} />
      <div className={styles.kakao_button_wrapper}>
        <KakaoLoginBtn
          className={styles.kakao_button}
          onClick={goKaKaoLogin}
          alt="카카오 로그인"
        />
      </div>
      <div className={styles.privacy_notice_text}>
        시작과 동시에 투펫의{" "}
        <span className={styles.privacy_notice_text_bold}>
          서비스 약관, 개인정보 취급방침
        </span>
        에 동의하게 됩니다.
      </div>
    </div>
  );
};

export default LoginPage;
