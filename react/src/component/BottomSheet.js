import React, { useEffect, useState } from "react";
import PetList from "./AnimalProfileComp/PetList";
import HashTagContent from "./HashTagComp/HashTagContent";
import AddSchedule from "./CalendarComp/AddSchedule";
import ScheduleDetail from "./CalendarComp/ScheduleDetail";
import EditDeleteBottomSheet from "./SubBottomSheet";
import ScheduleEdit from "./CalendarComp/ScheduleEdit";
import "../css/bottomsheet.css";

const BottomSheet = ({
  show,
  onClose,
  type,
  onCompleteTags,
  initialTags,
  selectedDate,
  schedule,
  initialAddScheduleValues,
  setSelectedPet,

  selectedTags,
  setSelectedTags,

  selectedCategory,
  setSelectedCategory,
  onDotsClick,
  onEditClick,
  selectedSchedule,
}) => {
  const [tempTags, setTempTags] = useState([]);

  useEffect(() => {
    if (!show && type === "tag") {
      setTempTags([]);
    }
  }, [show, type]);

  const handleCloseBottomSheet = () => {
    onClose();
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    handleCloseBottomSheet();
  };

  const handleCompleteTags = ( optionalTags) => {
    setSelectedTags([ ...optionalTags]);
    handleCloseBottomSheet(); 
  };

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
      case "map":
        return "지도";
      case "editSchedule":
        return "일정 수정";
      case "강아지":
      case "고양이":
      case "특수동물":
        return "게시판 선택";
      default:
        return "";
    }
  }

  function getSheetContent(type) {
    switch (type) {
      case "pet":
        return <PetList onSelectPet={handleSelectPet} />;
      case "tag":
        return (
          <HashTagContent
            onComplete={handleCompleteTags}
            initialTags={tempTags}
            setSelectedCategory = {setSelectedCategory}
            selectedCategory = {selectedCategory}
            selectedTags = {selectedTags}
            setSelectedTags = {setSelectedTags}
          />
        );
      case "addSchedule":
        return (
          <AddSchedule
            selectedDate={selectedDate}
            onClose={handleCloseBottomSheet}
            initialValues={initialAddScheduleValues}
          />
        );
      case "scheduleDetail":
        return (
          <ScheduleDetail
            onDotsClick={onDotsClick}
            selectedSchedule={selectedSchedule}
          />
        );
      case "editDelete":
        return (
          <EditDeleteBottomSheet
            show={true}
            onClose={handleCloseBottomSheet}
            onEditClick={onEditClick}
          />
        );
      case "editSchedule":
        return (
          <ScheduleEdit
            selectedSchedule={selectedSchedule}
            onClose={handleCloseBottomSheet}
          />
        );
      case "map":
        return <h1>지도리스트</h1>;
      case "강아지":
      case "고양이":
      case "특수동물":
        return (
          <div className="bottom-sheet-buttons">
            <button
              className="bottom-sheet-button"
              onClick={() => handleSelectPet("강아지")}
            >
              강아지
            </button>
            <button
              className="bottom-sheet-button"
              onClick={() => handleSelectPet("고양이")}
            >
              고양이
            </button>
            <button
              className="bottom-sheet-button"
              onClick={() => handleSelectPet("특수동물")}
            >
              특수동물
            </button>
          </div>
        );
      default:
        return "";
    }
  }

  return (
    <>
      {show && <div className="overlay" onClick={handleCloseBottomSheet}></div>}
      <div className={`bottom-sheet ${show ? "show" : ""}`}>
        <div className="bottom-sheet-title">{getTypeText(type)}</div>
        <div className="bottom-sheet-content">{getSheetContent(type)}</div>
      </div>
    </>
  );
};

export default BottomSheet;
