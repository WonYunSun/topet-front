import React, { useState, useEffect } from 'react';
import styles from "../../css/CommunityEDRB.module.css";

const CommunityEDRB = ({ type, onEditClick, onDeleteClick, onBlockClick, onReportClick, onClose }) => {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");

  useEffect(() => {
    getSheetContent(type);
  }, [type]);

  function getSheetContent(type) {
    switch (type) {
      case "EditDelete":
        setFirstText("수정하기");
        setSecondText("삭제하기");
        break;
      case "ReportBlock":
        setFirstText("차단하기");
        setSecondText("신고하기");
        break;
      default:
        setFirstText("");
        setSecondText("");
        break;
    }
  }

  const handleClick = (callback) => {
    return () => {
      if (callback) callback();
      if (onClose) onClose();
    };
  };

  return (
    <div className={styles.editDeleteWrap}>
      {type === "EditDelete" && (
        <>
          <div className={styles.editBtn} onClick={handleClick(onEditClick)}>
            {firstText}
          </div>
          <div className={styles.DeleteBtn} onClick={handleClick(onDeleteClick)}>
            {secondText}
          </div>
        </>
      )}
      {type === "ReportBlock" && (
        <>
          <div className={styles.editBtn} onClick={handleClick(onBlockClick)}>
            {firstText}
          </div>
          <div className={styles.DeleteBtn} onClick={handleClick(onReportClick)}>
            {secondText}
          </div>
        </>
      )}
    </div>
  );
}

export default CommunityEDRB;
