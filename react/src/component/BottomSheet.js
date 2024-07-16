import React, { useEffect, useState } from "react";
import PetList from "./AnimalProfileComp/PetList";
import AddSchedule from "./CalendarComp/AddSchedule";
import ScheduleDetail from "./CalendarComp/ScheduleDetail";
import EditDeleteBottomSheet from "./SubBottomSheet";
import ScheduleEdit from "./CalendarComp/ScheduleEdit";
import "../css/bottomsheet.css";

const BottomSheet = ({
  show,
  onClose,
  type,
  selectedDate,
  schedule,
  initialAddScheduleValues,
  setSelectedPet,
  onDotsClick,
  onEditClick,
  selectedSchedule,
}) => {


  

  const handleCloseBottomSheet = () => {
    onClose();
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    handleCloseBottomSheet();
  };

  function getTypeText(type) {
    switch (type) {
      case "pet":
        return "반려동물 선택";
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
          <div className="bottom_sheet_buttons">
            <button
              className="bottom_sheet_button"
              onClick={() => handleSelectPet("강아지")}
            >
              강아지
            </button>
            <button
              className="bottom_sheet_button"
              onClick={() => handleSelectPet("고양이")}
            >
              고양이
            </button>
            <button
              className="bottom_sheet_button"
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
      <div className={`bottom_sheet ${show ? "show" : ""}`}>
        <div className="bottom_sheet_title">{getTypeText(type)}</div>
        <div className="bottom_sheet_content">{getSheetContent(type)}</div>
      </div>
    </>
  );
};

export default BottomSheet;


// 백업 파일인데 혹시 몰라서 놔둠
// import React, { useEffect, useState } from "react";
// import PetList from "./AnimalProfileComp/PetList";
// import HashTagContent from "./HashTagComp/HashTagContent";
// import AddSchedule from "./CalendarComp/AddSchedule";
// import ScheduleDetail from "./CalendarComp/ScheduleDetail";
// import EditDeleteBottomSheet from "./SubBottomSheet";
// import ScheduleEdit from "./CalendarComp/ScheduleEdit";
// import "../css/bottomsheet.css";

// const BottomSheet = ({
//   show,
//   onClose,
//   type,
//   initialTags,
//   selectedDate,
//   schedule,
//   initialAddScheduleValues,
//   setSelectedPet,
//   setSelectedTags,
//   selectedTags,
//   onDotsClick,
//   onEditClick,
//   selectedSchedule,
// }) => {


//   const [tempTags, setTempTags] = useState([]);

//   useEffect(() => {
//     if (!show && type === "tag") {
//       setTempTags(initialTags);
//     } else if (!show) {
//       setTempTags([]); // BottomSheet가 닫힐 때 tempTags 초기화
//     }
//   }, [show, type, initialTags]);

  

//   const handleCloseBottomSheet = () => {
//     onClose();
//     setTempTags([]);
//   };

//   const handleSelectPet = (pet) => {
//     setSelectedPet(pet);
//     handleCloseBottomSheet();
//   };

//   const handleCompleteTags = (requiredTag, optionalTags) => {
//     setSelectedTags([requiredTag, ...optionalTags]);
//     handleCloseBottomSheet();
//   };

//   function getTypeText(type) {
//     switch (type) {
//       case "pet":
//         return "반려동물 선택";
//       case "tag":
//         return "태그 선택";
//       case "addSchedule":
//         return "일정 등록";
//       case "scheduleDetail":
//         return "일정 상세";
//       case "map":
//         return "지도";
//       case "editSchedule":
//         return "일정 수정";
//       case "강아지":
//       case "고양이":
//       case "특수동물":
//         return "게시판 선택";
//       default:
//         return "";
//     }
//   }

//   function getSheetContent(type) {
//     switch (type) {
//       case "pet":
//         return <PetList onSelectPet={handleSelectPet} />;
//       case "tag":
//         return (
//           <HashTagContent
//             onComplete={handleCompleteTags}
//             initialTags={tempTags}
//           />
//         );
//       case "addSchedule":
//         return (
//           <AddSchedule
//             selectedDate={selectedDate}
//             onClose={handleCloseBottomSheet}
//             initialValues={initialAddScheduleValues}
//           />
//         );
//       case "scheduleDetail":
//         return (
//           <ScheduleDetail
//             onDotsClick={onDotsClick}
//             selectedSchedule={selectedSchedule}
//           />
//         );
//       case "editDelete":
//         return (
//           <EditDeleteBottomSheet
//             show={true}
//             onClose={handleCloseBottomSheet}
//             onEditClick={onEditClick}
//           />
//         );
//       case "editSchedule":
//         return (
//           <ScheduleEdit
//             selectedSchedule={selectedSchedule}
//             onClose={handleCloseBottomSheet}
//           />
//         );
//       case "map":
//         return <h1>지도리스트</h1>;
//       case "강아지":
//       case "고양이":
//       case "특수동물":
//         return (
//           <div className="bottom-sheet-buttons">
//             <button
//               className="bottom-sheet-button"
//               onClick={() => handleSelectPet("강아지")}
//             >
//               강아지
//             </button>
//             <button
//               className="bottom-sheet-button"
//               onClick={() => handleSelectPet("고양이")}
//             >
//               고양이
//             </button>
//             <button
//               className="bottom-sheet-button"
//               onClick={() => handleSelectPet("특수동물")}
//             >
//               특수동물
//             </button>
//           </div>
//         );
//       default:
//         return "";
//     }
//   }

//   return (
//     <>
//       {show && <div className="overlay" onClick={handleCloseBottomSheet}></div>}
//       <div className={`bottom-sheet ${show ? "show" : ""}`}>
//         <div className="bottom-sheet-title">{getTypeText(type)}</div>
//         <div className="bottom-sheet-content">{getSheetContent(type)}</div>
//       </div>
//     </>
//   );
// };

// export default BottomSheet;
