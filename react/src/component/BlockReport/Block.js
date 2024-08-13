import React, { useState } from 'react';
import RadioButton from './RadioButton';
import Button from '../ButtonComp/Button';
import styles from '../../css/report.module.css';
import ReportAndBlock from '../../api/reportAndBlockApi';

const Block = ({onClick, blockerId, blockedId, setModalIsOpen, setModalMessage}) => {
  const [selectedValue, setSelectedValue] = useState('이 사용자 차단');


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const handleCancel = () => {
    onClick();
    console.log("취소 버튼 클릭");
  };

  const handleSubmit = async () => {
    try {
      await ReportAndBlock.BlockUser(blockerId, blockedId);
      setModalMessage("차단 되었습니다.");
    } catch (error) {
      console.error("차단에 실패했습니다.", error);
      setModalMessage("차단에 실패했습니다.");
    } finally {
      setModalIsOpen(true);
      onClick();
    }
  };


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
