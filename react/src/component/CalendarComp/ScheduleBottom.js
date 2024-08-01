import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ScheduleBox from "./scheduleBox";
import styles from "../../css/schedule_bottom.module.css";
import "dayjs/locale/ko";
import ScheduleService from "../../api/scheduleApi"; // postApi

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale("ko");

const ScheduleBottom = ({ schedules, selectedDate, onScheduleClick }) => {
  const [updatedSchedules, setUpdatedSchedules] = useState(schedules);

  useEffect(() => {
    setUpdatedSchedules(schedules);
  }, [schedules]);
  useEffect(() => {
    console.log("변경됨")
    console.log(schedules)
  }, [schedules]);



  const getSchedule = useCallback(
    
    (date) => {
        const day = updatedSchedules.filter((schedule) => {
        const start = dayjs(schedule.startDate);
        const end = dayjs(schedule.endDate);
        const targetDate = dayjs(date);
      return targetDate.isBetween(start, end, "day", "[]");
      });

      return day.length > 0 ? day : [];
    
  },
    [updatedSchedules]
  );

  // const handleCheckBoxClick = async (item) => {

  //   console.log("완료 toggle" , item.id);
  //   console.log("scheduleId : " , item.isComplete )
  //   try {
  //     await ScheduleService.updateScheduleStatus(item);
  //     item.isComplete = !item.isComplete
  //     setUpdatedSchedules((prevSchedules) =>
  //       prevSchedules.map((schedule) =>
  //         schedule.scheduleId === item.id
  //           ? { ...schedule, isComplete: !schedule.isComplete }
  //           : schedule
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Failed to update schedule status:", error);
  //   }
  // };

  const dayformatter = dayjs(selectedDate, "YYYY/MM/DD").format(
    "YYYY년 MM월 DD일 (ddd)"
  );

  return (
    <div className={styles.ScheduleContainer}>
      {dayformatter && (
        <div className={styles.ScheduleWrap}>
          <div className={styles.SelectedDate}>{dayformatter}</div>
          <div className={styles.ScheduleBoxWrap}>
            {
            (updatedSchedules != null)?  
            getSchedule(selectedDate).length > 0 ? (
              getSchedule(selectedDate).map((item, index) => (
                <ScheduleBox
                  key={index}
                  item={item}
                  onScheduleClick={onScheduleClick}
                  //handleCheckBoxClick={handleCheckBoxClick}
                  setUpdatedSchedules={setUpdatedSchedules}
                  updatedSchedules={updatedSchedules}
                />
              ))
            ) : (
              <p className={styles.Noschedule}>일정이 없습니다.</p>
            ):
            <p className={styles.Noschedule}>일정이 없습니다.</p>
          }
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleBottom;
