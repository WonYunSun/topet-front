// ScheduleBottom.js
import React, { useCallback } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styles from "../css/schedule_bottom.module.css";
import "dayjs/locale/ko";

dayjs.extend(localizedFormat);
dayjs.locale("ko");

const ScheduleBottom = ({ schedules, selectedDate }) => {
  const getSchedule = useCallback(
    (date) => {
      const day = schedules.filter((schedule) =>
        dayjs(schedule.date).isSame(date, "day")
      );
      // 필터링된 결과가 있으면 해당 배열 반환, 없으면 빈 배열 반환
      return day.length > 0 ? day : [];
    },
    [schedules]
  );

  const dayformatter = dayjs(selectedDate).format("YYYY년 MM월 DD일 (ddd)");

  return (
    <div className={styles.ScheduleContainer}>
      {dayformatter && (
        <div className={styles.ScheduleWrap}>
          <p className={styles.SelectedDate}>{dayformatter}</p>
          <div className={styles.ScheduleBoxWrap}>
            {getSchedule(selectedDate).length > 0 ? (
              getSchedule(selectedDate).map((item, index) => (
                <div className={styles.ScheduleBox} key={index}>
                  {item.schedule.title}
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
