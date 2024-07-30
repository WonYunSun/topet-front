import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/mypage_petprofile.module.css";
import dayjs from "dayjs";
import { GoArrowLeft } from "react-icons/go";
import { MdPets, MdInfoOutline, MdEdit } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { RiWeightFill } from "react-icons/ri";

const PetProfileDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  const goEditPetProfile = () => {
    navigate(`/editpetprofile`);
  };

  // 나이 계산 함수
  const calculateAge = (birthDate) => {
    const birth = dayjs(birthDate);
    const now = dayjs();
    const ageInMonths = now.diff(birth, "month");

    if (ageInMonths >= 12) {
      const ageInYears = Math.floor(ageInMonths / 12);
      return `${ageInYears}살`;
    } else {
      return `${ageInMonths}개월`;
    }
  };

  const pet = {
    photoUrl:
      "https://i.pinimg.com/564x/10/ae/6a/10ae6ade71b4d40c2af9a8bde4bd2002.jpg",
    name: "아기",
    kind: "이탈리안 그레이하운드",
    gender: "남아",
    neutered: false,
    weight: "1.2kg",
    birth: "2024/04/03", // 생일
    allergy: "단백질류",
    health: "매우 건강하고 밥을 많이 먹어서 비만꿈나무",
  };

  const age = calculateAge(pet.birth); // 생일을 기준으로 나이를 계산하여 추가
  // console.log(age);

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
          <img className={styles.photo} src={pet.photoUrl} />
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
              <div className={styles.info_data}>{pet.allergy}</div>
            </div>
            <div className={styles.info_container_long}>
              <div className={styles.info_title}>건강상태</div>
              <div className={styles.info_data}>
                {pet.health == "" ? "-" : pet.health}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfileDetail;
