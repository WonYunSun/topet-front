import React from "react";
import styles from "../css/EditDelete.module.css";
function EditDelete(onEditClick) {
  return (
    <>
      <div className={styles.editDeleteWrap}>
        <div className={styles.editBtn} onClick={onEditClick()}>
          수정하기
        </div>
        <div className={styles.DeleteBtn}>삭제하기</div>
      </div>
    </>
  );
}

export default EditDelete;
