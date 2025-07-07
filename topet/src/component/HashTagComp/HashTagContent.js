import React, { useState, useEffect } from 'react';
import styles from '../../css/HashTagContent.module.css';

const HashTagContent = ({ show, initialSelectedCategory, initialSelectedHashTag, handleCompleteTags }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [requiredTag, setRequiredTag] = useState('');

  const predefinedTags = ['자유/일상', '궁금해요', '정보공유'];

  useEffect(() => {
    if (show) {
      setRequiredTag(initialSelectedCategory || '자유/일상');
      setSelectedTags(initialSelectedHashTag || []);
    } else {
      setRequiredTag('');
      setSelectedTags([]);
      setInputValue('');
    }
  }, [show, initialSelectedCategory, initialSelectedHashTag]);

  useEffect(()=>{},[
    selectedTags
  ])

  const handlePredefinedTagClick = (tag) => {
    setRequiredTag(tag);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎ]/g, ''); // 한글, 한글 초성, 영어 대소문자, 숫자 이외의 모든 문자 제거
    setInputValue(value);
  };
  

  const handleTagSubmit = () => {
    if (inputValue && !selectedTags.includes(inputValue)) {
      setSelectedTags([...selectedTags, inputValue]);
      setInputValue('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleComplete = () => {
    handleCompleteTags(requiredTag, selectedTags);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>필수 태그 (1개만 선택해 주세요)</div>
      <div className={styles.buttonContainer}>
        {predefinedTags.map((tag, index) => (
          <button
            key={index}
            className={requiredTag === tag ? styles.selectedButton : styles.button}
            onClick={() => handlePredefinedTagClick(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className={styles.title}>선택 태그</div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="태그를 입력해 주세요"
        />
        <button className={styles.submitButton} onClick={handleTagSubmit}>
          등록
        </button>
      </div>

      <div className={styles.selectedTagsContainer}>
        {requiredTag && <span className={styles.tag}>#{requiredTag}</span>}
        {selectedTags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag.tag == null ?(<div>#{tag}</div>):(<div>#{tag.tag}</div>) }
            <button className={styles.removeButton} onClick={() => handleTagRemove(tag)}>x</button>
          </span>
        ))}
      </div>

      <button className={styles.completeButton} onClick={handleComplete}>완료</button>
    </div>
  );
};

export default HashTagContent;
