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
    const tags = hashtagString.split(',');
    const formattedTags = tags.filter(tag => isNaN(tag)).map(tag => `#${tag}`);
    return formattedTags.join(' ');
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

      <div className={styles.community_content_area}>
        {communityPosts.map((item, index) => (
          <div
            key={item.comid}
            onClick={() => handlePostClick(item.comid)}
            ref={communityPosts.length === index + 1 ? lastPostElementRef : null}
          >
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
