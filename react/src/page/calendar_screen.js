import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
// import styles from "../css/calendar.module.css";
import { Calendar } from "./../component/Calendar";
import TopBar from "../component/TopBar";
import AnimalSelect from "../component/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import ScheduleBottom from "../component/ScheduleBottom";
import "../css/bottomsheet.css";
import FloatingBtn from "../component/FloatingBtn";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export const Calendarscreen = () => {
  const now = dayjs().format("YYYY/MM/DD");

  // 더미데이터 넣어놓은겁니다
  const [schedules, setSchedules] = useState([
    {
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
      startDate: "2024-07-11T13:00:00",
      endDate: "2024-07-12T14:00:00",
      scheduleTitle: "겹치는 일정 잘 표시되나",
      scheduleContent: "test2",
      isComplete: true,
      color: "#EE4E4E",
      scheduleWriter: "A",
      scheduleEditer: "B",
    },
    {
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
  const [selectedDate, setSelectedDate] = useState(now); // 선택된 날짜 관리할것

  const handleOpenPetBottomSheet = () => {
    setBottomSheetType("pet");
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    handleCloseBottomSheet();
  };

  const handleDateClick = (date) => {
    setSelectedDate(date); // 선택된 날짜 업데이트
  };

  const handleFloatingBtnClick = () => {
    setBottomSheetType("addSchedule");
    setShowBottomSheet(true);
  };
  console.log("선택된 날짜는 : ", selectedDate);
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
        onSelectPet={handleSelectPet}
        type={bottomSheetType}
        initialTags={[]}
        selectedDate={selectedDate}
      />
      <ScheduleBottom schedules={schedules} selectedDate={selectedDate} />
      <FloatingBtn onClick={handleFloatingBtnClick} />

      {showBottomSheet && (
        <div className="overlay" onClick={handleCloseBottomSheet}></div>
      )}
    </div>
  );
};

export default Calendarscreen;
