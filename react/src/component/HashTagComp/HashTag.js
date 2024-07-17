import React from 'react';
import styles from '../../css/HashTag.module.css';

const HashTag = ({ selectedCategory, selectedHashTag, handleBottomSheetOpen }) => {
  return (
    <div>
    <div className={styles.hashtag_guide_text}>태그 (1개 이상 선택해 주세요)</div>
    <div className={styles.tagContainer}>
      {selectedCategory && <span className={styles.tag}>#{selectedCategory}</span>}
      {selectedHashTag && selectedHashTag.length > 0 && selectedHashTag.map((tag, index) => (
        <span key={index} className={styles.tag}>#{tag}</span>
      ))}
      <button className={styles.button} onClick={() => handleBottomSheetOpen('tag')}>+선택하기</button>
    </div>
    </div>
  );
};

export default HashTag;