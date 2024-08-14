import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../css/mypage_editprofile.module.css";
import { FaCheckCircle } from "react-icons/fa";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const ProfileCompleted = () => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };

  const goPetRegistration = () => {
    navigate("/petregistration");
  };

  const reduxMember = useSelector((state) => state.member.member);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.complete_msg_wrapper}>
        <FaCheckCircle className={styles.check_icon} />
        <div className={styles.complete_text}>
          등록 완료!
          <br />
          {/* {reduxMember.name}님, 환영해요 */}
          환영해요
        </div>
      </div>
      <div
        className={`${styles.complete} ${styles.button_wrapper} ${
          isDeskTop ? styles.dtver : styles.mbver
        }`}
      >
        <div className={styles.register_button} onClick={goPetRegistration}>
          반려동물 등록하기
        </div>
        <div className={styles.register_later_button} onClick={goHome}>
          나중에 등록하기
        </div>
      </div>
    </div>
  );
};

export default ProfileCompleted;
