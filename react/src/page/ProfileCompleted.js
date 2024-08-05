import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../css/mypage_editprofile.module.css";
import { FaCheckCircle } from "react-icons/fa";

const ProfileCompleted = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };

  const goPetRegistration = () => {
    navigate("/petregistration");
  };

  const reduxMember = useSelector((state) => state.member.member);

  return (
    <div className={styles.wrapper}>
      <div className={styles.complete_msg_wrapper}>
        <FaCheckCircle className={styles.check_icon} />
        <div className={styles.complete_text}>
          등록 완료!
          <br />
          {/* {reduxMember.name}님, 환영해요 */}
          환영해요
        </div>
      </div>
      <div className={styles.button_wrapper}>
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
