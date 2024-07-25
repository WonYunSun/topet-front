import React from "react";
import styles from "../css/subBottomSheet.module.css";
import EditDelete from "../component/EditDelete";
import CommunityEDRB from "./CommunityComp/CommunityEDRB";

const EditDeleteBottomSheet = ({
  show,
  onClose,
  type,
  onEditClick,
  selectedSchedule,
  onDeleteClick,
  onReportClick,
  onBlockClick,
  onReplyClick,
}) => {

  const handleCloseBottomSheet = () => {
    onClose();
  };

  function getTypeText(type) {
    switch (type) {
      case "EditDelete":
      case "CommunityEditDelete":
      case "CommunityReportBlock":
      case "CommentEditDelete" :
      case "CommentReportBlock":
        return "더보기";
      default:
        return "더보기";
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
      case "CommunityEditDelete":
        return (
          <>
            <CommunityEDRB type={"CommunityEditDelete"} onEditClick={onEditClick} onDeleteClick={onDeleteClick} onClose={onClose}/> {/* 여기 추가 */}
          </>
        )
        case "CommunityReportBlock":
          return (
            <>
              <CommunityEDRB type={"CommunityReportBlock"} />
            </>
          )
        case "CommentEditDelete":
          return (
          <>
            <CommunityEDRB type={"CommentEditDelete"} onReplyClick={onReplyClick} />
          </>
          );
        case "CommentReportBlock":
          return (
          <>
            <CommunityEDRB type={"CommentReportBlock"} onReplyClick={onReplyClick}/>
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
