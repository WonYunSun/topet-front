import React, { useState } from "react";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);

export default function AddSchedule({ selectedDate }) {
  const initialDate = dayjs(selectedDate).isValid()
    ? dayjs(selectedDate).toDate()
    : new Date();
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(new Date());
  const [isComplete, setIsComplete] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  //   const [schdeduleColor, setschdeduleColor] = useState([
  //     "#DE496E",
  //     "#EC9454",
  //     "#ADD899",
  //     "#EE4E4E",
  //   ]);

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
            onChange={setStartDate}
            locale="ko"
            {...(isAllDay
              ? { dateFormat: "yyyy-MM-dd" }
              : { dateFormat: "yyyy-MM-dd HH:mm" })}
            {...(isAllDay ? {} : { showTimeSelect: true })}
            timeIntervals={10}
          />
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            minDate={startDate}
            locale="ko"
            {...(isAllDay
              ? { dateFormat: "yyyy-MM-dd" }
              : { dateFormat: "yyyy-MM-dd HH:mm" })}
            {...(isAllDay ? {} : { showTimeSelect: true })}
            timeIntervals={10}
          />
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
        <div>이미지 선택</div>
        <button type="submit">완료</button>
      </form>
    </div>
  );
}
