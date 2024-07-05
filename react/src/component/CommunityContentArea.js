import React from 'react';
import CommunityPreview from './CommunityPreview';
import styles from '../css/communityContentArea.module.css';
import { dog_community_dummy_data } from '../dummydata/community_dummy_data';

const CommunityContentArea = () => {
  // 20개의 CommunityPreview를 생성합니다.
  const previews = dog_community_dummy_data.freedomAndDaily.map((item) => (
    <CommunityPreview key={item.id} data={item} />
  ));

  return <div className={styles.community_content_area}>{previews}</div>;
};

export default CommunityContentArea;
