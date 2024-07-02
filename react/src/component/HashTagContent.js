import React, { useState } from 'react';

const HashTagContent = ({ onComplete }) => {
  const [requiredTag, setRequiredTag] = useState('');
  const [optionalTags, setOptionalTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleRequiredTagClick = (tag) => {
    setRequiredTag(tag);
  };

  const handleRegisterTag = () => {
    if (inputValue && !optionalTags.includes(inputValue)) {
      setOptionalTags([...optionalTags, inputValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/#/g, '');
    setInputValue(value);
  };

  const handleComplete = () => {
    onComplete(requiredTag, optionalTags);
  };

  return (
    <div className="hashtag-content">
      <div className="hashtag-title">필수 태그(1개만 선택해 주세요)</div>
      <div className="hashtag-buttons">
        <button className={`hashtag-button ${requiredTag === '자유/일상' ? 'selected' : ''}`} onClick={() => handleRequiredTagClick('자유/일상')}>#자유/일상</button>
        <button className={`hashtag-button ${requiredTag === '궁금해요' ? 'selected' : ''}`} onClick={() => handleRequiredTagClick('궁금해요')}>#궁금해요</button>
        <button className={`hashtag-button ${requiredTag === '정보공유' ? 'selected' : ''}`} onClick={() => handleRequiredTagClick('정보공유')}>#정보공유</button>
      </div>

      <div className="hashtag-subtitle">선택 태그</div>
      <div className="hashtag-input-container">
        <input className="hashtag-input" value={inputValue} onChange={handleInputChange} placeholder="태그를 입력해 주세요" />
        <button className="register-button" onClick={handleRegisterTag}>등록</button>
      </div>
      <div className="selected-tags">
        {optionalTags.map(tag => (
          <span className='tag' key={tag}>#{tag}</span>
        ))}
      </div>
      
      <button className="complete-button" onClick={handleComplete}>완료</button>
    </div>
  );
}

export default HashTagContent
