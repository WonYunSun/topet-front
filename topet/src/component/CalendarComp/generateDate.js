// 달력의 날짜 가져오는 파일입니다.

import dayjs from "dayjs";

export const generateDate = (date) => {
  const firstDateOfMonth = dayjs(date).startOf("month");
  const lastDateOfMonth = dayjs(date).endOf("month");

  const arrayofDate = [];

  // prefix 날짜 생성
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayofDate.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
  }

  // 현재 달 날짜 생성
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayofDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
    });
  }

  const remaining = 42 - arrayofDate.length;

  // postfix 날짜 생성
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayofDate.push({ currentMonth: false, date: lastDateOfMonth.date(i) });
  }

  return arrayofDate;
};
