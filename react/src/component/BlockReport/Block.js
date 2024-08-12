import React, { useState } from 'react';
import RadioButton from './RadioButton';
import Button from '../ButtonComp/Button';
import styles from '../../css/report.module.css';
import ReportAndBlock from '../../api/reportAndBlockApi';

const Block = ({onClick, blockerId, blockedId}) => {
  const [selectedValue, setSelectedValue] = useState('이 사용자 차단');


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const handleCancel = () => {
    onClick();
    console.log("취소 버튼 클릭");
  };

  const handleSubmit = async () => {
    await ReportAndBlock.BlockUser(blockerId, blockedId);
  };

  console.log("차단하는 사람 : ",blockerId)
  console.log("차단 당하는 사람 : ",blockedId)

  return (
    <div className={styles.reportContainer}>
      <RadioButton
        label="이 사용자 차단"
        value=" 이 사용자 차단"
        checked={selectedValue === '이 사용자 차단'}
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
