import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TopBar from '../component/TopBar';
import styles from '../css/community_detail.module.css';
import { BsChatFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import CommunityApi from '../api/communityApi';
import CheckModal from '../component/CheckModal';
import CommentCreate from '../component/CommunityComp/CommentCreate';
import CommentList from '../component/CommunityComp/CommentList';
import EditDeleteBottomSheet from '../component/SubBottomSheet';

const CommunityDetail = () => {
  const navigate = useNavigate()

  const { comid } = useParams();
  const [item, setItem] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [profileImg, setProfileImg] = useState('https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MzBfNjUg%2FMDAxNzE3MDY0NDY1OTE5.RuUuUb2erFc8zs-8wC10KGxHyKOlSCxZM72R5K_PWCkg.7h8cC7tzZrwM8sIWQVuO1tjjpnTX013k2E5OKtE2dWYg.PNG%2Fimage.png&type=sc960_832');
  const [profileName, setProfileName] = useState("강아지");
  const [showSubBottomSheet, setShowSubBottomSheet] = useState(false);
  const [writer, setWriter] = useState(true); // 글 쓴 사람인지 아닌지, 나중에 로직 바꿔야 할 듯

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true);
      try {
        const detail = await CommunityApi.fetchCommunityDetail(comid);
        console.log("서버에서 받은 데이터:", detail); // 서버에서 받은 데이터를 콘솔에 출력
        setItem(detail);
        setLikes(detail.likeCount);

        if (detail.hashtag) {
          setHashtags(detail.hashtag.split(',').map(tag => tag.trim()));
        }

        setError(null);
      } catch (error) {
        setError(error.message);
        setModalMessage('게시물을 불러오는 데 실패했습니다.');
        setModalIsOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [comid]);

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(-1)
  };

  const toggleLike = () => {
    setIsLiked(prevState => !prevState);
    setLikes(prevCount => prevCount + (isLiked ? -1 : 1));
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <FaSpinner className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return (
      <>
        {modalIsOpen && (
          <CheckModal
            onClose={closeModal}
            Content={modalMessage}
            oneBtn={true}
          />
        )}
      </>
    );
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  const {animal, title, content, images, category, hashtag, photos, commentCount } = item;

  const navigateWithParams = () => {
    const params = {
      title: item.title,
      content: item.content,
      images: item.images,
      category : item.category,
      hashtag : item.hashtag,
      animal : item.animal,
      edit: true,
      comid: comid,
    };
    navigate(`/community/communitywrite`, { state: params });
  };

  const handleDeleteClick = async () => {
    try {
      await CommunityApi.deleteCommunity(comid);
      navigate(-1); // 삭제 성공 시 이전 페이지로 이동
    } catch (error) {
      setModalMessage('게시물 삭제에 실패했습니다.');
      setModalIsOpen(true);
    }
  };


  return (
    <div>
      <TopBar />
      <div className={styles.profile}>
        <img src={profileImg} alt='' className={styles.profileImg} />
        <div className={styles.profileDetails}>
          <div className={styles.profileName}>{profileName}</div>
        </div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
      {images && images.length > 0 && (
        <div className={styles.images_container}>
          {images.map((url, index) => (
            <img key={index} src={url} alt={`이미지 ${index + 1}`} />
          ))}
        </div>
      )}
      <div className={styles.hashtags}>
        {hashtags.map((hashtag, index) => (
          <span key={index} className={styles.hashtag}>#{hashtag}</span>
        ))}
      </div>

      <div className={styles.like_and_coment}>
        <div className="icon-group">
          <BiSolidLike 
            className={styles.icon} 
            onClick={toggleLike} 
            style={{ color: isLiked ? 'red' : 'gray', cursor: 'pointer' }}
          />
          <span> {likes}</span>
        </div>
        <div className="icon-group">
          <BsChatFill className={styles.icon}/>
          <span> {commentCount}</span>
        </div>
        <div className={styles.moreIconContainer}>
          <FiMoreVertical className={styles.moreIcon} onClick={() => setShowSubBottomSheet(true)} />
        </div>
      </div>

      <div className={styles.coment_area}>
        <CommentCreate comid={comid} />
        <CommentList comid={comid} />
      </div>

      {modalIsOpen && (
        <CheckModal
          onClose={closeModal}
          Content={modalMessage}
          oneBtn={true}
        />
      )}

      
      <EditDeleteBottomSheet 
        show={showSubBottomSheet}
        type={writer ? "CommunityEditDelete" : "CommunityReportBlock"}
        onClose={()=>setShowSubBottomSheet(false)}
        onEditClick={navigateWithParams}
        onDeleteClick={handleDeleteClick}
      />
      
    </div>
  );
};

export default CommunityDetail;
