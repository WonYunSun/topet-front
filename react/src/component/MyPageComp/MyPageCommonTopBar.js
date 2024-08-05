import React from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import styles from "../../css/mypage_common_topbar.module.css";

const MyPageCommonTopBar = ({ title }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <GoArrowLeft className={styles.back_icon} onClick={goBack} />
        <div className={styles.page_title}>{title}</div>
      </div>
    </div>
  );
};

export default MyPageCommonTopBar;
