import React from "react";
import dayjs from "dayjs";
import styles from "../../css/scheduleDetails.module.css";
import { HiOutlineDotsVertical } from "react-icons/hi";

const ScheduleDetail = ({ schedule }) => {
  const isComplete = schedule?.isComplete;
  const isAllDay =
    dayjs(schedule.startDate).format("a hh:mm") === "오전 00:00" ||
    dayjs(schedule.endDate).format("a hh:mm") === "오후 11:59";

  return schedule ? (
    <div className={styles.scheduleDetailWrap}>
      <div className={styles.titleWrap}>
        <div className={styles.title}>{schedule.scheduleTitle}</div>
        <HiOutlineDotsVertical size={18} />
      </div>
      <div className={styles.dateWrap}>
        <span>일자</span>
        <div className={styles.dateBox}>
          <div className={styles.date}>
            {dayjs(schedule.startDate).format("YYYY년 MM월 DD일")}
          </div>
          <div className={`${styles.TimeBox} ${isAllDay ? styles.hidden : ""}`}>
            <div>{dayjs(schedule.startDate).format("A HH:mm")}</div>
          </div>
        </div>
        <div> - </div>
        <div className={styles.dateBox}>
          <div className={styles.date}>
            {dayjs(schedule.endDate).format("YYYY년 MM월 DD일")}
          </div>
          <div className={`${styles.TimeBox} ${isAllDay ? styles.hidden : ""}`}>
            <div>{dayjs(schedule.endDate).format("A HH:mm")}</div>
          </div>
        </div>
      </div>
      <div className={styles.radiobtn}>
        <span>완료여부</span>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="chk_info"
            value="완료"
            checked={isComplete}
            readOnly
          />{" "}
          <div>완료</div>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="chk_info"
            value="미완료"
            checked={!isComplete}
            readOnly
          />{" "}
          <div>미완료</div>
        </label>
      </div>
      <div className={styles.memoArea}>
        <span>메모</span>
        <div>{schedule.scheduleContent}</div>
      </div>
      <div className={styles.scheduleImg}></div>
      <div className={styles.WritEditWrap}>
        <div className={styles.scheduleWriterWrap}>
          <span>작성자</span>
          {schedule.scheduleWriter}
        </div>
        <div className={styles.scheduleEditerWrap}>
          <span>수정자</span>
          {schedule.scheduleEditer}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ScheduleDetail;
