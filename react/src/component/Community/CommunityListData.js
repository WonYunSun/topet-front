import React from 'react';
import styles from '../../css/communityListData.module.css';
import CommunityList from '../Community/CommunityList';

const CommunityListData = ({ data }) => {

  
  const formatHashtags = (hashtagString) => {
    // 쉼표로 분리
    const tags = hashtagString.split(',');
    // 숫자 부분 제거 후 나머지에 #을 붙여서 배열로 변환
    const formattedTags = tags
      .filter(tag => isNaN(tag)) // 숫자가 아닌 값만 필터링
      .map(tag => `#${tag}`);
    return formattedTags.join(' '); // 배열을 문자열로 변환
  };

  return (
    <div className={styles.community_preview}>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
      <p>{formatHashtags(data.hashtag)}</p>
    </div>
  );
};

export default CommunityListData;
