import React, { useState } from 'react';
import styles from '../../css/CommentCreate.module.css';
import commentApi from '../../api/commentApi';
import { useSelector } from 'react-redux';

const CommentCreate = ({ type, comid, onCommentSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [submitCheck, setSubmitCheck] = useState(false);

  const reduxMemberId = useSelector((state) => state.member.member.id);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (submitCheck || !inputValue.trim()) return;
    setSubmitCheck(true);

    const formData = new FormData();
    formData.append("content", inputValue.trim());
    formData.append("author", reduxMemberId);
    if (type === "community") {
      formData.append("community", comid);
    }
    if (type === "shorts") {
      formData.append("shorts", comid);
    }

    try {
      await commentApi.postComment(comid, formData);
      setInputValue('');
      onCommentSubmit();
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    } finally {
      setSubmitCheck(false);
    }
  };

  return (
    <div className={`${styles.commentContainer} ${isFocused ? styles.focused : ''}`}>
      <textarea
        className={styles.textarea}
        placeholder="댓글을 남겨보세요"
        onChange={handleInputChange}
        value={inputValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      ></textarea>
      <button className={styles.button} onClick={handleCommentSubmit} disabled={submitCheck || !inputValue.trim()}>
        등록
      </button>
    </div>
  );
};

export default CommentCreate;
