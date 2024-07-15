// ScheduleEdit.js
import React, { useState, useEffect, forwardRef } from "react";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../component/ButtonComp/Button";
import ko from "date-fns/locale/ko";
import SchedulePhotoSelectArea from "./SchedulePhotoSelectArea";
import styles from "../../css/addSchedule.module.css";
import ScheduleService from "../../api/scheduleApi";
import CheckModal from "../CheckModal";
registerLocale("ko", ko);

const colors = ["#DE496E", "#5C60ED", "#4BAFDA", "#F4A5B5"];

export default function ScheduleEdit({ selectedSchedule, onClose }) {
  const initialDate = dayjs(selectedSchedule.startDate).isValid()
    ? dayjs(selectedSchedule.startDate).toDate()
    : new Date();

  const defaultValues = {
    startDate: initialDate,
    endDate: dayjs(selectedSchedule.endDate).toDate(),
    title: selectedSchedule.scheduleTitle || "",
    content: selectedSchedule.scheduleContent || "",
    isComplete: selectedSchedule.isComplete || false,
    color: selectedSchedule.color || "#DE496E",
  };

  const [startDate, setStartDate] = useState(defaultValues.startDate);
  const [endDate, setEndDate] = useState(defaultValues.endDate);
  const [title, setTitle] = useState(defaultValues.title);
  const [content, setContent] = useState(defaultValues.content);
  const [isComplete, setIsComplete] = useState(defaultValues.isComplete);
  const [color, setColor] = useState(defaultValues.color);

  const [isAllDay, setIsAllDay] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [btnStyle, setBtnStyle] = useState("gray");
  const [showCheckModal, setShowCheckModal] = useState(false);
  useEffect(() => {
    setStartDate(defaultValues.startDate);
    setEndDate(defaultValues.endDate);
    setTitle(defaultValues.title);
    setContent(defaultValues.content);
    setIsComplete(defaultValues.isComplete);
    setColor(defaultValues.color);
  }, [selectedSchedule]);

  useEffect(() => {
    if (title.trim() === "") {
      setBtnStyle("gray");
    } else {
      setBtnStyle("orange");
    }
  }, [title]);

  const handleCloseCheckModal = () => {
    setShowCheckModal(false);
  };

  const handleStartDateChange = (date) => {
    const newDate = dayjs(date).toDate();
    setStartDate(newDate);
    if (dayjs(newDate).isAfter(endDate)) {
      setEndDate(newDate);
    }
  };

  const handleEndDateChange = (date) => {
    const newDate = dayjs(date).toDate();
    if (dayjs(newDate).isBefore(startDate)) {
      setEndDate(startDate);
    } else {
      setEndDate(newDate);
    }
  };

  const handleAllDay = () => {
    const startOfDay = dayjs(startDate).startOf("day").toDate();
    const endOfDay = dayjs(startDate).endOf("day").toDate();
    setStartDate(startOfDay);
    setEndDate(endOfDay);
    setIsAllDay(!isAllDay);
  };

  const handleCompletionChange = () => {
    setIsComplete(!isComplete);
  };

  const handlePhotoSelected = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
  };

  const handleColorClick = (selectedColor) => {
    setColor(selectedColor);
  };

  const updateScheduleData = async () => {
    const formData = new FormData();
    formData.append(
      "startDate",
      dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss")
    );
    formData.append("endDate", dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss"));
    formData.append("scheduleTitle", title);
    formData.append("scheduleContent", content);
    formData.append("isComplete", isComplete);
    formData.append("color", color);
    formData.append("scheduleWriter", selectedSchedule.scheduleWriter);
    formData.append("scheduleEditer", "EditorName");

    await ScheduleService.updateSche(selectedSchedule.scheduleId, formData);
  };

  const updateSchedulePhoto = async () => {
    if (!selectedPhoto) return;

    const formData = new FormData();
    formData.append("photo", selectedPhoto);

    await ScheduleService.updateSchePhoto(
      selectedSchedule.scheduleId,
      formData
    );
  };

  const handleButtonClick = async () => {
    if (title !== "") {
      try {
        await updateScheduleData();
        await updateSchedulePhoto();
        onClose();
      } catch (error) {
        console.error("스케줄 수정 중 오류 발생:", error);
      }
    } else {
      setShowCheckModal(true); // 타이틀이 빈 문자열일 경우 모달 표시
    }
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={styles.customInput} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div className={styles.AddScheduleWrap}>
      <input
        className={styles.ScheduleTitle}
        type="text"
        name="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.DataSelectArea}>
        <span>일정</span>
        <div className={styles.DatepickerBoxWrap}>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            className={styles.DatepickerBox}
            customInput={<CustomInput />}
          />
          <div
            className={`${styles.TimepickerBox} ${
              isAllDay ? styles.hidden : ""
            }`}
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(dayjs(date).toDate())}
              showTimeSelect
              showTimeSelectOnly
              locale="ko"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="aa h:mm"
              className={styles.TimepickerBox}
              customInput={<CustomInput />}
            />
          </div>
        </div>
        <div> - </div>
        <div className={styles.DatepickerBoxWrap}>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            minDate={startDate}
            locale="ko"
            openToDate={startDate}
            dateFormat="yyyy년 MM월 dd일"
            className={styles.DatepickerBox}
            customInput={<CustomInput />}
          />
          <div
            className={`${styles.TimepickerBox} ${
              isAllDay ? styles.hidden : ""
            }`}
          >
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              locale="ko"
              timeCaption="Time"
              dateFormat="aa h:mm"
              className={styles.TimepickerBox}
              customInput={<CustomInput />}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAllDay}
          className={isAllDay ? styles.AlldayBtn : styles.AlldayBtnReverse}
        >
          하루종일
        </button>
      </div>
      <div className={styles.radiobtn}>
        <span>완료여부</span>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="chk_info"
            value="완료"
            onChange={handleCompletionChange}
            checked={isComplete}
          />{" "}
          <div>완료</div>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="chk_info"
            value="미완료"
            onChange={handleCompletionChange}
            checked={!isComplete}
          />{" "}
          <div>미완료</div>
        </label>
      </div>
      <div className={styles.colorPicker}>
        <span>색상</span>
        <div className={styles.colorOptions}>
          {colors.map((colorOption) => (
            <div
              key={colorOption}
              className={styles.colorOption}
              style={{
                backgroundColor: colorOption,
                boxShadow: color === colorOption ? "0 0 0 1px #333" : "none",
              }}
              onClick={() => handleColorClick(colorOption)}
            ></div>
          ))}
        </div>
      </div>
      <div>
        <span>메모</span>
        <input
          type="text"
          name="memo"
          placeholder="메모를 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={styles.imagepickerBox}>
        <span>사진</span>
        <SchedulePhotoSelectArea
          selectedPhoto={selectedPhoto}
          onPhotoSelected={handlePhotoSelected}
          onRemovePhoto={handleRemovePhoto}
        />
      </div>
      <Button
        type="submit"
        text="완료"
        btnstyle={btnStyle}
        postServer_withoutPhotos={updateScheduleData}
        postServer_withPhotos={updateSchedulePhoto}
        onClick={handleButtonClick}
      />
      {showCheckModal && (
        <CheckModal
          oneBtn="true"
          onClose={handleCloseCheckModal}
          Content="제목을 입력해주세요"
        />
      )}
    </div>
  );
}
