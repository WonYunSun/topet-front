import React, { useEffect, useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { generateDate } from "./generateDate"; // 날짜 가져오는 파일
import styles from "../css/calendar.module.css"; // CSS 모듈 임포트

dayjs.extend(localizedFormat);
dayjs.extend(isToday);

export const Calendar = () => {
  // 더미데이터 넣어놓은겁니다
  const [schedules, setSchedules] = useState([
    {
      date: "07/10/2024",
      schedule: { title: "example1", content: "test1" },
    },
    {
      date: "07/10/2024",
      schedule: { title: "example1-2", content: "test1-2" },
    },
    {
      date: "07/17/2024",
      schedule: { title: "example2", content: "test2" },
    },
    {
      date: "08/17/2024",
      schedule: { title: "example2", content: "test2" },
    },
  ]);

  const [date, setDate] = useState(dayjs());
  const dates = ["일", "월", "화", "수", "목", "금", "토"];

  const records = useMemo(() => generateDate(date), [date]);

  const prevMonth = useCallback(() => {
    setDate((prev) => prev.add(-1, "month"));
  }, []);

  const nextMonth = useCallback(() => {
    setDate((prev) => prev.add(1, "month"));
  }, []);

  // 스케쥴 유무 여부 확인
  const hasSchedule = useCallback(
    (date) => {
      return schedules.some((schedule) =>
        dayjs(schedule.date).isSame(date, "day")
      );
    },
    [schedules]
  );

  // 특정 날짜의 스케쥴을 가져오는 함수
  const getSchedules = useCallback(
    (date) => {
      return schedules.find((schedule) =>
        dayjs(schedule.date).isSame(date, "day")
      );
    },
    [schedules]
  );

  const onClickDay = useCallback(
    (date, e) => {
      e.preventDefault();
      console.log(dayjs(date).format("L"));
      if (dayjs(date).isToday()) {
        console.log("오늘이다");
      }
      const schedules = getSchedules(date);
      if (hasSchedule(date)) {
        console.log(schedules);
      }
    },
    [getSchedules, hasSchedule]
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
