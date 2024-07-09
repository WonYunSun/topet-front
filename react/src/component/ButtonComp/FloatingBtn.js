import React from "react";
import styles from "../../css/floating_btn.module.css";
import { FiPlus } from "react-icons/fi";

export default function FloatingBtn({ onClick }) {
  return (
    <div className={styles.BtnContiner} onClick={onClick}>
      <div className={styles.AddscdBtn}>
        <div>
          <FiPlus color="#fff" size={40} />
          <p>일정추가</p>
        </div>
      </div>
    </div>
  );
}
