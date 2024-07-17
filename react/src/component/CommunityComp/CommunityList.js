import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import CommunityApi from '../../api/communityApi';
import { BsChatFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";

const animalTypeMap = { '강아지': 'dog', '고양이': 'cat', '특수동물': 'exoticpet' };
const categoryMap = { 'freedomAndDaily': '자유/일상', 'curious': '궁금해요', 'sharingInformation': '정보공유' };

const CommunityList = ({ selectedAnimal }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [communityPosts, setCommunityPosts] = useState([]);
  const [currentAnimalType, setCurrentAnimalType] = useState(animalTypeMap[selectedAnimal] || 'dog');
  const [currentCategory, setCurrentCategory] = useState(categoryMap[category] || '자유/일상');
  const [error, setError] = useState(null); // 에러 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    setCurrentAnimalType(animalTypeMap[selectedAnimal] || 'dog');
    setCurrentCategory(categoryMap[category] || '자유/일상');
  }, [selectedAnimal, category]);

  const fetchPosts = async () => {
    setLoading(true); // 로딩 상태 시작
    try {
      const newPosts = await CommunityApi.fetchCommunityPosts(currentAnimalType, category);
      setCommunityPosts(newPosts);
      setError(null); // 성공적으로 데이터를 받아오면 에러 상태를 초기화합니다.
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setError(error.message); // 오류 메시지를 상태에 저장합니다.
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  useEffect(() => {
    setCommunityPosts([]);
    fetchPosts();
  }, [currentAnimalType, currentCategory]);

  const handleCategoryChange = newCategory => {
    navigate(`/community/preview/${currentAnimalType}/${newCategory}`, { replace: true });
  };

  const handlePostClick = comid => {
    navigate(`/api/community/detail/${comid}`);
  };

  const formatHashtags = hashtagString => {
    const tags = hashtagString.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    const visibleTags = tags.slice(0, 3);
    const remainingTagsCount = tags.length - visibleTags.length;

    return (
      <>
        {visibleTags.map((tag, index) => (
          <span key={index} className={styles.hashtag}>#{tag}</span>
        ))}
        {remainingTagsCount > 0 && (
          <span className={styles.hashtag}>+{remainingTagsCount}</span>
        )}
      </>
    );
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
            게시물을 불러오는 중 오류가 발생했습니다 새로고침 해주세요.
          </div>
        )}
        {!loading && !error && communityPosts.length === 0 && (
          <div className={styles.no_posts_message}>
            게시물이 없습니다.
          </div>
        )}
        {!loading && !error && communityPosts.length > 0 && communityPosts.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handlePostClick(item.id)}
          >
            <div className={styles.each_community_area}>
              <div className={styles.content_and_photo_container}>
                <div className={styles.titleContentWrap}>
                  <div className={styles.community_title}>{item.title}</div>
                  <div className={styles.community_content}>{item.content}</div>
                </div>
                {item.images && item.images.length > 0 && (
                  <div className={styles.community_photo}>
                    <img src={`/${item.images[0].filePath}`} alt={item.images[0].origFileName} />
                  </div>
                )}
              </div>
              <div className={styles.community_hashtags}>
                {formatHashtags(item.hashtag)}
              </div>
              <div className={styles.like_and_coment}>
                <div className="icon-group">
                  <BiSolidLike className={styles.icon}/>
                  <span> 10</span> {/* 여기 나중에 받아온 값으로 변경 */}
                </div>
                <div className="icon-group">
                  <BsChatFill className={styles.icon}/>
                  <span> 5</span> {/* 여기 나중에 받아온 값으로 변경 */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
