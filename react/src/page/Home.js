import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";
import NavBar from "../component/NavBarComp/NavBar";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import { SlArrowRight } from "react-icons/sl";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { HiPlayCircle } from "react-icons/hi2";
import { PiGear } from "react-icons/pi";
import { IoChatbubbles } from "react-icons/io5";
import ScheduleToday from "../component/HomeComp/ScheduleToday";
import { ReactComponent as AiIcon } from "../asset/icon/ai.svg";
import ShortsList from "../component/ShortsComp/ShortsList";
import styles from "../css/homescreen.module.css";
// import CommunityList from "../component/CommunityComp/CommunityList"; //작업 연기

const Home = () => {
  const link =
    "https://kauth.kakao.com/oauth/authorize?client_id=3494afad7131fc9645ae9b08ed0dfda6&redirect_uri=http://localhost:8081/api/kakaoLogin/OAuth&response_type=code";
  const goKaKaoLogin = () => {
    window.location.href = link;
  };
  const navigate = useNavigate();
  const [animalType, setAnimalType] = useState("강아지");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  // 스케쥴 더미데이터. 사실 오늘 날짜의 스케쥴만 가져오면 됨
  const [schedules, setSchedule] = useState([
    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },

    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 2,
      startDate: "2024-07-10T09:00:00",
      endDate: "2024-07-10T10:00:00",
      scheduleTitle: "코코 아침 산책",
      scheduleContent: "test1",
      isComplete: true,
      color: "#2F9ABA",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 3,
      startDate: "2024-07-20T09:00:00",
      endDate: "2024-07-23T10:00:00",
      scheduleTitle: "드디어됐네이시발거",
      scheduleContent: "test1",
      isComplete: true,
      color: "#2F9ABA",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 4,
      startDate: "2024-07-20T09:00:00",
      endDate: "2024-07-23T10:00:00",
      scheduleTitle: "드디어됐네이시발거",
      scheduleContent: "test1",
      isComplete: true,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
  ]);

  const goCommunity = () => {
    const animalTypeMap = {
      강아지: "dog",
      고양이: "cat",
      특수동물: "exoticpet",
    };

    const currentAnimalType = animalTypeMap[animalType] || "dog";
    navigate(`/community/preview/${currentAnimalType}/freedomAndDaily`);
  };
  const goCalendar = () => {
    navigate(`/api/schedule`);
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
      thumbnailUrl:
        "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Dummy Video 1",
      author: "Author 1",
    },
    {
      id: 2,
      videoUrl: "https://dummyvideo2.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  // 프로필 카드 플립 관련

  const Animal = {
    photo:
      "https://images.unsplash.com/photo-1591703166380-e36be05eb7bf?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "코코",
    age: "3살",
    gender: "여",
    breed: "푸들",
    weight: "5kg",
    health: "예방접종 완료, 알러지 없음",
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <TopBar />
      {/* <img
        src="/img/kakao_login_large_narrow.png"
        onClick={goKaKaoLogin}
        width={"100%"}
      /> */}

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

      <div
        className={`${styles.flipCard} ${isFlipped ? styles.flipped : ""}`}
        onClick={handleClick}
      >
        <div className={styles.flipCardInner}>
          {/* 카드 앞면 */}
          <div className={styles.flipCardFront}>
            <div className={styles.frontInfoWrap}>
              <div className={styles.photo}>
                <img src={Animal.photo} alt="프로필" />
              </div>
              <div className={styles.infoWrap}>
                <div className={styles.info}>
                  <div className={styles.name}>{Animal.name}</div>
                  <div className={styles.age}>나이: {Animal.age}</div>
                  <div className={styles.gender}>성별: {Animal.gender}</div>
                  <div className={styles.breed}>종: {Animal.breed}</div>
                </div>
                <div className={styles.arrow}>
                  <IoArrowForwardCircleOutline size={20} color={"#8583836e"} />
                </div>
              </div>
            </div>
          </div>
          {/* 카드 뒷면 */}
          <div className={styles.flipCardBack}>
            <div className={styles.info}>
              <h2>추가 정보</h2>
              <p>몸무게: {Animal.weight}</p>
              <p>건강 사항: {Animal.health}</p>
            </div>
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

      <div className={styles.scheduleTodayWrap}>
        <div className={styles.areaTitleWrap}>
          <div className={styles.areaTitle}>오늘의 일정</div>
          <SlArrowRight onClick={goCalendar} />
        </div>
        <ScheduleToday schedules={schedules} />
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
