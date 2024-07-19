// src/components/CommunityList.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import CommunityApi from '../../api/communityApi';
import { FaSpinner } from "react-icons/fa";
import CheckModal from '../../component/CheckModal';
import CommunityListData from './CommunityListData'; // CommunityPost 컴포넌트를 import 합니다.

const animalTypeMap = { '강아지': 'dog', '고양이': 'cat', '특수동물': 'exoticpet' };
const categoryMap = { 'freedomAndDaily': '자유/일상', 'curious': '궁금해요', 'sharingInformation': '정보공유' };

const CommunityList = ({ selectedAnimal }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [communityPosts, setCommunityPosts] = useState([]);
  const [currentAnimalType, setCurrentAnimalType] = useState(animalTypeMap[selectedAnimal] || 'dog');
  const [currentCategory, setCurrentCategory] = useState(categoryMap[category] || '자유/일상');
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    setCurrentAnimalType(animalTypeMap[selectedAnimal] || 'dog');
    setCurrentCategory(categoryMap[category] || '자유/일상');
  }, [selectedAnimal, category]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const newPosts = await CommunityApi.fetchCommunityPosts(currentAnimalType, category);
      setCommunityPosts(newPosts);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCommunityPosts([]);
    fetchPosts();
  }, [currentAnimalType, currentCategory]);

  const handleCategoryChange = newCategory => {
    navigate(`/community/preview/${currentAnimalType}/${newCategory}`, { replace: true });
  };

  const handlePostClick = async (comid) => {
    try {
      await CommunityApi.fetchCommunityDetail(comid);
      navigate(`/api/community/detail/${comid}`);
    } catch (error) {
      if (error.message.includes('404')) {
        setModalMessage('게시물이 없습니다.');
      } else {
        setModalMessage('게시물을 불러오는 데 실패했습니다.');
      }
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className={styles.category_buttons_area}>
        <button className={styles.category_button} onClick={() => handleCategoryChange('freedomAndDaily')} disabled={category === 'freedomAndDaily'}>#자유/일상</button>
        <button className={styles.category_button} onClick={() => handleCategoryChange('curious')} disabled={category === 'curious'}>#궁금해요</button>
        <button className={styles.category_button} onClick={() => handleCategoryChange('sharingInformation')} disabled={category === 'sharingInformation'}>#정보공유</button>
      </div>

      <div className={styles.category_text}>
        #{currentCategory}
      </div>

      <div className={styles.communities_content_area}>
        {loading && (
          <div className={styles.loading}>
            <FaSpinner className={styles.spinner} />
          </div>
        )}
        {error && !loading && (
          <div className={styles.error_message}>
            게시물을 불러오는 중 오류가 발생했습니다<br />
            다시 시도 해주세요.
          </div>
        )}
        {!loading && !error && communityPosts.length === 0 && (
          <div className={styles.no_posts_message}>
            게시물이 없습니다.
          </div>
        )}
        {!loading && !error && communityPosts.length > 0 && communityPosts.map((item, index) => (
          <CommunityListData 
            key={item.id} 
            item={item} 
            onClick={() => handlePostClick(item.id)} 
          />
        ))}
      </div>

      {modalIsOpen && (
        <CheckModal
          onClose={closeModal}
          Content={modalMessage}
          oneBtn={true}
        />
      )}
    </div>
  );
};

export default CommunityList;
