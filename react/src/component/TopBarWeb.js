import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import styles from "../css/tobBarWeb.module.css";
import { ReactComponent as Logo } from "../asset/icon/TopetLogo_Login.svg";
import memberApi from "../api/memberApi"; // 로그아웃 API 가져오기
import { updateMember } from "../redux/reducers/memberReducer";
import { updatePetList } from "../redux/reducers/petListReducer";
import { updateSelectedPet } from "../redux/reducers/selectedPetReducer";
import { IoLogOutOutline } from "react-icons/io5";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";
const TopBarWeb = () => {
  const reduxPet = useSelector((state) => state.selectedPet.selectedPet);
  const reduxMember = useSelector((state) => state.member.member);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [animalType, setAnimalType] = useState("강아지"); // 유저가 선택한 동물 타입 저장

  const animalTypeMap = {
    1: "dog",
    2: "cat",
    3: "exoticpet",
  };

  useEffect(() => {
    let animalTypeValue = null;
    if (reduxPet) {
      animalTypeValue = animalTypeMap[reduxPet.type];
    } else if (reduxPet === undefined) {
      animalTypeValue = animalTypeMap[1];
    }
    setAnimalType(animalTypeValue);
  }, [reduxPet]);

  const goMypage = () => {
    navigate(`/mypage`);
  };

  const handleLogout = async () => {
    const response = await memberApi.logout();
    if (response.status === 200 && response.data === "success") {
      dispatch(updateMember(""));
      dispatch(updatePetList([]));
      dispatch(updateSelectedPet(""));
      navigate(`/login`);
    }
    console.log("!! 로그아웃 !!");
  };

  console.log(reduxMember);
  return (
    <nav className={styles.navbar}>
      <div className={styles.nabbarInner}>
        <div className={styles.logoContainer}>
          <Logo
            width={50}
            fill={"#ffa62f"}
            color=""
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
            to={`/community/preview/${animalType}/freedomAndDaily`}
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
          <NavLink
            to="/topetai"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            투펫AI
          </NavLink>
        </div>
        <div className={styles.right}>
          {reduxMember ? (
            <>
              <div className={styles.profile} onClick={goMypage}>
                <img
                  src={reduxMember.profileImage}
                  alt="Profile"
                  className={styles.profileImage}
                />
                <span className={styles.profileName}>{reduxMember.name}</span>
              </div>
              <button
                className={styles.logoutBtn} // 로그아웃 버튼 스타일 추가 가능
                onClick={handleLogout} // 로그아웃 핸들러 연결
              >
                <IoLogOutOutline size={17} />
              </button>
            </>
          ) : (
            <button
              className={styles.loginBtn}
              onClick={() => navigate(`/login`)}
            >
              로그인하기
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBarWeb;
