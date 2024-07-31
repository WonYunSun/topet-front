import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScheduleBox from "../CalendarComp/scheduleBox";
import styles from "../../css/scheduleToday.module.css";
import "dayjs/locale/ko";
import ScheduleService from "../../api/scheduleApi"; // postApi

function ScheduleToday({ schedules }) {
  const [updatedSchedules, setUpdatedSchedules] = useState(schedules);
  const [selectedDate, setSelectedDate] = useState(dayjs());

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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => {
      const maxDots = 10;
      const displayedDots = dots.slice(0, maxDots);
      return (
        <div style={{ position: "static" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0",
              margin: "0",
            }}
          >
            {displayedDots}
            {dots.length > maxDots && <li>...</li>}
          </ul>
        </div>
      );
    },
  };

  return (
    <div className={styles.scheduleContainer}>
      {schedules.length > 0 ? (
        <Slider {...settings}>
          {schedules.map((item) => (
            <div key={item.scheduleId}>
              <ScheduleBox item={item} handleCheckBoxClick={handleCheckBoxClick} setUpdatedSchedules={setUpdatedSchedules}/>
            </div>
          ))}
        </Slider>
      ) : (
        <div className={styles.noSchedule}>일정이 없습니다.</div>
      )}
    </div>
  );
}

export default ScheduleToday;
