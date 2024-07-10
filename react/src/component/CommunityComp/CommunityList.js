import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../css/communityList.module.css';
import { baseURLs } from '../../api/baseURLs';



const CommunityList = ({ selectedAnimal }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [communityPosts, setCommunityPosts] = useState([]);


  const animalTypeMap = { '강아지': 'dog', '고양이': 'cat', '특수동물': 'exoticpet' };
  const currentAnimalType = animalTypeMap[selectedAnimal] || 'dog';

  useEffect(() => {
    const fetchData = async (type, category) => {
      try {
        const response = await axios.get(`${baseURLs[type]}/${category}`);
        setCommunityPosts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData(currentAnimalType, category); 
  }, [selectedAnimal, category]);


  const handleCategoryChange = (newCategory) => {
    navigate(`/community/community/${currentAnimalType}/${newCategory}`, { replace: true });
    const fetchData = async (type, category) => {
      try {
        const response = await axios.get(`${baseURLs[type]}/${category}`);
        setCommunityPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(currentAnimalType, newCategory);
  };

  const formatHashtags = (hashtagString) => {
    const tags = hashtagString.split(',');
    const formattedTags = tags
      .filter(tag => isNaN(tag))
      .map(tag => `#${tag}`);
    return formattedTags.join(' ');
  };

  const handlePostClick = (comid) => {
    navigate(`/api/community/community/${comid}`);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleCategoryChange('freedomAndDaily')}>자유/일상</button>
        <button onClick={() => handleCategoryChange('curious')}>궁금해요</button>
        <button onClick={() => handleCategoryChange('sharingInformation')}>정보공유</button>
      </div>
      <div className={styles.community_content_area}>
        {communityPosts.map(item => (
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
