import React from "react";
import styles from "../css/EditDelete.module.css";
function EditDelete({ onEditClick, onDeleteClick, selectedSchedule }) {
  return (
    <>
      <div className={styles.editDeleteWrap}>
        <div
          className={styles.editBtn}
          onClick={() => {
            onEditClick(selectedSchedule);
            console.log(onEditClick);
          }}
        >
          수정하기
        </div>
        <div
          className={styles.DeleteBtn}
          onClick={() => {
            onDeleteClick();
            console.log(onDeleteClick);
          }}
        >
          삭제하기
        </div>
      </div>
    </>
  );
}

export default EditDelete;
