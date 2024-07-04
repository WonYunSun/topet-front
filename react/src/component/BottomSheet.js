import React from "react";
import PetList from "./PetList";
import HashTagContent from "./HashTagContent";
import "../css/bottomsheet.css";
import AddSchedule from "./AddSchedule";

const BottomSheet = ({
  show,
  onClose,
  onSelectPet,
  type,
  onCompleteTags,
  initialTags,
  selectedDate,
}) => {
  function getTypeText(type) {
    switch (type) {
      case "pet":
        return "반려동물 선택";
      case "tag":
        return "태그 선택";
      case "addSchedule":
        return "일정 등록";
      default:
        return "";
    }
  }

  function getSheetContent(type) {
    switch (type) {
      case "pet":
        return <PetList onSelectPet={onSelectPet} />;
      case "tag":
        return (
          <HashTagContent
            onComplete={onCompleteTags}
            initialTags={initialTags}
          />
        );
      case "addSchedule":
        return <AddSchedule selectedDate={selectedDate} />;
      default:
        return "";
    }
  }

  return (
    <div className={`bottom-sheet ${show ? "show" : ""}`}>
      <div className="bottom-sheet-title">{getTypeText(type)}</div>
      <div className="bottom-sheet-content">{getSheetContent(type)}</div>
    </div>
  );
};

export default BottomSheet;
