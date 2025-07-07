import React from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import styles from "../../css/mypage_common_topbar.module.css";

/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const MyPageCommonTopBar = ({ title }) => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div
      className={`${styles.wrapper} ${isDeskTop ? styles.dtver : styles.mbver}`}
    >
      <div
        className={`${styles.inner_wrapper} ${
          isDeskTop ? styles.dtver : styles.mbver
        }`}
      >
        <GoArrowLeft
          className={`${styles.back_icon} ${isDeskTop && styles.none}`}
          onClick={goBack}
        />
        <div className={`${styles.page_title} ${isDeskTop && styles.dtver}`}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default MyPageCommonTopBar;
