import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import styles from "../../css/mypage_petprofile.module.css";
import dayjs from "dayjs";
import { GoArrowLeft } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { MdPets, MdInfoOutline, MdEdit } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { RiWeightFill } from "react-icons/ri";
import petApi from "../../api/petApi";
import { useSelector } from "react-redux";

const PetProfileDetail = () => {
  const reduxMember = useSelector((state) => state.member.member);

  const location = useLocation();
  const id = location.state?.id; 

  const navigate = useNavigate();
  const [myPet, setMyPet] = useState(null); // 초기값을 null로 설정
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("petProfileDetail Id : " , id);
  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  const goEditPetProfile = () => {
    navigate(`/editpetprofile/`,  { state: { id: id } });
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

  const memberDelete = async (memberId) =>{
    const formData = new FormData();
    formData.append("memberId", memberId);
    formData.append("petId", myPet.id);
    

    const resp = await petApi.deleteMember(formData);
    console.log(resp);
    if(resp.data == 1) {
      window.location.reload();
    }
  }


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
    members : myPet.members,
    ownerId : myPet.ownerId
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
                {pet.health == "null" || pet.health == null ? "-" : pet.health}
              </div>


{/* --------------------------------------------------------------------------------- */}

              <div style={{height:"20px"}}></div>
              {/* 스타일 css파일로 빼시고,
              member 프로필이랑 이름, 컴포넌트있으면 컴포넌트불러오시길.... */}

              <IoPersonSharp style={{fontSize:"30px", color :"#ffa62f"}}/>
              <div>회원</div>
              {pet.members.map((member) => (
                <div>
                  <div>{member.name}</div>

                  
                  { (reduxMember.id == pet.ownerId) ?  //현재 사용자가, pet에 등록된 사용자일 경우에, 자신이 자신을 지우지 못하게
                        (reduxMember.id == member.id)? // 현재 사용자가, pet의 원래주인이냐? 주인이면 다른 회원 삭제 가능/ 주인 아니면 다른 회원 삭제 불가능
                        <div></div> 
                        :<div style={{cursor:"pointer"}} onClick={()=>{memberDelete(member.id)}}>x</div>
                      : <div></div>
                      
                      } 
                  <div>---------------------</div>
                </div>
                ))}
{/* --------------------------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfileDetail;
