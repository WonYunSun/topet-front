import React, { useState, useEffect, forwardRef } from "react";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../component/ButtonComp/Button";
import ko from "date-fns/locale/ko";
import SchedulePhotoSelectArea from "./SchedulePhotoSelectArea";
import styles from "../../css/addSchedule.module.css";
import ScheduleApi from "../../api/scheduleApi";
import CheckModal from "../CheckModal";

registerLocale("ko", ko);

const colors = ["#DE496E", "#5C60ED", "#4BAFDA", "#F4A5B5"];

export default function AddSchedule({
  selectedDate,
  onClose,
  initialValues = {},
  setScheduleSubmittedSuccessfully,
  scheduleSubmittedSuccessfully,
  selectedPet
}) {
  const initialDate = dayjs(selectedDate).isValid()
    ? dayjs(selectedDate).toDate()
    : new Date();
  const defaultValues = {
    startDate: initialDate,
    endDate: initialDate,//.add(5, 'minute'),
    title: "",
    content: "",
    isComplete: false,
    color: "#000000",
  };

  const [startDate, setStartDate] = useState(
    initialValues.startDate || defaultValues.startDate
  );
  const [endDate, setEndDate] = useState(
    initialValues.endDate || defaultValues.endDate
  );
  const [title, setTitle] = useState(
    initialValues.title || defaultValues.title
  );
  const [content, setContent] = useState(
    initialValues.content || defaultValues.content
  );
  const [isComplete, setIsComplete] = useState(
    initialValues.isComplete || defaultValues.isComplete
  );
  const [color, setColor] = useState(
    initialValues.color || defaultValues.color
  );

  const [isAllDay, setIsAllDay] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [btnStyle, setBtnStyle] = useState("gray");

  useEffect(() => {
    setStartDate(initialValues.startDate || defaultValues.startDate);
    setEndDate(initialValues.endDate || defaultValues.endDate);
    setTitle(initialValues.title || defaultValues.title);
    setContent(initialValues.content || defaultValues.content);
    setIsComplete(initialValues.isComplete || defaultValues.isComplete);
    setColor(initialValues.color || defaultValues.color);
  }, [initialValues]);

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

  const postScheduleData = async () => {
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
    formData.append("scheduleWriter", "WriterName");
    formData.append("scheduleEditer", "EditorName");
    formData.append("animal", selectedPet.id);

    if (selectedPhoto != null) {formData.append("photo", selectedPhoto);}
    console.log("postSchedule 호출");
    console.log()
    ScheduleApi.postSchedule(formData); // ScheduleService 호출 //post로직
    console.log("postSchedule 호출끝");

  };

  const handleButtonClick = async () => {
    if (title !== "") {
      try {
        await postScheduleData();
        setScheduleSubmittedSuccessfully(true);
      } catch (error) {
        console.error("스케줄 저장 중 오류 발생:", error);
        setScheduleSubmittedSuccessfully(false);
        onClose();
      }
    } else {
      setShowCheckModal(true);
    }
  };

  useEffect(() => {
    if (scheduleSubmittedSuccessfully) {
      onClose();
    }
  }, [scheduleSubmittedSuccessfully, onClose]);

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
