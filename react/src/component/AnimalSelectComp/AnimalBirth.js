import React, { useState, useEffect } from 'react';
import years from '../../data/year';
import dayjs from 'dayjs';
import styles from '../../css/animal_birth.module.css';

const AnimalBirth = ({ year, month, day, setYear, setMonth, setDay, selectedBirth, setSelectedBirth, setNextPossible, birthDontKnow, setBirthDontKnow }) => {
    const today = dayjs(); // 현재 날짜를 가져옵니다
    const currentYear = today.year();
    let currentMonth = today.month() + 1; // month는 0부터 시작하므로 1을 더합니다
    const currentDay = today.date();
    if(birthDontKnow == true){
        setNextPossible(true);
    }
    useEffect(() => {
        if (year && month && day) {
            setSelectedBirth(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`);
        }
    }, [year, month, day, setSelectedBirth]);

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setYear(newYear);

        if (newYear && month && day) {
            setSelectedBirth(`${newYear}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`);
        }
    };

    const renderYearOptions = () => {
    return years
        .filter((year) => year <= currentYear)
        .sort((a, b) => b - a)
        .map((year, index) => (
            <option key={index} value={year}>
                {year}년
            </option>
        ));
};

    const handleMonthChange = (e) => {
        const newMonth = e.target.value;
        setMonth(newMonth);
        if (year && newMonth && day) {
            setSelectedBirth(`${year}${String(newMonth).padStart(2, '0')}${String(day).padStart(2, '0')}`);
        }
    };

    const renderMonthOptions = () => {
        const months = Array.from({ length: year == currentYear ? currentMonth : 12 }, (_, i) => i + 1);
        return months.map((month) => (
            <option key={month} value={month}>
                {month}월
            </option>
        ));
    };

    const handleDayChange = (e) => {
        const newDay = e.target.value;
        setDay(newDay);
        if (year && month && newDay) {
            let tempBirth = `${year}${String(month).padStart(2, '0')}${String(newDay).padStart(2, '0')}`;
            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth.toString();
            }
            let thisDay = currentYear.toString() + currentMonth.toString() + currentDay.toString();

            if (tempBirth <= thisDay) { //오늘보다 tempBirth가 작으면 가능, 아니면 불가능
                setNextPossible(true);
                setSelectedBirth(tempBirth);
            }
        }
    };

    const renderDayOptions = () => {
        const days = Array.from(
            { length: (year == currentYear && month == currentMonth) ? currentDay : dayjs(`${year}-${month}`).daysInMonth() },
            (_, i) => i + 1
        );

        return days.map((day) => (
            <option key={day} value={day} disabled={day === ''}>
                {day}일
            </option>
        ));
    };

    const dontKnowToggle = () => {
        /*if (birthDontKnow) {
            setBirthDontKnow(false);
            setNextPossible(false);
        } else {
            setBirthDontKnow(true);
            setNextPossible(true);
            setYear('');
            setMonth('');
            setDay('');
            setSelectedBirth('');
        } */

            setBirthDontKnow(prev => !prev);
            setNextPossible(!birthDontKnow);
        
            if (!birthDontKnow) {
                setYear('');
                setMonth('');
                setDay('');
                setSelectedBirth('');
            }
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>생일을 알려주세요</h1>
            <div className={styles.birth_wrapper}>
                <div className={styles.year_wrapper}>
                <select className={styles.birth_select} value={year} onChange={handleYearChange} disabled={birthDontKnow}>
                    <option className={styles.birth_select_option} value="">{(year === '') ? currentYear + '년' : year}</option>
                    {renderYearOptions()}
                </select>
                </div>
                <div className={styles.month_day_wrapper}>
                <select className={styles.birth_select} value={month} onChange={handleMonthChange} disabled={!year || birthDontKnow}>
                    <option value="">{(month === '') ? currentMonth + '월' : month}</option>
                    {renderMonthOptions()}
                </select>
                </div>
                <div className={styles.month_day_wrapper}>
                <select className={styles.birth_select} value={day} onChange={handleDayChange} disabled={!month || birthDontKnow}>
                    <option value="">{(day === '') ? currentDay + '일' : day}</option>
                    {renderDayOptions()}
                </select>
                </div>
            </div>
            <div className={styles.dontknowbirth_wrapper}>
                    <span className={styles.dontknowbirth_text}>생일을 몰라요 </span>
                    <input className={styles.dontknowbirth_checkbox} type='checkbox' onChange={dontKnowToggle} checked={birthDontKnow} />
            </div>
        </div>
    );
};

export default AnimalBirth;
