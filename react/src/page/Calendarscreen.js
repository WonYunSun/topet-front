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

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export const Calendarscreen = () => {
  const [schedules, setSchedules] = useState([
    {
      scheduleId: 1,
      startDate: "2024-07-10T00:00:00",
      endDate: "2024-07-13T23:59:59",
      scheduleTitle: "병원 진료(건강검진)",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 2,
      startDate: "2024-07-10T09:00:00",
      endDate: "2024-07-10T10:00:00",
      scheduleTitle: "코코 아침 산책",
      scheduleContent: "test1",
      isComplete: true,
      color: "#2F9ABA",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 3,
      startDate: "2024-07-10T09:00:00",
      endDate: "2024-07-10T10:00:00",
      scheduleTitle: "example1",
      scheduleContent: "test1",
      isComplete: true,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 4,
      startDate: "2024-07-10T09:00:00",
      endDate: "2024-07-10T10:00:00",
      scheduleTitle: "example1",
      scheduleContent: "test1",
      isComplete: true,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 5,
      startDate: "2024-07-10T09:00:00",
      endDate: "2024-07-10T10:00:00",
      scheduleTitle: "example1",
      scheduleContent: "test1",
      isComplete: false,
      color: "#DE496E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 6,
      startDate: "2024-07-11T13:00:00",
      endDate: "2024-07-11T14:00:00",
      scheduleTitle: "example2",
      scheduleContent: "test2",
      isComplete: true,
      color: "#EE4E4E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 7,
      startDate: "2024-07-11T13:00:00",
      endDate: "2024-07-12T14:00:00",
      scheduleTitle: "겹치는 일정 잘 표시되나",
      scheduleContent: "test2",
      isComplete: false,
      color: "#EE4E4E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 8,
      startDate: "2024-07-12T11:30:00",
      endDate: "2024-07-12T12:30:00",
      scheduleTitle: "example3",
      scheduleContent: "test3",
      isComplete: true,
      color: "#ADD899",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 9,
      startDate: "2024-07-13T15:00:00",
      endDate: "2024-07-13T16:00:00",
      scheduleTitle: "example4",
      scheduleContent: "test4",
      isComplete: true,
      color: "#EC9454",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
      scheduleId: 10,
      startDate: "2024-07-19T15:00:00",
      endDate: "2024-07-22T16:00:00",
      scheduleTitle: "example4",
      scheduleContent: "test4",
      isComplete: true,
      color: "#EC9454",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
  ]);

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
