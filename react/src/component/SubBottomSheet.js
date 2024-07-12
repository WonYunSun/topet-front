import React from "react";
import styles from "../css/subBottomSheet.module.css";
import EditDelete from "../component/EditDelete";
const EditDeleteBottomSheet = ({
  show,
  onClose,
  type,
  onEditClick,
  selectedSchedule,
  onDeleteClick,
}) => {
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
        return (
          <>
            <EditDelete
              onEditClick={onEditClick}
              selectedSchedule={selectedSchedule}
              onDeleteClick={onDeleteClick}
            />
          </>
        );
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
