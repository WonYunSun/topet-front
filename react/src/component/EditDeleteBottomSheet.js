import React from "react";
import styles from "../css/editBottomSheet.module.css";

const EditDeleteBottomSheet = ({ show, onClose, type }) => {
  const handleCloseBottomSheet = () => {
    onClose();
  };

  function getTypeText(type) {
    switch (type) {
      case "EditDelete":
        return "더보기";
      default:
        return "";
    }
  }

  function getSheetContent(type) {
    switch (type) {
      case "EditDelete":
        return null; // 콘텐츠를 여기에 추가하세요.
      default:
        return "";
    }
  }

  return (
    <>
      {show && (
        <div className={styles.overlay} onClick={handleCloseBottomSheet}></div>
      )}
      <div className={`${styles.bottomSheet} ${show ? styles.show : ""}`}>
        <div className={styles.bottomSheetTitle}>{getTypeText(type)}</div>
        <div className={styles.bottomSheetContent}>{getSheetContent(type)}</div>
      </div>
    </>
  );
};

export default EditDeleteBottomSheet;
