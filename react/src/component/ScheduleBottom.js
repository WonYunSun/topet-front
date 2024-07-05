import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "../css/schedule_bottom.module.css";
import "dayjs/locale/ko";
import BottomSheet from "../component/BottomSheet";
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale("ko");

const ScheduleBottom = ({ schedules, selectedDate }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState(null);
  console.log("props로받아오는값이 : ", selectedDate);
  const getSchedule = useCallback(
    (date) => {
      const day = schedules.filter((schedule) => {
        const start = dayjs(schedule.startDate);
        const end = dayjs(schedule.endDate);
        const targetDate = dayjs(date);

        return targetDate.isBetween(start, end, "day", "[]");
      });

      return day.length > 0 ? day : [];
    },
    [schedules]
  );

  const handleScheduleClick = (schedule) => {
    setBottomSheetContent(schedule);
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const dayformatter = dayjs(selectedDate, "YYYY/MM/DD").format(
    "YYYY년 MM월 DD일 (ddd)"
  );
  console.log(dayformatter);
  return (
    <div className={styles.ScheduleContainer}>
      {dayformatter && (
        <div className={styles.ScheduleWrap}>
          <p className={styles.SelectedDate}>{dayformatter}</p>
          <div className={styles.ScheduleBoxWrap}>
            {getSchedule(selectedDate).length > 0 ? (
              getSchedule(selectedDate).map((item, index) => (
                <div
                  className={styles.ScheduleBox}
                  key={index}
                  style={{ backgroundColor: item.color }}
                  onClick={() => handleScheduleClick(item)}
                >
                  {item.scheduleTitle}
                </div>
              ))
            ) : (
              <p className={styles.Noschedule}>일정이 없습니다.</p>
            )}
          </div>
        </div>
      )}
      {showBottomSheet && (
        <BottomSheet
          show={showBottomSheet}
          onClose={handleCloseBottomSheet}
          type="scheduleDetail"
          schedule={bottomSheetContent}
        />
      )}
    </div>
  );
};

export default ScheduleBottom;
