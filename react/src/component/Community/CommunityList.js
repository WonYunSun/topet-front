import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import { fetchCommunityPosts } from '../../api/baseURLs'; // 추가

const CommunityList = ({ selectedAnimal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState('freedomAndDaily');
  const animalTypeMap = { '강아지': 'dog', '고양이': 'cat', '특수동물': 'exoticpet' };
  const currentAnimalType = animalTypeMap[selectedAnimal] || 'dog';
  const communityPosts = useSelector(state => state.communityPosts);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCommunityPosts(currentAnimalType, 'freedomAndDaily')(dispatch);
      await fetchCommunityPosts(currentAnimalType, 'curious')(dispatch);
      await fetchCommunityPosts(currentAnimalType, 'sharingInformation')(dispatch);
    };
    fetchData();
  }, [selectedAnimal, dispatch, currentAnimalType]);

  const handleCategoryChange = (newCategory) => setCategory(newCategory);

  const getFilteredData = () => {
    const categoryKey = `${currentAnimalType}_community_${category}`;
    return communityPosts[categoryKey] || [];
  };

  const formatHashtags = (hashtagString) => {
    // 쉼표로 분리
    const tags = hashtagString.split(',');
    // 숫자 부분 제거 후 나머지에 #을 붙여서 배열로 변환
    const formattedTags = tags
      .filter(tag => isNaN(tag)) // 숫자가 아닌 값만 필터링
      .map(tag => `#${tag}`);
    return formattedTags.join(' '); // 배열을 문자열로 변환
  };

  const handlePostClick = (comid) => {
    navigate(`/api/community/community/${comid}`); // 게시물 페이지로 이동
  };

  return (
    <div>
      <div>
        <button onClick={() => handleCategoryChange('freedomAndDaily')}>자유/일상</button>
        <button onClick={() => handleCategoryChange('curious')}>궁금해요</button>
        <button onClick={() => handleCategoryChange('sharingInformation')}>정보공유</button>
      </div>
      <div className={styles.community_content_area}>
        {getFilteredData().map(item => (
          <div className={styles.community_preview} key={item.comid} onClick={() => handlePostClick(item.comid)}>
            <h3>{item.comid}</h3>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <p>{formatHashtags(item.hashtag)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
