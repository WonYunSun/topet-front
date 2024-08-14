import React, { useState } from 'react';
import styles from '../../css/CommentCreate.module.css';
import commentApi from '../../api/commentApi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const CommentCreate = ({ type , comid, onCommentSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const reduxMemberId = useSelector((state) => state.member.member.id)
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const formData = new FormData();
    formData.append("content", inputValue);
    formData.append("author", reduxMemberId);
    if(type === "community"){
      formData.append("community", comid);
    }
    if(type === "shorts"){
      formData.append("shorts", comid);
    }
    
    try {
      await commentApi.postComment(comid, formData);
      setInputValue('');
      onCommentSubmit(); // 댓글 등록 후 부모 컴포넌트에 알림
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
