import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/mypage_managemypets.module.css";
import { MdEdit, MdShare } from "react-icons/md";
/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const MyPetItem = ({ onOpenModal, photoUrl, name, uid, pet }) => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const navigate = useNavigate();

  const goPetDetail = (pet) => {
    navigate(`/petprofiledetail/${pet.id}`);
    console.log(pet.id);
  };

  return (
    <>
      <Mobile>
        <div className={styles.profile_container}>
          <div className={styles.profile_wrapper}>
            <div className={styles.profile_photoandname_wrapper}>
              <div className={styles.photo_container}>
                <img src={photoUrl} alt={name} className={styles.photo} />
              </div>
              <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.icons_wrapper}>
              <MdShare className={styles.profile_icon} onClick={onOpenModal} />
              <MdEdit
                className={styles.profile_icon}
                onClick={() => {
                  goPetDetail(pet);
                }}
              />
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
};

export default MyPetItem;
