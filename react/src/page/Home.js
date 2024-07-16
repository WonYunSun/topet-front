import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";
import NavBar from "../component/NavBarComp/NavBar";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import { SlArrowRight } from "react-icons/sl";

import { HiPlayCircle } from "react-icons/hi2";
import { PiGear } from "react-icons/pi";
import { IoChatbubbles } from "react-icons/io5";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { ReactComponent as AiIcon } from "../asset/icon/ai.svg";
import ShortsList from "../component/ShortsComp/ShortsList";
import styles from "../css/homescreen.module.css";
// import CommunityList from "../component/CommunityComp/CommunityList"; //작업 연기

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
  const dummyShortsData = [
    {
      id: 1,
      videoUrl: "https://dummyvideo1.com",
      thumbnailUrl: "https://dummyimage1.com",
      title: "Dummy Video 1",
      author: "Author 1",
    },
    {
      id: 2,
      videoUrl: "https://dummyvideo2.com",
      thumbnailUrl: "https://dummyimage2.com",
      title: "Dummy Video 2",
      author: "Author 2",
    },
    {
      id: 3,
      videoUrl: "https://dummyvideo3.com",
      thumbnailUrl: "https://dummyimage3.com",
      title: "Dummy Video 3",
      author: "Author 3",
    },
    {
      id: 4,
      videoUrl: "https://dummyvideo4.com",
      thumbnailUrl: "https://dummyimage4.com",
      title: "Dummy Video 4",
      author: "Author 4",
    },
    {
      id: 5,
      videoUrl: "https://dummyvideo5.com",
      thumbnailUrl: "https://dummyimage5.com",
      title: "Dummy Video 5",
      author: "Author 5",
    },
  ];
  return (
    <div>
      <TopBar />
      <AnimalSelect
        onClick={handleOpenPetBottomSheet}
        selectedPet={selectedPet}
        isHome={true}
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
          <div className={styles.animalProfileImgEditBtn}>
            <PiGear size={18} />
            {/* 마이페이지의 동물 수정 페이지로 이동하도록 */}
          </div>
        </div>
      </div>
      <div className={styles.homeMenuArea}>
        <div className={styles.communityMenu}>
          <div className={styles.Navdiv} onClick={goCommunity}>
            <IoChatbubbles />
            <span>커뮤니티</span>
          </div>
        </div>
        <div className={styles.anyMenu}>
          <div className={styles.Navdiv}>
            <HiPlayCircle />
            <span>쇼츠</span>
          </div>
        </div>
        <div className={styles.promptyMenu}>
          <div className={styles.Navdiv}>
            <AiIcon fill="orange" />
            <span>투펫AI</span>
          </div>
        </div>
      </div>
      <div className={styles.shortsPreivewArea}>
        <div className={styles.areaTitleWrap}>
          <div className={styles.areaTitle}>쇼츠</div>
          <SlArrowRight />
        </div>
        <div className={styles.shortsWrap}>
          <ShortsList shortsData={dummyShortsData} />
        </div>
      </div>
      <div className={styles.communityPreivewArea}>
        <div className={styles.areaTitleWrap}>
          <div className={styles.areaTitle}>커뮤니티</div>
          <SlArrowRight onClick={goCommunity} />
        </div>
        <div></div>
      </div>
      {/* <NavBar /> */}
    </div>
  );
};

export default Home;
