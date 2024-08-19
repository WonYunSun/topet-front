import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../component/TopBar";
import BottomSheet from "../component/BottomSheet";
import styles from "../css/community.module.css";
import CommunityList from "../component/CommunityComp/CommunityList";
import FloatingBtn from "../component/ButtonComp/FloatingBtn";
import { IoMdArrowDropdown } from "react-icons/io";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const animalTypeMapReverse = {
  dog: "강아지",
  cat: "고양이",
  exoticpet: "특수동물",
};

const animalTypeMap = {
  강아지: "dog",
  고양이: "cat",
  특수동물: "exoticpet",
};

const categoryMap = {
  freedomAndDaily: "자유/일상",
  curious: "궁금해요",
  sharingInformation: "정보공유",
};

const Community = () => {
  // responsive
  const isDeskTop = useMediaQuery({
    query: "(min-width: 1110px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  // -------------------------

  const navigate = useNavigate();
  const { animalType, category } = useParams();

  const selectedAnimalType = animalTypeMapReverse[animalType] || "강아지";

  const [selectedCenter, setSelectedCenter] = useState(selectedAnimalType);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState("");
  const [sortListText, setSortListText] = useState("최신순");
  const [searchMode, setSearchMode] = useState(false);
  const [selectedSearchType, setSelectedSearchType] = useState("제목+본문");
  const [searchText, setSearchText] = useState("");
  const [currentSearchText, setCurrentSearchText] = useState("");
  const [currentSearchType, setCurrentSearchType] = useState("제목+본문");

  const goCommunityWrite = () => {
    const animalKey = animalTypeMap[selectedAnimalType] || "dog";
    navigate("/community/communityWrite", { state: { animal: animalKey } });
  };

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  const handleSelectPet = (pet) => {
    setSelectedCenter(pet);
    const newAnimalType = animalTypeMap[pet] || "dog";
    navigate(`/community/preview/${newAnimalType}/freedomAndDaily`, {
      replace: true,
    });
  };

  const handleSelectSortListText = (text) => {
    setSortListText(text);
    handleBottomSheetClose();
  };

  const handleCategoryChange = (newCategory) => {
    const animalKey = animalTypeMap[selectedCenter] || "dog";
    navigate(`/community/preview/${animalKey}/${newCategory}`, {
      replace: true,
    });
  };

  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
  };

  const handleSearch = () => {
    
    console.log(selectedSearchType)
    
    setCurrentSearchText(searchText);

    setCurrentSearchType(selectedSearchType);
  };

  const resetSearch = () => {
    setSearchText("");
    setSearchMode(false);
    setCurrentSearchText("");
    setSelectedSearchType("제목+본문");
  };

  return (
    <>
      <Mobile>
        <div className={styles.community}>
          <TopBar
            isDeskTop={isDeskTop}
            centerChange={selectedCenter}
            handleBottomSheetOpen={handleBottomSheetOpen}
            selectedSearchType={selectedSearchType}
            searchText={searchText}
            setSearchText={setSearchText}
            isSearchMode={searchMode}
            toggleSearchMode={toggleSearchMode}
            onSearch={handleSearch}
            resetSearch={resetSearch}
          />

          <div className={styles.category_buttons_area}>
            <button
              className={styles.category_button}
              onClick={() => handleCategoryChange("freedomAndDaily")}
              disabled={category === "freedomAndDaily"}
            >
              #자유/일상
            </button>
            <button
              className={styles.category_button}
              onClick={() => handleCategoryChange("curious")}
              disabled={category === "curious"}
            >
              #궁금해요
            </button>
            <button
              className={styles.category_button}
              onClick={() => handleCategoryChange("sharingInformation")}
              disabled={category === "sharingInformation"}
            >
              #정보공유
            </button>
          </div>

          <div className={styles.menu_area}>
            <div className={styles.category_text}>
              {currentSearchText ? `"${currentSearchText}" 검색결과` : ""}
            </div>
            <div
              className={styles.sort_option}
              onClick={() => handleBottomSheetOpen("sort")}
            >
              {sortListText}
              <IoMdArrowDropdown />
            </div>
          </div>
          <CommunityList
            selectedAnimal={selectedCenter}
            sortListText={sortListText}
            searchText={currentSearchText}
            searchType={currentSearchType}
          />
          <FloatingBtn onClick={goCommunityWrite} />
          <BottomSheet
            show={showBottomSheet}
            onClose={handleBottomSheetClose}
            type={bottomSheetType}
            setSelectedPet={handleSelectPet}
            handleSelectSortListText={handleSelectSortListText}
            setSelectedSearchType={setSelectedSearchType}
          />
        </div>
      </Mobile>
      <DeskTop>
        <div className={`${styles.community} ${styles.dtver}`}>
          <div className={`${styles.commu_sidebar}`}>
            <div className={`${styles.category_buttons_area} ${styles.dtver}`}>
              <div className={styles.sidebarTitle}>커뮤니티</div>
              <div className={styles.categoryTitle}># 카테고리</div>
              <button
                className={`${styles.category_button} ${styles.dtver}`}
                onClick={() => handleCategoryChange("freedomAndDaily")}
                disabled={category === "freedomAndDaily"}
              >
                #자유/일상
              </button>
              <button
                className={styles.category_button}
                onClick={() => handleCategoryChange("curious")}
                disabled={category === "curious"}
              >
                #궁금해요
              </button>
              <button
                className={styles.category_button}
                onClick={() => handleCategoryChange("sharingInformation")}
                disabled={category === "sharingInformation"}
              >
                #정보공유
              </button>
            </div>
          </div>
          <div className={`${styles.comm_listbox} ${styles.dtver}`}>
            <TopBar
              isDeskTop={isDeskTop}
              centerChange={selectedCenter}
              handleBottomSheetOpen={handleBottomSheetOpen}
              selectedSearchType={selectedSearchType}
              searchText={searchText}
              setSearchText={setSearchText}
              isSearchMode={searchMode}
              toggleSearchMode={toggleSearchMode}
              onSearch={handleSearch}
              resetSearch={resetSearch}
            />
            <div className={styles.menu_area}>
              <div className={styles.category_text}>
                {currentSearchText ? `"${currentSearchText}" 검색결과` : ""}
              </div>
              <div
                className={styles.sort_option}
                onClick={() => handleBottomSheetOpen("sort")}
              >
                {sortListText}
                <IoMdArrowDropdown />
              </div>
            </div>
            <CommunityList
              selectedAnimal={selectedCenter}
              sortListText={sortListText}
              searchText={currentSearchText}
              searchType={currentSearchType}
            />
          </div>
          <BottomSheet
            show={showBottomSheet}
            onClose={handleBottomSheetClose}
            type={bottomSheetType}
            setSelectedPet={handleSelectPet}
            handleSelectSortListText={handleSelectSortListText}
            setSelectedSearchType={setSelectedSearchType}
          />
        </div>
        <FloatingBtn onClick={goCommunityWrite} />
      </DeskTop>
    </>
  );
};

export default Community;
