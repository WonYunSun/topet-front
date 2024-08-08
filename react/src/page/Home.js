import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "../component/TopBar";
import { TbMoodSuprised } from "react-icons/tb";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import { SlArrowRight } from "react-icons/sl";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { HiPlayCircle } from "react-icons/hi2";
import { IoChatbubbles } from "react-icons/io5";
import ScheduleToday from "../component/HomeComp/ScheduleToday";
import { ReactComponent as AiIcon } from "../asset/icon/ai.svg";
import ShortsList from "../component/ShortsComp/ShortsList";
import styles from "../css/homescreen.module.css";
// import CommunityList from "../component/CommunityComp/CommunityList"; //작업 연기
import CommunityListData from "../component/CommunityComp/CommunityListData";
import homeApi from "../api/homeApi";
import { updateMember } from "../redux/reducers/memberReducer";
import { updatePetList } from "../redux/reducers/petListReducer";
import { updateSelectedPet } from "../redux/reducers/selectedPetReducer";
import { FiPlus } from "react-icons/fi";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const reduxMember = useSelector((state) => state.member.member);
  const reduxPet = useSelector((state) => state.selectedPet.selectedPet);
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [animalType, setAnimalType] = useState("강아지"); // 유저가 선택한 동물 타입 저장
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(reduxPet);
  const [member, setMember] = useState();
  const [pets, setPets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const animalTypeMap = {
    1: "강아지",
    2: "고양이",
    3: "특수동물",
  };

  // 스케쥴 더미데이터. 사실 오늘 날짜의 스케쥴만 가져오면 됨
  const [schedules, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    try {
      await getHome();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  }
  fetchData();
  }, []);

  useEffect(() => {
    getSchedule();
  }, [selectedPet]);

  useEffect(() => {
    setSelectedPet(reduxPet);
    if (reduxPet) {
      const animalTypeValue = animalTypeMap[reduxPet.type];
      setAnimalType(animalTypeValue);
    }
  }, [reduxPet]);

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
    navigate(`/schedule`);
  };

  const goShorts = () => {
    navigate(`/shorts`);
  };

  const goPetregistration = () => {
    navigate(`/petregistration`);
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
  const Animal = reduxPet;
  // const Animal = {
  //   photo:
  //     "https://images.unsplash.com/photo-1591703166380-e36be05eb7bf?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   name: "코코",
  //   age: "3살",
  //   gender: "여",
  //   breed: "푸들",
  //   weight: "5kg",
  //   health: "예방접종 완료, 알러지 없음",
  // };
  const dummyCommmuData = [
    {
      title: "First Post",
      content: "This is the content of the first post.",
      images: [],
      hashtag: "react, development, coding, coding",
    },
    {
      title: "Second Post",
      content: "Content for the second post goes here.",
      images: [{ filePath: "path/to/image2.jpg", origFileName: "image2.jpg" }],
      hashtag: "javascript, frontend, webdev",
    },
    {
      title: "Third Post",
      content: "Here is the third post content.",
      images: [{ filePath: "path/to/image3.jpg", origFileName: "image3.jpg" }],
      hashtag: "css, design, ui",
    },
    {
      title: "Fourth Post",
      content: "Fourth post with some different content.",
      images: [{ filePath: "path/to/image4.jpg", origFileName: "image4.jpg" }],
      hashtag: "html, markup, web",
    },
    {
      title: "Fifth Post",
      content: "Content for the fifth post is right here.",
      images: [{ filePath: "path/to/image5.jpg", origFileName: "image5.jpg" }],
      hashtag: "nodejs, backend, server",
    },
  ];

  // const [isFlipped, setIsFlipped] = useState(false);

  // const handleClick = () => {
  //   setIsFlipped(!isFlipped);
  // };

  const getHome = async () => {
    const returnedMember = await homeApi.getHomeDataMember();
    // member을 redux에넣어야함

    const sessionMember = {
      id: returnedMember.id,
      email: returnedMember.email,
      profileSrc:returnedMember.profileSrc,
      name: returnedMember.name,
      socialId: returnedMember.socialId,
    };

    setMember(sessionMember);
    const tempPets = returnedMember.pets;

    const myPets = [];

    if (tempPets != null)
      for (let i = 0; i < tempPets.length; i++) {
        if (tempPets[i] != null) {
          let tempPet = {
            id: tempPets[i].id,
            type: tempPets[i].type,
            birth: tempPets[i].birth,
            health: tempPets[i].health,
            allergy: tempPets[i].allergy,
            gender: tempPets[i].gender,
            kind: tempPets[i].kind,
            profileSrc: tempPets[i].profileSrc,
            name: tempPets[i].name,
            weight: tempPets[i].weight,
            uid: tempPets[i].uid,
          };
          myPets.push(tempPet);
        }
      }

    setPets(myPets);
    dispatch(updateMember(sessionMember));
    dispatch(updatePetList(myPets));
    //    setPets(returnedMember.pets);

    getSchedule();
    // const pet = await homeApi.getHomeDataPet();
  };

  const getSchedule = async () => {
    if (reduxPet != null) {
      const response = await homeApi.getHomeDataSchedule(selectedPet.id);
      setSchedule(response);
    }
  };

  const calculateAge = (birthDate) => {
    const today = dayjs();
    const birth = dayjs(birthDate);
    const years = today.diff(birth, "year");
    const months = today.diff(birth.add(years, "year"), "month");

    if (years > 0) {
      return months > 0 ? `${years}살 ${months}개월` : `${years}살`;
    } else {
      return `${months}개월`;
    }
  };
  dispatch(updateSelectedPet(selectedPet));

  console.log("home출력 reduxMember : ", reduxMember);
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.homeWrap}>
      <TopBar isHome={true} />
      <Mobile>
        {pets.length == 0 ? (
          <div></div>
        ) : (
          <AnimalSelect
            onClick={handleOpenPetBottomSheet}
            selectedPet={selectedPet}
            setSelectedPet={setSelectedPet}
            isHome={true}
            pets={pets}
          />
        )}

        <BottomSheet
          show={showBottomSheet}
          onClose={handleCloseBottomSheet}
          type={bottomSheetType}
          initialTags={[]}
          setSelectedPet={setSelectedPet}
        />

        <div className={styles.flipCard}>
          <div className={styles.flipCardInner}>
            {/* 카드 앞면 */}
            <div className={styles.flipCardFront}>
              <div className={styles.frontInfoWrap}>
                <div className={styles.infoWrap}>
                  {reduxPet != null ? (
                    <div className={styles.info}>
                      <div className={styles.infoRow}>
                        <div className={styles.photo}>
                          <img src={Animal.profileSrc} alt="프로필" />

                          {/* <img */}
                            {/* // source={require(`${Animal.profileSrc}`).default} */}
                          {/* /> */}
                        </div>
                        <div className={styles.animalinfoWrap}>
                          <div className={styles.name}>
                            <span className={styles.boldText}>
                              {Animal.name}
                            </span>
                          </div>

                          <div className={styles.age}>
                            생일:{" "}
                            <span className={styles.boldText}>
                              {Animal.birth}
                              {Animal.birth && (
                                <span>({calculateAge(Animal.birth)})</span>
                              )}
                            </span>
                          </div>
                          <div className={styles.gen_kind}>
                            <div className={styles.breed}>
                              종:{" "}
                              <span className={styles.boldText}>
                                {Animal.kind}
                              </span>
                            </div>
                            <div className={styles.gender}>
                              성별:{" "}
                              <span className={styles.boldText}>
                                {Animal.gender}
                              </span>
                            </div>
                          </div>
                          <div>
                            몸무게:{" "}
                            <span className={styles.boldText}>
                              {Animal.weight}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.divider}></div>
                      <div className={styles.infoBtm}>
                        <div>
                          건강사항:{" "}
                          <span className={styles.boldText}>
                            {Animal.allergy || "-"}
                          </span>
                        </div>
                        <div>
                          알러지:{" "}
                          <span className={styles.boldText}>
                            {Animal.health || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.noAnimalWrap}>
                      <div className={styles.noAnimal}>
                        등록된 반려동물이 없어요
                        <TbMoodSuprised />
                      </div>
                      <div
                        className={styles.petRegiBtn}
                        onClick={goPetregistration}
                      >
                        <FiPlus />
                        반려동물 등록하기
                      </div>
                    </div>
                  )}
                </div>
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
          <div className={styles.anyMenu} onClick={goShorts}>
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
      </Mobile>
      <DeskTop>
        {pets.length == 0 ? (
          <div></div>
        ) : (
          <AnimalSelect
            onClick={handleOpenPetBottomSheet}
            selectedPet={selectedPet}
            setSelectedPet={setSelectedPet}
            isHome={true}
            pets={pets}
          />
        )}

        <BottomSheet
          show={showBottomSheet}
          onClose={handleCloseBottomSheet}
          type={bottomSheetType}
          initialTags={[]}
          setSelectedPet={setSelectedPet}
        />
        <div className={`${styles.userPetInfo} ${styles.dtver}`}>
          <div className={`${styles.flipCard} ${styles.dtver}`}>
            <div className={`${styles.flipCardInner} ${styles.dtver}`}>
              {/* 카드 앞면 */}
              <div className={`${styles.flipCardFront} ${styles.dtver}`}>
                <div className={styles.frontInfoWrap}>
                  <div className={styles.infoWrap}>
                    {reduxPet != null ? (
                      <div className={`${styles.info} ${styles.dtver}`}>
                        <div className={styles.infoRow}>
                          <div className={styles.photo}>
                            <img src={Animal.profileSrc} alt="프로필" />
                          </div>
                          <div className={styles.animalinfoWrap}>
                            <div className={styles.name}>
                              <span className={styles.boldText}>
                                {Animal.name}
                              </span>
                            </div>

                            <div className={styles.age}>
                              생일:{" "}
                              <span className={styles.boldText}>
                                {Animal.birth}
                                {Animal.birth && (
                                  <span>({calculateAge(Animal.birth)})</span>
                                )}
                              </span>
                            </div>
                            <div className={styles.gen_kind}>
                              <div className={styles.breed}>
                                종:{" "}
                                <span className={styles.boldText}>
                                  {Animal.kind}
                                </span>
                              </div>
                              <div className={styles.gender}>
                                성별:{" "}
                                <span className={styles.boldText}>
                                  {Animal.gender}
                                </span>
                              </div>
                            </div>
                            <div>
                              몸무게:{" "}
                              <span className={styles.boldText}>
                                {Animal.weight}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.infoBtm}>
                          <div>
                            건강사항:{" "}
                            <span className={styles.boldText}>
                              {Animal.allergy || "-"}
                            </span>
                          </div>
                          <div>
                            알러지:{" "}
                            <span className={styles.boldText}>
                              {Animal.health || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.noAnimalWrap}>
                        <div className={styles.noAnimal}>
                          등록된 반려동물이 없어요
                          <TbMoodSuprised />
                        </div>
                        <div
                          className={styles.petRegiBtn}
                          onClick={goPetregistration}
                        >
                          <FiPlus />
                          반려동물 등록하기
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.scheduleTodayWrap} ${styles.dtver}`}>
            <div className={`${styles.areaTitleWrap} ${styles.dtver}`}>
              <div className={`${styles.areaTitle} ${styles.dtver}`}>
                오늘의 일정
              </div>
            </div>
            <div className={styles.schedules_box_wrap}>
              <ScheduleToday
                schedules={schedules}
                onScheduleClick={goCalendar}
                isDeskTop={isDeskTop}
              />
            </div>
          </div>
        </div>
      </DeskTop>
      <div className={styles.shortsPreivewArea}>
        <div className={styles.areaTitleWrap}>
          <div className={styles.areaTitle}>쇼츠</div>
          <SlArrowRight onClick={goShorts} />
        </div>

        <div className={styles.shortsWrap}>
          <ShortsList shortsData={dummyShortsData} />
        </div>
      </div>

      <div className={styles.communityPreivewArea}>
        <div className={styles.areaTitleWrap}>
          <div className={styles.areaTitle}>커뮤니티 인기글</div>
          <SlArrowRight onClick={goCommunity} />
        </div>
        <div className={styles.communityList}>
          {dummyCommmuData.map((item, index) => (
            <CommunityListData
              key={index}
              item={item}
              onClick={() => console.log(`Post ${index + 1} clicked`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
