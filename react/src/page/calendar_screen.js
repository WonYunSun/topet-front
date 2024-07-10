// calendar_screen.js
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Calendar } from "../component/CalendarComp/Calendar";
import TopBar from "../component/TopBar";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import ScheduleBottom from "../component/CalendarComp/ScheduleBottom";
import "../css/bottomsheet.css";
import FloatingBtn from "../component/ButtonComp/FloatingBtn";
import isBetween from "dayjs/plugin/isBetween";
import NavBar from "../component/NavBarComp/NavBar";
import CheckModal from "../component/CheckModal";
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export const Calendarscreen = () => {
  // const now = dayjs().format("YYYY-MM-DD");
  const [schedules, setSchedules] = useState([
    // 더미데이터 넣어놓은겁니다
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
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 선택된 날짜 관리할것
  const [showCancleModal, setShowCancleModal] = useState(false);
  const [initialAddScheduleValues, setInitialAddScheduleValues] = useState({
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
    title: "",
    content: "",
    isComplete: false,
    color: "#DE496E",
  });

  const handleOpenPetBottomSheet = () => {
    setBottomSheetType("pet");
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    setTimeout(() => setShowCancleModal(true), 0); // 상태 업데이트를 비동기적으로 처리
  };

  const handleContinueWriting = () => {
    setShowCancleModal(false);
    setShowBottomSheet(true);
    setTimeout(() => setBottomSheetType("addSchedule"), 0);
  };

  const handleCloseCancleModal = () => {
    setShowCancleModal(false);
  };

  const handleDateClick = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate); // 선택된 날짜 업데이트
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
        onClose={handleCloseBottomSheet}
        type={bottomSheetType}
        initialTags={[]}
        selectedDate={selectedDate}
        setSelectedPet={setSelectedPet}
        initialAddScheduleValues={initialAddScheduleValues}
      />
      {showCancleModal && bottomSheetType === "addSchedule" && (
        <CheckModal
          Content="작성한 일정을 폐기하시겠습니까?"
          ContinueBtnContent="계속 작성"
          CancleBtnContent="작성 취소"
          onClose={handleCloseCancleModal}
          onContinue={handleContinueWriting}
        />
      )}
      <ScheduleBottom
        schedules={schedules}
        selectedDate={selectedDate}
        onClose={handleCloseBottomSheet}
      />
      <FloatingBtn onClick={handleFloatingBtnClick} />
      <NavBar />
    </div>
  );
};

export default Calendarscreen;
