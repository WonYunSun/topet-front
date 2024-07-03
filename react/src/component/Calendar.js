import React, { useEffect, useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { generateDate } from "./generateDate"; // 날짜 가져오는 파일
import styles from "../css/calendar.module.css"; // CSS 모듈 임포트

dayjs.extend(localizedFormat);
dayjs.extend(isToday);

export const Calendar = ({ schedules, onDateClick }) => {
  // 달력생성
  const [date, setDate] = useState(dayjs());
  const dates = ["일", "월", "화", "수", "목", "금", "토"];

  const records = useMemo(() => generateDate(date), [date]);

  const prevMonth = useCallback(() => {
    setDate((prev) => prev.add(-1, "month"));
  }, []);

  const nextMonth = useCallback(() => {
    setDate((prev) => prev.add(1, "month"));
  }, []);

  const hasSchedule = useCallback(
    (date) => {
      return schedules.find((schedule) =>
        dayjs(schedule.date).isSame(date, "day")
      );
    },
    [schedules]
  );

  const onClickDay = useCallback(
    (clickedDate, e) => {
      e.preventDefault();
      onDateClick(dayjs(clickedDate).format("L"));
    },
    [onDateClick]
  );

  return (
    <div className={styles.CalendarContainer}>
      <div className={styles.CalendarHeader}>
        <div onClick={prevMonth}>
          <button>{` < `}</button>
        </div>
        <div className="block xl:hidden">
          <span>
            {date.year()}년 {date.month() + 1}월
          </span>
        </div>
        <div onClick={nextMonth}>
          <button>{` > `}</button>
        </div>
      </div>
      <div className={styles.DateContainer}>
        {dates.map((date, index) => (
          <div className={styles.days} key={index}>
            {date}
          </div>
        ))}
      </div>
      <div className={styles.DayContainer}>
        {records.map(({ date, currentMonth }, index) => {
          const isToday = dayjs(date).isToday();
          const classNames = [
            styles.DateLabel,
            currentMonth ? styles.currentMonth : "",
            isToday ? styles.Today : "",
          ].join(" ");

          return (
            <div
              key={index}
              className={classNames}
              onClick={(e) => onClickDay(date.$d, e)}
            >
              <div>{date.date()}</div>
              {isToday && currentMonth && (
                <div className={styles.TodayDot}></div>
              )}
              {hasSchedule(date) && currentMonth && (
                <div className={styles.scheduleDot}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
