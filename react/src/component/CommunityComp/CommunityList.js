import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import { fetchCommunityPosts } from '../../api/baseURLs';

const CommunityList = ({ selectedAnimal }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [communityPosts, setCommunityPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const OFFSET = useRef(0);
  const observer = useRef();
  const LIMIT = 20;

  const animalTypeMap = { '강아지': 'dog', '고양이': 'cat', '특수동물': 'exoticpet' };
  const categoryMap = { 'freedomAndDaily': '#자유/일상', 'curious': '#궁금해요', 'sharingInformation': '#정보공유' };
  const currentAnimalType = animalTypeMap[selectedAnimal] || 'dog';
  const currentCategory = categoryMap[category] || '자유/일상';

  const fetchPosts = async (reset = false) => {
    const newPosts = await fetchCommunityPosts(currentAnimalType, category, LIMIT, OFFSET.current);
    setCommunityPosts(prevPosts => reset ? newPosts : [...prevPosts, ...newPosts]);
    OFFSET.current += LIMIT;
    if (newPosts.length < LIMIT) setHasMore(false);
  };

  useEffect(() => {
    OFFSET.current = 0;
    setCommunityPosts([]);
    setHasMore(true);
    fetchPosts(true);
  }, [selectedAnimal, category]);

  const handleCategoryChange = newCategory => {
    navigate(`/community/community/${currentAnimalType}/${newCategory}`, { replace: true });
    setCommunityPosts([]);
    OFFSET.current = 0;
    setHasMore(true);
  };

  const handlePostClick = comid => {
    navigate(`/api/community/community/${comid}`);
  };

  const lastPostElementRef = node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchPosts();
      }
    });
    if (node) observer.current.observe(node);
  };

  const formatHashtags = hashtagString => {
    const tags = hashtagString.split(',')
      .map(tag => tag.trim().replace(/^\d+/, '')) // 문자열 시작 부분의 숫자를 제거
      .filter(tag => tag !== ''); // 빈 문자열 제거
  
    const visibleTags = tags.slice(0, 3); // 처음 3개의 해시태그만 표시
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
        {currentCategory}
      </div>

      <div className={styles.communities_content_area}>
        {communityPosts.map((item, index) => (
          <div
            key={item.comid}
            onClick={() => handlePostClick(item.comid)}
            ref={communityPosts.length === index + 1 ? lastPostElementRef : null}
          >
            <div className={styles.each_community_area}>
         
              <div className={styles.titleContentHashWrap}>
                <div className={styles.community_title}>{item.title}</div>
                <div className={styles.community_content}>{item.content}</div>
                <div className={styles.community_hashtags}>{formatHashtags(item.hashtag)}</div>
              </div>
              <div className={styles.content_and_photo_area}>
                {item.photos && item.photos.length > 0 && (
                  <div className={styles.community_photo}>
                    <img src={item.photos[0]} alt="community" />
                  </div>
                )}
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
