import React, { useState, useEffect } from "react";
import years from "../../data/year";
import dayjs from "dayjs";
import styles from "../../css/animal_birth.module.css";
import { TbTriangleInvertedFilled } from "react-icons/tb";

const AnimalBirth = ({
  year,
  month,
  day,
  setYear,
  setMonth,
  setDay,
  selectedBirth,
  setSelectedBirth,
  setNextPossible,
  birthDontKnow,
  setBirthDontKnow,
}) => {
  const [dropdown, setDropdown] = useState({
    year: false,
    month: false,
    day: false,
  });
  const [openDropdownType, setOpenDropdownType] = useState(null);

  console.log("birthdontknow: ", birthDontKnow);
  console.log("selectedBirth: ", selectedBirth);

  const toggleDropdown = (type) => {
    if (!birthDontKnow) {
      setDropdown((prevState) => ({
        year: type === "year" ? !prevState.year : false,
        month: type === "month" ? !prevState.month : false,
        day: type === "day" ? !prevState.day : false,
      }));
      setOpenDropdownType(type);
    }
  };

  const closeDropdown = () => {
    setDropdown({
      year: false,
      month: false,
      day: false,
    });
    setOpenDropdownType(null);
  };

  // useEffect(() => {
  //   // if (birthDontKnow) {
  //   //   setNextPossible(true);
  //   // }
  //   if (
  //     (selectedBirth == "" || selectedBirth == undefined) &&
  //     birthDontKnow == false
  //   ) {
  //     setNextPossible(false);
  //   } else {
  //     setNextPossible(true);
  //   }
  // }, [birthDontKnow, setNextPossible, selectedBirth]);

  useEffect(() => {
    if (year && month && day) {
      setSelectedBirth(
        `${year}${String(month).padStart(2, "0")}${String(day).padStart(
          2,
          "0"
        )}`
      );
    }
  }, [year, month, day, setSelectedBirth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.custom_select}`)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const today = dayjs();
  const currentYear = today.year();
  let currentMonth = today.month() + 1;
  const currentDay = today.date();

  // useEffect(() => {
  //   // if (birthDontKnow == true) {
  //   //   setNextPossible(true);
  //   //   setYear("");
  //   //   setMonth("");
  //   //   setDay("");
  //   //   setSelectedBirth("생일모름");
  //   // } else if (year && month && day) {
  //   //   setNextPossible(true);
  //   // } else {
  //   //   setNextPossible(false);
  //   // }
  // }, [birthDontKnow, year, month, day, setNextPossible]);

  const handleYearChange = (newYear) => {
    setYear(newYear);

    if (newYear && month && day) {
      setSelectedBirth(
        `${newYear}${String(month).padStart(2, "0")}${String(day).padStart(
          2,
          "0"
        )}`
      );
    }

    closeDropdown();
    if (month == "") {
      toggleDropdown("month");
    }
  };

  const renderYearOptions = () => {
    return years
      .filter((year) => year <= currentYear)
      .sort((a, b) => b - a)
      .map((year, index) => (
        <div
          key={index}
          className={styles.option}
          onClick={() => handleYearChange(year)}
        >
          {year}년
        </div>
      ));
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    if (year && newMonth && day) {
      setSelectedBirth(
        `${year}${String(newMonth).padStart(2, "0")}${String(day).padStart(
          2,
          "0"
        )}`
      );
    }

    closeDropdown();
    if (day == "") {
      toggleDropdown("day");
    }
  };

  const renderMonthOptions = () => {
    const months = Array.from(
      { length: year === currentYear ? currentMonth : 12 },
      (_, i) => i + 1
    );
    return months.map((month) => (
      <div
        key={month}
        className={styles.option}
        onClick={() => handleMonthChange(month)}
      >
        {month}월
      </div>
    ));
  };

  const handleDayChange = (newDay) => {
    setDay(newDay);
    if (year && month && newDay) {
      let tempBirth = `${year}${String(month).padStart(2, "0")}${String(
        newDay
      ).padStart(2, "0")}`;
      if (currentMonth < 10) {
        currentMonth = "0" + currentMonth.toString();
      }
      let thisDay =
        currentYear.toString() +
        currentMonth.toString() +
        currentDay.toString();

      if (tempBirth <= thisDay) {
        setSelectedBirth(tempBirth);
      }
    }

    closeDropdown();
  };

  const renderDayOptions = () => {
    const days = Array.from(
      {
        length:
          year === currentYear && month === currentMonth
            ? currentDay
            : dayjs(`${year}-${month}`).daysInMonth(),
      },
      (_, i) => i + 1
    );

    return days.map((day) => (
      <div
        key={day}
        className={styles.option}
        onClick={() => handleDayChange(day)}
      >
        {day}일
      </div>
    ));
  };

  const dontKnowToggle = () => {
    setBirthDontKnow((prev) => !prev);
    if (!birthDontKnow) {
      setYear("");
      setMonth("");
      setDay("");
      setSelectedBirth("");
    }
  };

  useEffect(() => {
    // birthDontKnow가 true인 경우 nextPossible을 true로 설정
    if (birthDontKnow) {
      setNextPossible(true);
    } else if (!year || !month || !day) {
      setNextPossible(false);
    } else {
      setNextPossible(true);
    }
  }, [birthDontKnow, year, month, day, setNextPossible]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>생일을 알려주세요</h1>
      <div className={styles.birth_wrapper}>
        <div
          className={`${styles.custom_select} ${styles.year_select} ${
            birthDontKnow ? styles.disabled : ""
          }`}
        >
          <div
            className={styles.selected_option}
            onClick={() => toggleDropdown("year")}
          >
            {year ? `${year}년` : "년"}
            <TbTriangleInvertedFilled className={styles.dropdown_icon} />
          </div>
          <div
            className={`${styles.options} ${dropdown.year ? styles.show : ""}`}
          >
            {renderYearOptions()}
          </div>
        </div>
        <div
          className={`${styles.custom_select} ${styles.month_day_select} ${
            birthDontKnow || !year ? styles.disabled : ""
          }`}
        >
          <div
            className={styles.selected_option}
            onClick={() => toggleDropdown("month")}
          >
            {month ? `${month}월` : "월"}
            <TbTriangleInvertedFilled className={styles.dropdown_icon} />
          </div>
          <div
            className={`${styles.options} ${dropdown.month ? styles.show : ""}`}
          >
            {renderMonthOptions()}
          </div>
        </div>
        <div
          className={`${styles.custom_select} ${styles.month_day_select} ${
            birthDontKnow || !month ? styles.disabled : ""
          }`}
        >
          <div
            className={styles.selected_option}
            onClick={() => toggleDropdown("day")}
          >
            {day ? `${day}일` : "일"}
            <TbTriangleInvertedFilled className={styles.dropdown_icon} />
          </div>
          <div
            className={`${styles.options} ${dropdown.day ? styles.show : ""}`}
          >
            {renderDayOptions()}
          </div>
        </div>
      </div>
      <div className={styles.dontknowbirth_wrapper}>
        <span className={styles.dontknowbirth_text}>생일을 몰라요 </span>
        <input
          className={styles.dontknowbirth_checkbox}
          type="checkbox"
          onChange={dontKnowToggle}
          checked={birthDontKnow}
        />
      </div>
    </div>
  );
};

export default AnimalBirth;
