import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../css/mypage_petprofile.module.css";
import dayjs from "dayjs";
import { GoArrowLeft } from "react-icons/go";
import { MdPets, MdInfoOutline, MdEdit } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { RiWeightFill } from "react-icons/ri";
import petApi from "../../api/petApi";

const PetProfileDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [myPet, setMyPet] = useState(null); // 초기값을 null로 설정
  const [isLoaded, setIsLoaded] = useState(false);

  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  const goEditPetProfile = () => {
    navigate(`/editpetprofile/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await petApi.getMyPet(id);
        setMyPet(response);
        console.log("새로운 데이터 : ", response);
      } catch (error) {
        console.error("Failed to fetch pet data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [id]); // id가 변경될 때마다 데이터를 새로 가져옵니다

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!myPet) {
    return <div>No data available</div>; // 데이터가 없을 경우에 대한 처리를 추가
  }

  // 나이 계산 함수
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
  const pet = {
    photoUrl: myPet.profileSrc,
    name: myPet.name,
    kind: myPet.kind,
    gender: myPet.gender,
    neutered: myPet.neutered,
    weight: myPet.weight,
    birth: myPet.birth, // 생일
    allergy: myPet.allergy,
    health: myPet.health,
  };

  const age = calculateAge(pet.birth); // 생일을 기준으로 나이를 계산하여 추가

  const ProfileInfoDataBox = ({
    Icon,
    leftInfoTitle,
    leftInfoData,
    rightInfoTitle,
    rightInfoData,
  }) => {
    return (
      <div className={styles.info_wrapper_short}>
        <Icon className={styles.info_icon} />
        <div className={styles.info_container_short}>
          <div className={styles.info_title}>{leftInfoTitle}</div>
          <div className={styles.info_data}>{leftInfoData}</div>
        </div>
        <div className={styles.info_container_short}>
          <div className={styles.info_title}>{rightInfoTitle}</div>
          <div className={styles.info_data}>{rightInfoData}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_top_wrapper}>
        <GoArrowLeft className={styles.back_icon} onClick={goBack} />
        <div className={styles.photo_container}>
          <img className={styles.photo} src={pet.photoUrl} alt="Pet" />
        </div>
        <div className={styles.edit_icon_container} onClick={goEditPetProfile}>
          <MdEdit className={styles.edit_icon} />
        </div>
        <div className={styles.name}>{pet.name}</div>
      </div>
      <div className={styles.info_container}>
        <ProfileInfoDataBox
          Icon={MdPets}
          leftInfoTitle={"품종"}
          leftInfoData={pet.kind}
          rightInfoTitle={"나이"}
          rightInfoData={age}
        />
        <ProfileInfoDataBox
          Icon={MdInfoOutline}
          leftInfoTitle={"성별"}
          leftInfoData={pet.gender}
          rightInfoTitle={"중성화 여부"}
          rightInfoData={pet.neutered ? "중성화" : "-"}
        />
        <ProfileInfoDataBox
          Icon={RiWeightFill}
          leftInfoTitle={"체중"}
          leftInfoData={pet.weight}
          rightInfoTitle={"생일"}
          rightInfoData={pet.birth}
        />
        <div className={styles.info_wrapper_long}>
          <BiHealth className={styles.info_icon} />
          <div className={styles.info_textcontent_wrapper}>
            <div className={styles.info_container_long}>
              <div className={styles.info_title}>알러지</div>
              <div className={styles.info_data}>{pet.allergy || "-"}</div>
            </div>
            <div className={styles.info_container_long}>
              <div className={styles.info_title}>건강상태</div>
              <div className={styles.info_data}>{pet.health || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfileDetail;
