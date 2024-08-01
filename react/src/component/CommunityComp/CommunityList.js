import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import CommunityApi from '../../api/communityApi';
import { FaSpinner } from "react-icons/fa";
import CheckModal from '../../component/CheckModal';
import CommunityListData from './CommunityListData';

const animalTypeMap = { '강아지': 'dog', '고양이': 'cat', '특수동물': 'exoticpet' };
const categoryMap = { 'freedomAndDaily': '자유/일상', 'curious': '궁금해요', 'sharingInformation': '정보공유' };

const CommunityList = ({ selectedAnimal, sortListText }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [communityPosts, setCommunityPosts] = useState([]);
  const [currentAnimalType, setCurrentAnimalType] = useState(animalTypeMap[selectedAnimal] || 'dog');
  const [currentCategory, setCurrentCategory] = useState(categoryMap[category] || '자유/일상');
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(0);
  const observer = useRef();
  const size = 5;

  useEffect(() => {
    setCurrentAnimalType(animalTypeMap[selectedAnimal] || 'dog');
    setCurrentCategory(categoryMap[category] || '자유/일상');
  }, [selectedAnimal, category]);

  const fetchPosts = async (reset = false) => {
    setLoading(true);
    try {
      const newPosts = sortListText === "최신순"
        ? await CommunityApi.fetchCommunityPosts(currentAnimalType, category, size, page.current)
        : await CommunityApi.fetchSortLikeCommunityPosts(currentAnimalType, category, size, page.current);

      setCommunityPosts(prevPosts => reset ? newPosts : [...prevPosts, ...newPosts]);
      if (newPosts.length < size) {
        setHasMore(false);
      }
      setError(null);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    page.current = 0;
    setCommunityPosts([]);
    setHasMore(true);
    fetchPosts(true);
  }, [currentAnimalType, currentCategory, sortListText]);

  const handlePostClick = async (comid) => {
    try {
      await CommunityApi.fetchCommunityDetail(comid);
      navigate(`/community/detail/${comid}`);
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

  const lastPostElementRef = node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        page.current++;
        fetchPosts();
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div>
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
          <div
            key={item.id}
            onClick={() => handlePostClick(item.comid)}
            ref={communityPosts.length === index + 1 ? lastPostElementRef : null}
          >
            <CommunityListData 
              key={item.id} 
              item={item} 
              onClick={() => handlePostClick(item.id)} 
            />
          </div>
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
