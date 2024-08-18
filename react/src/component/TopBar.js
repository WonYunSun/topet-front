import React from "react";
import { GoArrowLeft, GoHome, GoChevronDown } from "react-icons/go";
import { IoSearch, IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "../css/topbar.module.css";
import { ReactComponent as Logo } from "../asset/icon/TopetLogo.svg";
import { CgClose } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const TopBar = ({
  centerChange,
  selectedSearchType,
  searchText,
  setSearchText,
  handleBottomSheetOpen,
  isHome,
  isSearchMode,
  toggleSearchMode,
  onSearch,
  resetSearch,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (isSearchMode) {
      resetSearch(); // searchText 초기화 및 searchMode false 설정
    } else {
      navigate(-1); // 뒤로가기
    }
  };

  const goHome = () => {
    navigate("/home"); // 홈으로 이동
  };

  const handleAnimalSelectClick = () => {
    handleBottomSheetOpen(centerChange);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value); // 입력값을 상태로 업데이트
  };

  const renderTopBar = () => {
    if (isSearchMode) {
      return (
        <>
          <Mobile>
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
                  <IoMdArrowDropdown />
                </button>
              </div>
              <button className={styles.searchButton} onClick={onSearch}>
                검색
              </button>
            </div>
          </Mobile>
          <DeskTop>
            <div className={`${styles.topbar} ${styles.dtver}`}>
              <CgClose className={styles.icon} onClick={goBack} />
              <div className={`${styles.searchContainer} ${styles.dtver}`}>
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
                  <IoMdArrowDropdown />
                </button>
              </div>
              <button className={styles.searchButton} onClick={onSearch}>
                <CgSearch className={styles.icon} />
              </button>
            </div>
          </DeskTop>
        </>
      );
    } else {
      switch (centerChange) {
        case "강아지":
        case "고양이":
        case "특수동물":
          return (
            <>
              <Mobile>
                <div className={styles.topbar}>
                  <GoArrowLeft className={styles.icon} onClick={goBack} />

                  <div
                    className={styles.animalSelectBox}
                    onClick={handleAnimalSelectClick}
                  >
                    {centerChange}
                    <GoChevronDown className="arrow-bottom" />
                  </div>
                  <CgSearch
                    className={styles.icon}
                    onClick={toggleSearchMode}
                  />
                </div>
              </Mobile>
              <DeskTop>
                <div className={`${styles.topbar}  ${styles.dtver}`}>
                  <div
                    className={`${styles.animalSelectBox} ${styles.dtver}`}
                    onClick={handleAnimalSelectClick}
                  >
                    {centerChange}
                    <GoChevronDown className="arrow-bottom" />
                  </div>
                  <CgSearch
                    className={styles.icon}
                    onClick={toggleSearchMode}
                  />
                </div>
              </DeskTop>
            </>
          );
        case "로고":
        case "쇼츠":
          return (
            <>
              <Mobile>
                <div className={styles.topbar}>
                  <GoArrowLeft className={styles.icon} onClick={goBack} />
                  <div>
                    <input
                      placeholder="쇼츠를 검색해보세요"
                      className={styles.searchInput}
                      value={searchText}
                      onChange={handleSearchTextChange}
                    />
                    <CgSearch color="#333" />
                  </div>
                  <GoHome className={styles.icon} onClick={goHome} />
                </div>
              </Mobile>
              <DeskTop>
                <div
                  className={`${styles.topbar}  ${styles.dtver} ${styles.shorts}`}
                >
                  <div
                    className={`${styles.searchContainer} ${styles.dtver} ${styles.shorts}`}
                  >
                    <input
                      placeholder="쇼츠를 검색해보세요"
                      className={styles.searchInput}
                      value={searchText}
                      onChange={handleSearchTextChange}
                    />
                  </div>
                  <button
                    className={`${styles.searchButton} ${styles.shorts}`}
                    onClick={onSearch}
                  >
                    <CgSearch className={styles.icon} />
                  </button>
                </div>
              </DeskTop>

              {/*  */}
            </>
          );
        default:
          return (
            <div
              className={`${styles.topbar} ${isHome ? styles.homeComp : ""}`}
            >
              <GoArrowLeft
                className={`${styles.icon} ${isHome ? styles.hidden : ""}`}
                onClick={goBack}
              />
              <Logo width={37} height={37} />
              <GoHome
                className={`${styles.icon} ${isHome ? styles.hidden : ""}`}
                onClick={goHome}
              />
            </div>
          );
      }
    }
  };

  return renderTopBar();
};

export default TopBar;
