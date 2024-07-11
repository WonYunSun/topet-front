import React from "react";
import { GoArrowLeft, GoHome, GoChevronDown } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import styles from "../css/topbar.module.css";

const TopBar = ({ centerChange, handleBottomSheetOpen }) => {
  const navigate = useNavigate();
  // console.log(centerChange)

  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  const goHome = () => {
    navigate("/api"); // 홈으로 이동
  };

  const handleAnimalSelectClick = () => {
    handleBottomSheetOpen(centerChange);
  };

  const renderTopBar = () => {
    switch (centerChange) {
      case "강아지":
      case "고양이":
      case "특수동물":
        return (
          <div className={styles.topbar}>
            <GoArrowLeft className={styles.icon} onClick={goBack} />
            <div
              className={styles.animalSelectBox}
              onClick={handleAnimalSelectClick}
            >
              {centerChange}
              <GoChevronDown className="arrow-bottom" />
            </div>
            <CiSearch className={styles.icon} />
          </div>
        );
      case "로고":
      default:
        return (
          <div className={styles.topbar}>
            <GoArrowLeft className={styles.icon} onClick={goBack} />
            <div className={styles.logo}>투펫</div>
            <GoHome className={styles.icon} />
          </div>
        );
    }
  };

  return renderTopBar();
};

export default TopBar;
