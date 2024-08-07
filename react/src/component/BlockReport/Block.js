import React, { useState } from 'react';
import RadioButton from './RadioButton';
import Button from '../ButtonComp/Button';
import styles from '../../css/report.module.css';

const Block = ({onClick, comid, reduxMemberId}) => {
  const [selectedValue, setSelectedValue] = useState('이 게시물만 차단');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const handleCancel = () => {
    onClick();
    console.log("취소 버튼 클릭");
  };

  const handleSubmit = () => {
    console.log("전송 버튼 클릭, 선택된 값:", selectedValue);
  };

  return (
    <div className={styles.reportContainer}>
      <RadioButton
        label="이 게시물만 차단"
        value="이 게시물만 차단"
        checked={selectedValue === '이 게시물만 차단'}
        onChange={handleChange}
      />
      <RadioButton
        label="사용자 차단"
        value="사용자 차단"
        checked={selectedValue === '사용자 차단'}
        onChange={handleChange}
      />
      
      <div className={styles.buttonContainer}>
        <Button text="취소" btnstyle="white" onClick={handleCancel} />
        <Button text="전송" btnstyle="white" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Block;
