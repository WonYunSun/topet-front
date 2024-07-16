import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import { fetchCommunityPosts } from '../../api/baseURLs';
import { BsChatFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";

const animalTypeMap = { '강아지': 'dog', '고양이': 'cat', '특수동물': 'exoticpet' };
const categoryMap = { 'freedomAndDaily': '자유/일상', 'curious': '궁금해요', 'sharingInformation': '정보공유' };

const CommunityList = ({ selectedAnimal }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [communityPosts, setCommunityPosts] = useState([]);
  const [currentAnimalType, setCurrentAnimalType] = useState(animalTypeMap[selectedAnimal] || 'dog');
  const [currentCategory, setCurrentCategory] = useState(categoryMap[category] || '자유/일상');

  useEffect(() => {
    setCurrentAnimalType(animalTypeMap[selectedAnimal] || 'dog');
    setCurrentCategory(categoryMap[category] || '자유/일상');
  }, [selectedAnimal, category]);

  const fetchPosts = async () => {
    try {
      const newPosts = await fetchCommunityPosts(currentAnimalType, currentCategory);
      setCommunityPosts(newPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
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
        {communityPosts.map((item, index) => (
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
