// ScheduleBottom.js
import React, { useEffect, useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styles from "../css/schedule_bottom.module.css";
import "dayjs/locale/ko";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
dayjs.extend(localizedFormat);
dayjs.extend(isToday);

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
          {getSchedule(selectedDate).length > 0 ? (
            getSchedule(selectedDate).map((item, index) => {
              return (
                <div className={styles.ScheduleBox} key={index}>
                  {item.schedule.title}
                </div>
              );
            })
          ) : (
            <p className={styles.Noschedule}>일정이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleBottom;
