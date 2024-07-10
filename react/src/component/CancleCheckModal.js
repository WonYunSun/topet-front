import React from "react";
import styles from "../css/cancleCheckModal.module.css";

function CancleCheckModal({ onClose, onContinue }) {
  return (
    <>
      <div className={styles.ModalOverlay} />
      <div className={styles.CancleCheckWrap}>
        <div>작성한 일정을 폐기하시겠습니까?</div>
        <div className={styles.CancleBtnWrap}>
          <button className={styles.ContinueBtn} onClick={onContinue}>
            계속 작성
          </button>
          <button className={styles.CancleBtn} onClick={onClose}>
            작성 취소
          </button>
        </div>
      </div>
    </>
  );
}

export default CancleCheckModal;
