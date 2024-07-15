import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";
import NavBar from "../component/NavBarComp/NavBar";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import { SlArrowRight } from "react-icons/sl";
import styles from "../css/homescreen.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [animalType, setAnimalType] = useState("강아지");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const goCommunity = () => {
    const animalTypeMap = {
      강아지: "dog",
      고양이: "cat",
      특수동물: "exoticpet",
    };
    const currentAnimalType = animalTypeMap[animalType] || "dog";
    navigate(`/community/preview/${currentAnimalType}/freedomAndDaily`);
  };

  const handleOpenPetBottomSheet = () => {
    setBottomSheetType("pet");
    setShowBottomSheet(true);
  };
  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  return (
    <div>
      <TopBar />
      <AnimalSelect
        onClick={handleOpenPetBottomSheet}
        selectedPet={selectedPet}
      />
      <BottomSheet
        show={showBottomSheet}
        onClose={handleCloseBottomSheet}
        type={bottomSheetType}
        initialTags={[]}
        setSelectedPet={setSelectedPet}
      />
      <div className={styles.animalProfileImgArea}>
        <div className={styles.animalProfileImg}>
          <div className={styles.animalProfileImgEditBtn}></div>
        </div>
      </div>
      <div className={styles.homeMenuArea}>
        <div className={styles.communityMenu}></div>
        <div className={styles.promptyMenu}></div>
        <div className={styles.anyMenu}></div>
      </div>
      <div className={styles.shortsPreivewArea}>
        <div className={styles.areaTitleWrap}>
          <div className={styles.areaTitle}>쇼츠</div>
          <SlArrowRight />
        </div>
        <div className={styles.shortsWrap}>
          <div className={styles.shortItem}></div>
          <div className={styles.shortItem}></div>
          <div className={styles.shortItem}></div>
          <div className={styles.shortItem}></div>
          <div className={styles.shortItem}></div>
          <div className={styles.seeMore}>커뮤니티 더보기</div>
        </div>
      </div>
      <div className={styles.communityPreivewArea}>
        <div className={styles.areaTitleWrap}>
          <div className={styles.areaTitle}>커뮤니티</div>
          <SlArrowRight />
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Home;
