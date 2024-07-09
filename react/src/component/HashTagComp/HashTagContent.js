import React, { useState, useEffect } from 'react';
import '../../css/hashtag.css';

const HashTagContent = ({ onComplete, initialTags }) => {
  const [requiredTag, setRequiredTag] = useState('');
  const [optionalTags, setOptionalTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (initialTags.length > 0) {
      setRequiredTag(initialTags[0]);
    } else {
      setRequiredTag('자유/일상');
    }
  }, []);

  useEffect(() => {
    if (initialTags.length > 1) {
      setOptionalTags(initialTags.slice(1));
    } else {
      setOptionalTags([]);
    }
  }, [initialTags]);

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

  const handleRemoveTag = (tagToRemove) => {
    setOptionalTags(optionalTags.filter(tag => tag !== tagToRemove));
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
        {requiredTag && <div className='tag'>#{requiredTag}</div>}
        {optionalTags.map(tag => (
          <div className='tag' key={tag}>
            #{tag}
            <div className='hashtag-remove-button'><button onClick={() => handleRemoveTag(tag)}>x</button></div>
          </div>
        ))}
      </div>

      <button className="complete-button" onClick={handleComplete}>완료</button>
    </div>
  );
};

export default HashTagContent;
