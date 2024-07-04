import React, { useState } from "react";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../component/Button";
import PhotoSelectBox from "../component/PhotoSelectBox";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);

export default function AddSchedule({ selectedDate }) {
  const initialDate = dayjs(selectedDate).isValid()
    ? dayjs(selectedDate).toDate()
    : new Date();
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(initialDate);
  const [isComplete, setIsComplete] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (dayjs(date).isAfter(endDate)) {
      setEndDate(date);
    }
  };

  const handleAllDay = () => {
    const startOfDay = dayjs(startDate).startOf("day").toDate();
    const endOfDay = dayjs(startDate).endOf("day").toDate();
    setStartDate(startOfDay);
    setEndDate(endOfDay);
    setIsAllDay(!isAllDay);
  };

  const handleCompletionChange = (event) => {
    setIsComplete(event.target.value === "완료");
  };

  return (
    <div>
      <form>
        <input type="text" name="title" placeholder="제목" />
        <div>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            locale="ko"
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            minDate={startDate}
            locale="ko"
            openToDate={startDate}
            dateFormat="yyyy-MM-dd"
          />
          {isAllDay && (
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  console.log("Selected start time:", date);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  console.log("Selected end time:", date);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm"
              />
            </div>
          )}
          <button type="button" onClick={handleAllDay}>
            하루종일
          </button>
        </div>
        <div>
          완료여부
          <input
            type="radio"
            name="chk_info"
            value="완료"
            onChange={handleCompletionChange}
            checked={isComplete}
          />{" "}
          완료
          <input
            type="radio"
            name="chk_info"
            value="미완료"
            onChange={handleCompletionChange}
            checked={!isComplete}
          />{" "}
          미완료
        </div>
        <div>색상</div>
        <div>
          메모
          <input type="text" name="memo" placeholder="메모를 입력해주세요" />
        </div>
        <div>
          이미지 선택
          <PhotoSelectBox isCountNeed="true" />
        </div>
        <Button type="submit" text="완료" btnstyle="orange">
          완료
        </Button>
      </form>
    </div>
  );
}
