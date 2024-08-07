import React, {useState} from "react";
import styles from "../css/subBottomSheet.module.css";
import EditDelete from "../component/EditDelete";
import CommunityEDRB from "./CommunityComp/CommunityEDRB";
import Report from "./BlockReport/Report";
import Block from "./BlockReport/Block";

const EditDeleteBottomSheet = ({
  show,
  onClose,
  type: initialType,
  onEditClick,
  selectedSchedule,
  onDeleteClick,
  onReplyClick,
  comid,
  reduxMemberId,
}) => {

  const [type, setType] = useState(initialType);

  const handleCloseBottomSheet = () => {
    onClose();
    setType(initialType);
  };

  const onReportClick = () => {
    setType("Report");
  }

  const onBlockClick = () => {
    setType("Block");
  }


  function getTypeText(type) {
    switch (type) {
      case "EditDelete":
      case "CommunityEditDelete":
      case "CommunityReportBlock":
      case "CommentEditDelete" :
      case "CommentReportBlock":
      case "ReplyEditDelete":
      case "ReplyReportBlock":
        return "더보기";
      case "Report":
        return "신고하기";
      case "Block":
        return "차단하기";
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
            <CommunityEDRB type={"CommunityReportBlock"} onBlockClick={onBlockClick} onReportClick={onReportClick}/>
          </>
        )
      case "CommentEditDelete":
        return (
          <>
            <CommunityEDRB type={"CommentEditDelete"} onReplyClick={onReplyClick} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
          </>
        );
      case "CommentReportBlock":
        return (
          <>
            <CommunityEDRB type={"CommentReportBlock"} onReplyClick={onReplyClick}/>
          </>
        );
      case "ReplyEditDelete":
        return (
          <>
            <CommunityEDRB type={"ReplyEditDelete"} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
          </>
        );
      case "ReplyReportBlock":
        return (
          <>
            <CommunityEDRB type={"ReplyReportBlock"} />
          </>
        )
        case "Report":
          return (
            <>
              <Report onClick={handleCloseBottomSheet} comid={comid} reduxMemberId={reduxMemberId}/>
            </>
          )
        case "Block":
          return (
            <>
              <Block onClick={handleCloseBottomSheet} comid={comid} reduxMemberId={reduxMemberId} />
            </>
          )
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
