import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Calendar } from "../component/CalendarComp/Calendar";
import TopBar from "../component/TopBar";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import ScheduleBottom from "../component/CalendarComp/ScheduleBottom";
import styles from "../css/bottomsheet.css";
import FloatingBtn from "../component/ButtonComp/FloatingBtn";
import isBetween from "dayjs/plugin/isBetween";
import NavBar from "../component/NavBarComp/NavBar";
import CheckModal from "../component/CheckModal";
import SubBottomSheet from "../component/SubBottomSheet";
import { useSelector, useDispatch } from "react-redux";
import scheduleApi from "../api/scheduleApi";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export const Calendarscreen = () => {
  const reduxMember =   useSelector((state)=>state.member.member);
  const [schedules, setSchedules] = useState([]);
  

  console.log("캘린더에서 출력한 reduxMember : " ,reduxMember);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showCancleModal, setShowCancleModal] = useState(false);
  const [initialAddScheduleValues, setInitialAddScheduleValues] = useState({
    
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
    title: "",
    content: "",
    isComplete: false,
    color: "#DE496E",
  });
  const [bottomSheetContent, setBottomSheetContent] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showEditDeleteBottomSheet, setEditDeleteBottomSheet] = useState(false);
  const [editDeleteBottomSheettype, setEditDeleteBottomSheettype] =
    useState(null);
  const [ScheduleDelete, setScheduleDelete] = useState(false); // 스케줄 삭제 상태

  const [scheduleSubmittedSuccessfully, setScheduleSubmittedSuccessfully] =
    useState();

  useEffect(() => {
    // handleAddScheduleBottomSheetClose();
    handleCloseBottomSheet();
    // modal();
    console.log("scheduleSubmittedSuccessfully", scheduleSubmittedSuccessfully);
  }, [scheduleSubmittedSuccessfully]);

  useEffect(()=>{
    getMySchedule();
    
  },[reduxMember])

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
  const getMySchedule = async() => {
    const mySchedule = await scheduleApi.getMyScheduleAPI(reduxMember.id);
    console.log(mySchedule);

    setSchedules(mySchedule);
    
  }
/////////////////////////////////////////////////////////////////////////////////////
/*여기에 데이터 담았으니까, 데이터 사용하고 더미데이터 + 주석 지워주세요
*/ 
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


  const handleDotsClick = (schedule) => {
    setSelectedSchedule(schedule);
    setEditDeleteBottomSheettype("EditDelete");
    setEditDeleteBottomSheet(true);
  };

  const handleCloseshowEditDeleteBottomSheet = () => {
    setEditDeleteBottomSheet(false);
  };

  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setBottomSheetType("editSchedule");
    setEditDeleteBottomSheet(false);
  };

  const handleDeleteClick = (schedule) => {
    setEditDeleteBottomSheet(false);
    setShowBottomSheet(false);
    setScheduleDelete(true);
  };

  const handleOpenPetBottomSheet = () => {
    setBottomSheetType("pet");
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    setBottomSheetContent(null);
  };

  const handleAddScheduleBottomSheetClose = () => {
    console.log("1", scheduleSubmittedSuccessfully);
    if (scheduleSubmittedSuccessfully) {
      setScheduleSubmittedSuccessfully(false);
      console.log("2", scheduleSubmittedSuccessfully);
    } else if (!scheduleSubmittedSuccessfully) {
      modal();
    }
    setShowBottomSheet(false);
  };

  const modal = () => {
    if (!scheduleSubmittedSuccessfully) {
      setTimeout(() => setShowCancleModal(true), 100);
    }
  };

  const handleContinueWriting = () => {
    setShowCancleModal(false);
    if (bottomSheetType == "addSchedule") {
      setBottomSheetType("addSchedule");
    } else if (bottomSheetType == "scheduleDetail") {
      setBottomSheetType("scheduleDetail");
      setScheduleDelete(false);
    } else {
      setBottomSheetType("editSchedule");
    }

    setShowBottomSheet(true);
    setShowCancleModal(false);
  };

  const handleCloseCancleModal = () => {
    setScheduleDelete(false);
    setShowCancleModal(false);
  };

  const handleDateClick = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setInitialAddScheduleValues((prev) => ({
      ...prev,
      startDate: dayjs(date).toDate(),
      endDate: dayjs(date).toDate(),
    }));
  };

  const handleFloatingBtnClick = () => {
    setBottomSheetType("addSchedule");
    setInitialAddScheduleValues({
      startDate: dayjs(selectedDate).toDate(),
      endDate: dayjs(selectedDate).toDate(),
      title: "",
      content: "",
      isComplete: false,
      color: "#DE496E",
    });
    setShowBottomSheet(true);
  };

  const handleScheduleClick = (schedule) => {
    console.log("Clicked schedule: ", schedule);
    setSelectedSchedule(schedule);
    setBottomSheetType("scheduleDetail");
    setShowBottomSheet(true);
  };

  return (
    <div>
      <TopBar />
      <AnimalSelect
        onClick={handleOpenPetBottomSheet}
        selectedPet={selectedPet}
      />
      <Calendar schedules={schedules} onDateClick={handleDateClick} />
      <BottomSheet
        show={showBottomSheet}
        onClose={
          bottomSheetType === "addSchedule" ||
          bottomSheetType === "editSchedule"
            ? handleAddScheduleBottomSheetClose
            : handleCloseBottomSheet
        }
        scheduleSubmittedSuccessfully={scheduleSubmittedSuccessfully}
        setScheduleSubmittedSuccessfully={setScheduleSubmittedSuccessfully} // 전달된 부분
        type={bottomSheetType}
        initialTags={[]}
        selectedDate={selectedDate}
        setSelectedPet={setSelectedPet}
        initialAddScheduleValues={initialAddScheduleValues}
        schedule={bottomSheetContent}
        onDotsClick={handleDotsClick}
        onEditClick={handleEditClick}
        selectedSchedule={selectedSchedule}
      />
      {showCancleModal &&
        (bottomSheetType === "addSchedule" ||
          bottomSheetType === "editSchedule") && (
          <CheckModal
            Content="일정 작성을 취소하시겠어요?"
            CancleBtnContent="작성 취소"
            ContinueBtnContent="계속 작성"
            onClose={handleCloseCancleModal}
            onContinue={handleContinueWriting}
          />
        )}

      {ScheduleDelete && (
        <CheckModal
          Content="일정을 삭제하시겠어요?"
          CancleBtnContent="삭제"
          ContinueBtnContent="삭제 취소"
          onClose={handleCloseCancleModal}
          onContinue={handleContinueWriting}
        />
      )}

      <ScheduleBottom
        schedules={schedules}
        selectedDate={selectedDate}
        onScheduleClick={handleScheduleClick}
      />
      <FloatingBtn onClick={handleFloatingBtnClick} />

      <SubBottomSheet
        show={showEditDeleteBottomSheet}
        onClose={handleCloseshowEditDeleteBottomSheet}
        type={editDeleteBottomSheettype}
        onEditClick={handleEditClick}
        selectedSchedule={selectedSchedule}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default Calendarscreen;
