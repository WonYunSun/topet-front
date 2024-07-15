import React, { useState, useEffect } from 'react';
import years from '../../data/year';
import dayjs from 'dayjs';

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
                    {year}
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
                {month}
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
            <option key={day} value={day}>
                {day}
            </option>
        ));
    };

    const dontKnowToggle = () => {
        if (birthDontKnow) {
            setBirthDontKnow(false);
            setNextPossible(false);
        } else {
            setBirthDontKnow(true);
            setNextPossible(true);
            setYear('');
            setMonth('');
            setDay('');
            setSelectedBirth('');
        }
    }

    return (
        <div>
            <h1>반려동물의 생일을 알려주세요</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <select value={year} onChange={handleYearChange} disabled={birthDontKnow}>
                    <option value="">{(year === '') ? '년' : year}</option>
                    {renderYearOptions()}
                </select>
                <span>년</span>
                <select value={month} onChange={handleMonthChange} disabled={!year || birthDontKnow}>
                    <option value="">{(month === '') ? '월' : month}</option>
                    {renderMonthOptions()}
                </select>
                <span>월</span>
                <select value={day} onChange={handleDayChange} disabled={!month || birthDontKnow}>
                    <option value="">{(day === '') ? '일' : day}</option>
                    {renderDayOptions()}
                </select>
                <span>일</span>

                <span style={{ marginLeft: '30px' }}>생일을 몰라요 </span>
                <input type='checkbox' onChange={dontKnowToggle} checked={birthDontKnow} />
            </div>
        </div>
    );
};

export default AnimalBirth;
