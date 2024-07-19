import React, { useEffect, useState } from 'react';
import styles from '../../css/CommunityUserSearchRecord.module.css'; // CSS 파일 import

const CommunityUserSearchRecord = () => {
  const [searchRecord, setSearchRecord] = useState([]);

  useEffect(() => {
    setSearchRecord(["테스트 검색기록1", "테스트 검색기록2", "테스트 검색기록3"]);
  }, []);

  const handleDelete = (index) => {
    const newRecords = searchRecord.filter((_, i) => i !== index);
    setSearchRecord(newRecords);
  };

  return (
    <div className={styles.container}>
      {searchRecord.map((record, index) => (
        <div key={index} className={styles.recordItem}>
          <span className={styles.recordText}>{record}</span>
          <button className={styles.deleteButton} onClick={() => handleDelete(index)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default CommunityUserSearchRecord;
