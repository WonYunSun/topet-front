import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../css/tobBarWeb.module.css";
import { ReactComponent as Logo } from "../asset/icon/TopetLogo.svg";

const TopBarWeb = () => {
  const reduxMember = useSelector((state) => state.member.member);
  const navigate = useNavigate();

  const goMypage = () => {
    navigate(`/mypage`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.nabbarInner}>
        <div className={styles.logoContainer}>
          <Logo
            width={37}
            height={37}
            onClick={() => navigate(`/home`)}
            style={{ cursor: "pointer" }}
            className={styles.logo}
          />
        </div>
        <div className={styles.navLinks}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            홈
          </NavLink>
          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            캘린더
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            지도
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            커뮤니티
          </NavLink>
          <NavLink
            to="/shorts"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            쇼츠
          </NavLink>
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
