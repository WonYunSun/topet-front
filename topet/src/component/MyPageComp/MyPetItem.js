import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/mypage_managemypets.module.css";
import { MdEdit, MdShare } from "react-icons/md";
/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";
import PetProfileDetail from "../../page/MyPage/PetProfileDetail";
import { useSelector } from "react-redux";
import { AiTwotoneCrown } from "react-icons/ai";
const MyPetItem = ({ onOpenModal, photoUrl, name, uid, pet, ownerId }) => {
  const reduxMember = useSelector((state) => state.member.member);
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const navigate = useNavigate();

  const goPetDetail = (pet) => {
    navigate("/petprofiledetail", { state: { id: pet.id } });
    console.log(pet.id);
  };

  return (
    <>
      <div className={styles.profile_container}>
        <div
          className={`${styles.profile_wrapper} ${isDeskTop && styles.dtver}`}
        >
          <div className={styles.profile_photoandname_wrapper}>
            <div className={styles.photo_container}>
              <img src={photoUrl} alt={name} className={styles.photo} />
            </div>
              
                {(reduxMember.id == ownerId)?<AiTwotoneCrown style={{ color: "yellow", fontSize:"30px"}}/>:<div></div>}
            <div className={styles.name}>{name}</div>
          </div>
          <div className={styles.icons_wrapper}>
            <MdShare className={styles.profile_icon} onClick={()=>onOpenModal} />
            <MdEdit
              className={styles.profile_icon}
              onClick={() => {
                goPetDetail(pet);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPetItem;
