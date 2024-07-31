import React, { useEffect } from "react";
import dayjs from "dayjs";
import { GoCircle } from "react-icons/go";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import styles from "../../css/schedule_box.module.css";
import scheduleApi from "../../api/scheduleApi";

const ScheduleBox = ({ item, onScheduleClick , updatedSchedules, setUpdatedSchedules}) => {

  const handleCheckBoxClick = async (item) => {

    console.log("완료 toggle" , item.id);
    console.log("scheduleId : " , item.isComplete )
    try {
      await scheduleApi.updateScheduleStatus(item);
      item.isComplete = !item.isComplete
      setUpdatedSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.scheduleId === item.id
            ? { ...schedule, isComplete: !schedule.isComplete }
            : schedule
        )
      );
    } catch (error) {
      console.error("Failed to update schedule status:", error);
    }
  };

  useEffect(()=>{},[item.isComplete])

  return (
    <div
      className={styles.ScheduleBox}
      style={{ backgroundColor: item.color }}
      onClick={() => onScheduleClick(item)}
    >
      <div className={styles.ScheduleBoxContent}>
        <div className={styles.ScheduleContent}>
          <div className={styles.ScheduleDate}>
            {dayjs(item.startDate).format("h:mm a") === "12:00 오전" &&
            dayjs(item.endDate).format("h:mm a") === "11:59 오후" ? (
              "하루 종일"
            ) : (
              <>
                {dayjs(item.startDate).format("h:mm a")} -{" "}
                {dayjs(item.endDate).format("h:mm a")}
              </>
            )}
          </div>
          <div className={styles.ScheduleTitle}>{item.scheduleTitle}</div>
        </div>
        <div className={styles.ScheduleBoxCheckBoxWrap}>
          <div className={styles.verticalDivider} />
          <div
            className={styles.ScheduleBoxCheckBox}
            onClick={(e) => {
              e.stopPropagation();
              handleCheckBoxClick(item);
            }}
          >
            {item.isComplete ? (
              <IoCheckmarkCircleOutline color="#fff" size={28} />
            ) : (
              <GoCircle color="rgba(255, 255, 255, 0.3)" size={25} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleBox;
