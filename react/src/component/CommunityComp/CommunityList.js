import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import CommunityApi from '../../api/communityApi';
import CheckModal from '../../component/CheckModal';
import CommunityListData from './CommunityListData';
import { FaSpinner } from "react-icons/fa";

const animalTypeMap = { '강아지': 'dog', '고양이': 'cat', '특수동물': 'exoticpet' };
const categoryMap = { 'freedomAndDaily': '자유/일상', 'curious': '궁금해요', 'sharingInformation': '정보공유' };

const CommunityList = ({ selectedAnimal, sortListText }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [communityPosts, setCommunityPosts] = useState([]);
  const [currentAnimalType, setCurrentAnimalType] = useState(animalTypeMap[selectedAnimal] || 'dog');
  const [currentCategory, setCurrentCategory] = useState(categoryMap[category] || '자유/일상');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const page = useRef(0);
  const observer = useRef();
  const size = 20;

  useEffect(() => {
    setCurrentAnimalType(animalTypeMap[selectedAnimal] || 'dog');
    setCurrentCategory(categoryMap[category] || '자유/일상');
  }, [selectedAnimal, category]);

  const fetchPosts = async (reset = false) => {
    if (loading) return; // 이미 로딩 중이면 중복 호출 방지
    setLoading(true);
    try {
      const newPosts = sortListText === "최신순"
        ? await CommunityApi.fetchCommunityPosts(currentAnimalType, category, size, page.current)
        : await CommunityApi.fetchSortLikeCommunityPosts(currentAnimalType, category, size, page.current);

      console.log('Fetched posts:', newPosts);

      if (reset) {
        setCommunityPosts(newPosts);
      } else {
        setCommunityPosts(prevPosts => [...prevPosts, ...newPosts]);
      }

      if (newPosts.length < size) {
        setHasMore(false);
      }

      page.current += 1;
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
      if (entries[0].isIntersecting && hasMore && !loading) {
        console.log('Fetching more posts...');
        fetchPosts();
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div>
      <div className={styles.communities_content_area}>
        {loading && communityPosts.length === 0 && (
          <div className={styles.loading}>
            <FaSpinner className={styles.spinner} />
          </div>
        )}
        {error && !loading && communityPosts.length === 0 && (
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
        {communityPosts.length > 0 && communityPosts.map((item, index) => (
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
      {loading && communityPosts.length > 0 && (
        <div className={styles.loading_more}>
          <FaSpinner className={styles.spinner} />
        </div>
      )}
    </div>
  );
};

export default CommunityList;
