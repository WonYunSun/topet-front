import React, { useState } from "react";
import { GoArrowLeft, GoHome, GoChevronDown } from "react-icons/go";
import { IoSearch, IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import styles from "../css/topbar.module.css";

const TopBar = ({
  centerChange,
  selectedSearchType,
  searchText,
  setSearchText,
  handleBottomSheetOpen,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  const goHome = () => {
    navigate("/home"); // 홈으로 이동
  };

  const handleAnimalSelectClick = () => {
    handleBottomSheetOpen(centerChange);
  };

  const goSearch = () => {
    navigate("/community/search", { state: { centerChange: "검색" } });
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value); // 입력값을 상태로 업데이트
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
            <CiSearch className={styles.icon} onClick={goSearch} />
          </div>
        );
      case "검색":
        return (
          <div className={styles.topbar}>
            <GoArrowLeft className={styles.icon} onClick={goBack} />
            <div className={styles.searchContainer}>
              <input
                className={styles.searchInput}
                placeholder="검색어를 입력하세요"
                value={searchText}
                onChange={handleSearchTextChange}
              />
              <button
                className={styles.dropdownButton}
                onClick={() => handleBottomSheetOpen("검색")}
              >
                {selectedSearchType}
                <IoMdArrowDropdown className={styles.dropdownIcon} />
              </button>
            </div>
            <button className={styles.searchButton}>검색</button>
          </div>
        );
      case "로고":
      case "쇼츠":
        return (
          <div className={styles.topbar}>
            <GoArrowLeft className={styles.icon} onClick={goBack} />
            <div>
              <input
                placeholder="쇼츠를 검색해보세요"
                className={styles.searchInput}
                value={searchText}
                onChange={handleSearchTextChange}
              />
              <IoSearch color="#333" />
            </div>
            <GoHome className={styles.icon} onClick={goHome} />
          </div>
        );
      default:
        return (
          <div className={styles.topbar}>
            <GoArrowLeft className={styles.icon} onClick={goBack} />
            <div className={styles.logo}>투펫</div>
            <GoHome className={styles.icon} onClick={goHome} />
          </div>
        );
    }
  };

  return renderTopBar();
};

export default TopBar;
