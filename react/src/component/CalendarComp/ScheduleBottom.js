import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "../../css/schedule_bottom.module.css";
import "dayjs/locale/ko";
import { GoCircle } from "react-icons/go";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import ScheduleService from "../../api/scheduleApi"; // postApi

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale("ko");

const ScheduleBottom = ({ schedules, selectedDate, onScheduleClick }) => {
  const [updatedSchedules, setUpdatedSchedules] = useState(schedules);

  useEffect(() => {
    setUpdatedSchedules(schedules);
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

  const handleCheckBoxClick = async (scheduleId) => {
    try {
      await ScheduleService.updateScheduleStatus(scheduleId);
      setUpdatedSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.scheduleId === scheduleId
            ? { ...schedule, isComplete: !schedule.isComplete }
            : schedule
        )
      );
    } catch (error) {
      console.error("Failed to update schedule status:", error);
    }
  };

  const dayformatter = dayjs(selectedDate, "YYYY/MM/DD").format(
    "YYYY년 MM월 DD일 (ddd)"
  );

  return (
    <div className={styles.ScheduleContainer}>
      {dayformatter && (
        <div className={styles.ScheduleWrap}>
          <div className={styles.SelectedDate}>{dayformatter}</div>
          <div className={styles.ScheduleBoxWrap}>
            {getSchedule(selectedDate).length > 0 ? (
              getSchedule(selectedDate).map((item, index) => (
                <div
                  className={styles.ScheduleBox}
                  key={index}
                  style={{ backgroundColor: item.color }}
                  onClick={() => onScheduleClick(item)} // 스케줄 클릭 핸들러 호출
                >
                  <div className={styles.ScheduleBoxContent}>
                    <div className={styles.ScheduleContent}>
                      <div className={styles.ScheduleDate}>
                        {dayjs(item.startDate).format("h:mm a") ===
                          "12:00 오전" &&
                        dayjs(item.endDate).format("h:mm a") ===
                          "11:59 오후" ? (
                          "하루 종일"
                        ) : (
                          <>
                            {dayjs(item.startDate).format("h:mm a")} -{" "}
                            {dayjs(item.endDate).format("h:mm a")}
                          </>
                        )}
                      </div>
                      <div className={styles.ScheduleTitle}>
                        {item.scheduleTitle}
                      </div>
                    </div>
                    <div className={styles.ScheduleBoxCheckBoxWrap}>
                      <div className={styles.verticalDivider} />
                      <div
                        className={styles.ScheduleBoxCheckBox}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckBoxClick(item.scheduleId);
                        }}
                      >
                        {item.isComplete ? (
                          <IoCheckmarkCircleOutline color="#fff" size={28} />
                        ) : (
                          <GoCircle
                            color="rgba(255, 255, 255, 0.3)"
                            size={25}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.Noschedule}>일정이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleBottom;
