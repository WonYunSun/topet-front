import React, { useState } from 'react';
import RadioButton from './RadioButton';
import Button from '../ButtonComp/Button';
import styles from '../../css/report.module.css';
import ReportAndBlock from '../../api/reportAndBlockApi';

const Report = ({ onClick, comid, commentId, replyId, genre, setModalIsOpen, setModalMessage }) => {
  const [selectedValue, setSelectedValue] = useState('스팸홍보/도배글');
  const [otherText, setOtherText] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value !== '기타') {
      setOtherText('');
    }
  };

  const handleOtherTextChange = (event) => {
    setOtherText(event.target.value);
  };

  const handleCancel = () => {
    onClick();
    console.log("취소 버튼 클릭");
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const reportValue = selectedValue === '기타' ? otherText : selectedValue;
    formData.append("reason", reportValue);
    
    if (genre === "게시글") {
        console.log("게시글 신고");
        await ReportAndBlock.ReportCommunity(formData, comid);
    } else if (genre === "댓글") {
        if (commentId === null && replyId !== null) {
            // 댓글이 null이면서 답글 ID가 있을 때
            console.log("답글 신고");
            await ReportAndBlock.ReportComment(formData, replyId);
        } else if (commentId !== null && replyId === null) {
            // 댓글 ID가 있고 답글 ID가 null일 때
            console.log("댓글 신고");
            await ReportAndBlock.ReportComment(formData, commentId);
        }
    }
    onClick();
};

console.log("댓글ID : ", commentId)
console.log("답글ID : ", replyId)

  return (
    <div className={styles.reportContainer}>
      <RadioButton
        label="스팸홍보/도배글"
        value="스팸홍보/도배글"
        checked={selectedValue === '스팸홍보/도배글'}
        onChange={handleChange}
      />
      <RadioButton
        label="음란물"
        value="음란물"
        checked={selectedValue === '음란물'}
        onChange={handleChange}
      />
      <RadioButton
        label="불법정보 포함"
        value="불법정보 포함"
        checked={selectedValue === '불법정보 포함'}
        onChange={handleChange}
      />
      <RadioButton
        label="욕설/혐오/차별적 표현"
        value="욕설/혐오/차별적 표현"
        checked={selectedValue === '욕설/혐오/차별적 표현'}
        onChange={handleChange}
      />
      <RadioButton
        label="개인정보 노출"
        value="개인정보 노출"
        checked={selectedValue === '개인정보 노출'}
        onChange={handleChange}
      />
      <RadioButton
        label="불쾌한 표현"
        value="불쾌한 표현"
        checked={selectedValue === '불쾌한 표현'}
        onChange={handleChange}
      />
      <RadioButton
        label="기타"
        value="기타"
        checked={selectedValue === '기타'}
        onChange={handleChange}
      />

      {selectedValue === '기타' && (
        <input
          type="text"
          className={styles.otherInput}
          value={otherText}
          onChange={handleOtherTextChange}
          placeholder="기타 사유를 입력하세요"
        />
      )}
      
      <div className={styles.buttonContainer}>
        <Button text="취소" btnstyle="white" onClick={handleCancel} />
        <Button text="전송" btnstyle="white" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Report;
