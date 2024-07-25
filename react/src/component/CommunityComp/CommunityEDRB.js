import React, { useState, useEffect } from 'react';
import styles from "../../css/CommunityEDRB.module.css";

const CommunityEDRB = ({ type, onEditClick, onDeleteClick, onBlockClick, onReportClick, onReplyClick, onClose }) => {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [thridText, setThridText] = useState("");

  useEffect(() => {
    getSheetContent(type);
  }, [type]);

  function getSheetContent(type) {
    switch (type) {
      case "CommunityEditDelete":
        setFirstText("수정하기");
        setSecondText("삭제하기");
        setThridText("");
        break;
      case "CommunityReportBlock":
        setFirstText("차단하기");
        setSecondText("신고하기");
        setThridText("");
        break;
      case "CommentEditDelete":
        setFirstText("수정하기");
        setSecondText("삭제하기");
        setThridText("답글달기");
        break;
      case "CommentReportBlock":
        setFirstText("차단하기");
        setSecondText("신고하기");
        setThridText("답글달기");
        break;
      default:
        setFirstText("");
        setSecondText("");
        setThridText("");
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
      {type === "CommunityEditDelete" && (
        <>
          <div className={styles.editBtn} onClick={handleClick(onEditClick)}>
            {firstText}
          </div>
          <div className={styles.DeleteBtn} onClick={handleClick(onDeleteClick)}>
            {secondText}
          </div>
        </>
      )}
      {type === "CommunityReportBlock" && (
        <>
          <div className={styles.editBtn} onClick={handleClick(onBlockClick)}>
            {firstText}
          </div>
          <div className={styles.DeleteBtn} onClick={handleClick(onReportClick)}>
            {secondText}
          </div>
        </>
      )}
      {type === "CommentEditDelete" && (
        <>
          <div className={styles.editBtn} onClick={handleClick(onEditClick)}>
            {firstText}
          </div>
          <div className={styles.DeleteBtn} onClick={handleClick(onDeleteClick)}>
            {secondText}
          </div>
          <div className={styles.ReplyBtn} onClick={handleClick(onReplyClick)}>
            {thridText}
          </div>
        </>
      )}
      {type === "CommentReportBlock" && (
        <>
          <div className={styles.editBtn} onClick={handleClick(onBlockClick)}>
            {firstText}
          </div>
          <div className={styles.DeleteBtn} onClick={handleClick(onReportClick)}>
            {secondText}
          </div>
          <div className={styles.ReplyBtn} onClick={handleClick(onReplyClick)}>
            {thridText}
          </div>
        </>
      )}
    </div>
  );
}

export default CommunityEDRB;
