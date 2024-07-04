import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styles from "../css/calendar.module.css";
import { Calendar } from "./../component/Calendar";
import TopBar from "../component/TopBar";
import AnimalSelect from "../component/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import ScheduleBottom from "../component/ScheduleBottom";
import "../css/bottomsheet.css";
import FloatingBtn from "../component/FloatingBtn";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);

export const Calendarscreen = () => {
  const now = dayjs().format("DD/MM/YY");

  // 더미데이터 넣어놓은겁니다
  const [schedules, setSchedules] = useState([
    {
      date: "07/10/2024",
      schedule: { title: "example1", content: "test1", color: "#DE496E" },
    },
    {
      date: "07/10/2024",
      schedule: { title: "example2", content: "test1", color: "#EE4E4E" },
    },
    {
      date: "07/10/2024",
      schedule: { title: "example2", content: "test1", color: "#ADD899" },
    },
    {
      date: "07/10/2024",
      schedule: { title: "example2", content: "test1", color: "#EE4E4E" },
    },
    {
      date: "07/17/2024",
      schedule: { title: "example2", content: "test2", color: "#DE496E" },
    },
    {
      date: "07/23/2024",
      schedule: { title: "example3", content: "test3", color: "#EC9454" },
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
