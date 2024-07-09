import React, { useState, useEffect } from 'react';
import CommunityListData from './CommunityListData';
import styles from '../css/communityList.module.css';
import { 
  dog_community_dummy_data, 
  cat_community_dummy_data, 
  exoticpet_community_dummy_data 
} from '../dummydata/community_dummy_data';

const CommunityList = ({ selectedAnimal }) => {
  const [currentData, setCurrentData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState('freedomAndDaily');

  useEffect(() => {
    let data;
    switch (selectedAnimal) {
      case '강아지':
        data = dog_community_dummy_data;
        break;
      case '고양이':
        data = cat_community_dummy_data;
        break;
      case '특수동물':
        data = exoticpet_community_dummy_data;
        break;
      default:
        data = dog_community_dummy_data;
    }
    setCurrentData(data);
    setFilteredData(data.freedomAndDaily || []);
  }, [selectedAnimal]);

  useEffect(() => {
    if (currentData && currentData[category]) {
      setFilteredData(currentData[category]);
    } else {
      setFilteredData([]);
    }
  }, [category, currentData]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleCategoryChange('freedomAndDaily')}>자유/일상</button>
        <button onClick={() => handleCategoryChange('curious')}>궁금해요</button>
        <button onClick={() => handleCategoryChange('sharingInformation')}>정보공유</button>
      </div>
      <div className={styles.community_content_area}>
        {filteredData.map((item) => (
          <CommunityListData key={item.comid} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
