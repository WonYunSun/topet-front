import React from "react";
import dayjs from "dayjs";
import styles from "../../css/scheduleDetails.module.css";
import { HiOutlineDotsVertical } from "react-icons/hi";

const ScheduleDetail = ({ onDotsClick, selectedSchedule }) => {
  const isComplete = selectedSchedule.isComplete;
  const isAllDay =
    dayjs(selectedSchedule.startDate).format("a hh:mm") === "오전 00:00" ||
    dayjs(selectedSchedule.endDate).format("a hh:mm") === "오후 11:59";
  console.log(selectedSchedule.photoSrc);
  return (
    <div className={styles.scheduleDetailWrap}>
      <div className={styles.titleWrap}>
        <div className={styles.title}>{selectedSchedule.scheduleTitle}</div>
        <HiOutlineDotsVertical
          size={18}
          onClick={() => {
            onDotsClick(selectedSchedule);
          }}
        />
      </div>
      <div className={styles.dateWrap}>
        <span>일자</span>
        <div className={styles.dateBox}>
          <div className={styles.date}>
            {dayjs(selectedSchedule.startDate).format("YYYY년 MM월 DD일")}
          </div>
          <div className={`${styles.TimeBox} ${isAllDay ? styles.hidden : ""}`}>
            <div>{dayjs(selectedSchedule.startDate).format("A h:mm")}</div>
          </div>
        </div>
        <div> - </div>
        <div className={styles.dateBox}>
          <div className={styles.date}>
            {dayjs(selectedSchedule.endDate).format("YYYY년 MM월 DD일")}
          </div>
          <div className={`${styles.TimeBox} ${isAllDay ? styles.hidden : ""}`}>
            <div>{dayjs(selectedSchedule.endDate).format("A h:mm")}</div>
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
        <div>{selectedSchedule.scheduleContent}</div>
      </div>
      <div className={styles.scheduleImg}>
        <img src={selectedSchedule.photoSrc} alt="schedule_Img"></img>
      </div>
      <div className={styles.WritEditWrap}>
        <div className={styles.scheduleWriterWrap}>
          <span>작성자</span>
          {selectedSchedule.author.name}
        </div>
        <div className={styles.scheduleEditerWrap}>
          <span>수정자</span>
          {selectedSchedule.updateAuthor}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
