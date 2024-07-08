import React, { useState } from "react";
import PetList from "./PetList";
import HashTagContent from "./HashTagContent";
import AddSchedule from "./AddSchedule";
import "../css/bottomsheet.css";

const BottomSheet = ({
  show,
  onClose,
  onSelectPet,
  type,
  onCompleteTags,
  initialTags,
  selectedDate,
  schedule,
  onSelectAnimal
}) => {
  function getTypeText(type) {
    switch (type) {
      case "pet":
        return "반려동물 선택";
      case "tag":
        return "태그 선택";
      case "addSchedule":
        return "일정 등록";
      case "scheduleDetail":
        return "일정 상세";
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
        return <AddSchedule selectedDate={selectedDate} onClose={onClose} />;
      case "scheduleDetail":
        return schedule ? (
          <div>
            <h2>{schedule.scheduleTitle}</h2>
            <p>{schedule.scheduleContent}</p>
            <p>Color: {schedule.color}</p>
            <p>startDate: {schedule.startDate}</p>
            <p>endDate: {schedule.endDate}</p>
            {schedule.isComplete ? <div>완료</div> : <div>미완료</div>}
          </div>
        ) : null;
      default:
        return "";
    }
  }

  return (
    <>
      {show && <div className="overlay" onClick={onClose}></div>}
      <div className={`bottom-sheet ${show ? "show" : ""}`}>
        <div className="bottom-sheet-title">{getTypeText(type)}</div>
        <div className="bottom-sheet-content">{getSheetContent(type)}</div>
      </div>
    </>
  );
};

export default BottomSheet;
