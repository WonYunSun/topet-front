import React from "react";
import { useSelector } from "react-redux"; // Redux 사용을 위한 훅
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import styles from "../css/tobBarWeb.module.css";
import { ReactComponent as Logo } from "../asset/icon/TopetLogo.svg";

const TopBarWeb = () => {
  const reduxMember = useSelector((state) => state.member.member);
  const navigate = useNavigate();

  // 페이지 이동 함수들
  const goHome = () => {
    navigate(`/home`);
  };

  const goCalendar = () => {
    navigate(`/schedule`);
  };

  const goMap = () => {
    navigate(`/map`);
  };

  const goMypage = () => {
    navigate(`/mypage`);
  };

  const goShorts = () => {
    navigate(`/shorts`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.nabbarInner}>
        <div className={styles.logoContainer}>
          <Logo
            width={37}
            height={37}
            onClick={goHome}
            style={{ cursor: "pointer" }}
            className={styles.logo}
          />
        </div>
        <div className={styles.navLinks}>
          <span onClick={goHome} className={styles.navLink}>
            홈
          </span>
          <span onClick={goCalendar} className={styles.navLink}>
            캘린더
          </span>
          <span onClick={goMap} className={styles.navLink}>
            지도
          </span>
          <span onClick={goMap} className={styles.navLink}>
            커뮤니티
          </span>
          <span onClick={goShorts} className={styles.navLink}>
            쇼츠
          </span>
        </div>
        <div className={styles.right}>
          {reduxMember ? (
            <div className={styles.profile} onClick={goMypage}>
              <img
                src={reduxMember.profileImage}
                alt="Profile"
                className={styles.profileImage}
              />
              <span className={styles.profileName}>{reduxMember.name}</span>
            </div>
          ) : (
            <button className={styles.loginBtn}>로그인하기</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBarWeb;
