import React, { useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isBetween from "dayjs/plugin/isBetween";
import { generateDate } from "./generateDate"; // 날짜 가져오는 파일
import styles from "../../css/calendar.module.css"; // CSS 모듈 임포트
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export const Calendar = ({ schedules, onDateClick }) => {
  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null); // 클릭된 날짜 상태 추가
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const dates = ["일", "월", "화", "수", "목", "금", "토"];
  
  const years = Array.from({ length: 100 }, (_, i) => dayjs().year() - 50 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const records = useMemo(() => generateDate(date), [date]);

  const prevMonth = useCallback(() => {
    setDate((prev) => prev.add(-1, "month"));
  }, []);

  const nextMonth = useCallback(() => {
    setDate((prev) => prev.add(1, "month"));
  }, []);

  const hasSchedule = useCallback(
    (date) => {
      if(schedules != null){
        return schedules.some((schedule) => {
          const start = dayjs(schedule.startDate);
          const end = dayjs(schedule.endDate);
          const current = dayjs(date);
          return current.isBetween(start, end, "day", "[]");
        });
      }
    }
    ,
    [schedules]
  );

  const onClickDay = useCallback(
    (clickedDate, e) => {
      e.preventDefault();
      setSelectedDate(clickedDate); // 클릭된 날짜 설정
      onDateClick(dayjs(clickedDate).format("YYYY-MM-DD"));
    },
    [onDateClick]
  );

  const handleYearMonthSelect = () => {
    const year = document.getElementById("yearPicker").value;
    const month = document.getElementById("monthPicker").value;
    setDate(dayjs(`${year}-${month}-01`));
    setShowYearMonthPicker(false);
  };
  return (
    <div className={styles.CalendarContainer}>
      {showYearMonthPicker && (
        <>
          <div
            className={styles.ModalOverlay}
            onClick={() => setShowYearMonthPicker(false)}
          />
          <div
            className={styles.YearMonthPickerModal}
            defaultValue={date.year()}
          >
            <span>달력 이동</span>
            <div>
              <select
                id="yearPicker"
                className={styles.YearPicker}
                defaultValue={date.year()}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                id="monthPicker"
                className={styles.MonthPicker}
                defaultValue={date.month() + 1}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleYearMonthSelect}>확인</button>
          </div>
        </>
      )}
      <div className={styles.CalendarHeader}>
        <div onClick={prevMonth}>
          <button>
            <SlArrowLeft />
          </button>
        </div>
        <div
          className="block xl:hidden"
          onClick={() => setShowYearMonthPicker(true)}
        >
          <span>
            {date.year()}년 {date.month() + 1}월
          </span>
        </div>
        <div onClick={nextMonth}>
          <button>
            <SlArrowRight />
          </button>
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
          const isSelected =
            selectedDate && dayjs(selectedDate).isSame(date, "day"); // 클릭된 날짜인지 확인

          const classNames = [
            styles.DateLabel,
            currentMonth ? styles.currentMonth : "",
            isToday ? styles.Today : "",
            isSelected ? styles.SelectedDate : "", // 클릭된 날짜일 경우 추가 클래스 적용
            isToday && isSelected ? styles.SelectedToday : "", // 오늘 날짜이면서 선택된 날짜일 경우 추가 클래스 적용
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
              {currentMonth && hasSchedule(date) && (
                <div className={styles.scheduleDot}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
