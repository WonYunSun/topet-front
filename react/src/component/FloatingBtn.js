import React from "react";
import styles from "../css/floating_btn.module.css";

export default function FloatingBtn({ onClick }) {
  return (
    <div className={styles.BtnContiner} onClick={onClick}>
      <div className={styles.AddscdBtn}>추가</div>
    </div>
  );
}
