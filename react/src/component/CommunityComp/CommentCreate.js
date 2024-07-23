import React, { useState } from 'react';
import styles from '../../css/CommentCreate.module.css';
import CommunityApi from '../../api/communityApi';

const CommentCreate = ({ comid }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const formData = new FormData();
    formData.append("content", inputValue);
    
    try {
      await CommunityApi.postComment(comid, formData);
      setInputValue('');
    } catch (error) {
      console.error("댓글 등록 실패:", error);
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
      <button className={styles.button} onClick={handleCommentSubmit}>등록</button>
    </div>
  );
};

export default CommentCreate;
