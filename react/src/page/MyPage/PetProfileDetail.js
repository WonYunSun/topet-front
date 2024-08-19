import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "../../css/mypage_petprofile.module.css";
import dayjs from "dayjs";
import petApi from "../../api/petApi";
import { useSelector, useDispatch } from "react-redux";

// 아이콘
import { GoArrowLeft } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { MdPets, MdInfoOutline, MdEdit } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { RiWeightFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

import { updatePetList } from "../../redux/reducers/petListReducer";

const PetProfileDetail = () => {
  const dispatch = useDispatch();
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const reduxMember = useSelector((state) => state.member.member);

  const location = useLocation();
  const id = location.state?.id;

  const navigate = useNavigate();
  const [myPet, setMyPet] = useState(null); // 초기값을 null로 설정
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("petProfileDetail Id : ", id);
  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  const goEditPetProfile = () => {
    navigate(`/editpetprofile/`, { state: { id: id } });
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

  const memberDelete = async (memberId) => {
    const formData = new FormData();
    formData.append("memberId", memberId);
    formData.append("petId", myPet.id);

    const resp = await petApi.deleteMember(formData);
    console.log(resp);
    if (resp.data == 1) {
      window.location.reload();
    }
  };

  const petDelete = async() => {

    const resp = await petApi.deletePet(reduxMember.id ,id);

    if(resp != null){
      dispatch(updatePetList(resp));
      navigate(-1);
    }
    console.log("반려동물 삭제 완료");

  };

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
    members: myPet.members,
    ownerId: myPet.ownerId,
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
      <>
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
        <div className={styles.divider}></div>
      </>
    );
  };

  return (
    <>
      <div className={`${isDeskTop && styles.wrapper_dtver}`}>
        <div className={styles.wrapper}>
          <div className={styles.profile_top_wrapper}>
            {isMobile && (
              <GoArrowLeft className={styles.back_icon} onClick={goBack} />
            )}
            <div className={styles.photo_container}>
              <img className={styles.photo} src={pet.photoUrl} alt="Pet" />
            </div>
            <div
              className={styles.edit_icon_container}
              onClick={goEditPetProfile}
            >
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
              leftInfoData={pet.weight || "-"}
              rightInfoTitle={"생일"}
              rightInfoData={pet.birth || "-"}
            />
            <div className={styles.info_wrapper_long}>
              <BiHealth className={styles.info_icon} />
              <div className={styles.info_container_long_wrapper}>
                <div className={styles.info_container_long}>
                  <div className={styles.info_title}>알러지</div>
                  <div className={styles.info_data}>
                    {pet.allergy == "null" || pet.allergy == null
                      ? "-"
                      : pet.allergy}
                  </div>
                </div>
                <div className={styles.info_container_long}>
                  <div className={styles.info_title}>건강상태</div>
                  <div className={styles.info_data}>
                    {pet.health == "null" || pet.health == null
                      ? "-"
                      : pet.health}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divider}></div>
            {/* 회원 목록 */}
            <div className={`${styles.info_wrapper_short} ${styles.members}`}>
              <IoPersonSharp className={styles.info_icon} />
              <div
                className={`${styles.info_container_long_wrapper} ${styles.members}`}
              >
                <div className={styles.info_title}>회원</div>
                <div className={styles.members_inner_wrapper}>
                  {pet.members.map((member) => (
                    <div className={styles.member_container}>
                      <div className={styles.member_name}>{member.name}</div>
                      {reduxMember.id == pet.ownerId ? (
                        reduxMember.id == member.id ? (
                          ""
                        ) : (
                          <TiDelete
                            className={styles.delete_icon}
                            onClick={() => {
                              memberDelete(member.id);
                            }}
                          />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className={styles.delete_pet_text}
              onClick={() => {
                petDelete();
              }}
            >
              반려동물 삭제
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetProfileDetail;
