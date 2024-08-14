import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../component/TopBar";
import styles from "../css/community_detail.module.css";
import { BsChatFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import CommunityApi from "../api/communityApi";
import CommunityLikesApi from "../api/communityLikesApi";
import CheckModal from "../component/CheckModal";
import CommentCreate from "../component/CommentComp/CommentCreate";
import CommentList from "../component/CommentComp/CommentList";
import EditDeleteBottomSheet from "../component/SubBottomSheet";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { comid } = useParams();
  const reduxMemberId = useSelector((state) => state.member.member);
  const [item, setItem] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [profileImg, setProfileImg] = useState(
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MzBfNjUg%2FMDAxNzE3MDY0NDY1OTE5.RuUuUb2erFc8zs-8wC10KGxHyKOlSCxZM72R5K_PWCkg.7h8cC7tzZrwM8sIWQVuO1tjjpnTX013k2E5OKtE2dWYg.PNG%2Fimage.png&type=sc960_832"
  );
  const [profileName, setProfileName] = useState();
  const [showSubBottomSheet, setShowSubBottomSheet] = useState(false);
  const [writer, setWriter] = useState(false); // 글 쓴 사람인지 아닌지 초기 값 false
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [commentListKey, setCommentListKey] = useState(0); // key 상태 추가
  const [communityAuthorId, setCommunityAuthorId] = useState();

  const fetchPostDetail = async () => {
    setLoading(true);
    try {
      const detail = await CommunityApi.fetchCommunityDetail(comid);
      console.log("게시물 디테일 : ", detail);
      const liked = await CommunityLikesApi.fetchLikedByCurrentUser(comid);

      setItem(detail);
      setLikes(detail.likeCount);
      setIsLiked(liked);
      setProfileName(detail.author.name);
      setCommunityAuthorId(detail.author.id);

      if (detail.hashtag) {
        setHashtags(detail.hashtag.split(",").map((tag) => tag.trim()));
      }

      // writer 상태 업데이트
      if (detail.author.id === reduxMemberId.id) {
        setWriter(true);
      } else {
        setWriter(false);
      }

      setError(null);
    } catch (error) {
      setError(error.message);
      setModalMessage("게시물을 불러오는 데 실패했습니다.");
      setModalIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [comid]);

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(-1);
  };

  const toggleLike = async () => {
    if (isLikeLoading) return;
    setIsLikeLoading(true);
    try {
      await CommunityLikesApi.postLike(comid);
      setIsLiked(!isLiked);
      setLikes((prevCount) => prevCount + (isLiked ? -1 : 1));
    } catch (error) {
      console.error("Error liking the post:", error);
    } finally {
      setIsLikeLoading(false);
    }
  };
  const handleCategoryChange = (newCategory) => {
    const animalKey = item.animal || "dog";
    navigate(`/community/preview/${animalKey}/${newCategory}`, {
      replace: true,
    });
  };
  const categoryMap = {
    "자유/일상": "freedomAndDaily",
    궁금해요: "curious",
    정보공유: "sharingInformation",
  };
  const animalTypeMap = {
    강아지: "dog",
    고양이: "cat",
    특수동물: "exoticpet",
  };

  const CategoryName = item?.category
    ? categoryMap[item.category] || "freedomAndDaily"
    : "freedomAndDaily";

  const handleCommentSubmit = () => {
    setCommentListKey((prevKey) => prevKey + 1); // key 값을 증가시켜 CommentList를 리렌더링
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

  const {
    animal,
    title,
    content,
    images,
    category,
    hashtag,
    photos,
    likesList,
    commentCount,
  } = item;

  const navigateWithParams = () => {
    const params = {
      title: item.title,
      content: item.content,
      images: item.images,
      category: item.category,
      hashtag: item.hashtag,
      animal: item.animal,
      edit: true,
      comid: comid,
    };
    navigate(`/community/communitywrite`, { state: params });
  };

  const handleDeleteClick = async () => {
    try {
      await CommunityApi.deleteCommunity(comid);
      navigate(-1);
    } catch (error) {
      setModalMessage("게시물 삭제에 실패했습니다.");
      setModalIsOpen(true);
    }
  };

  return (
    <div>
      <Mobile>
        <TopBar />
        <div className={styles.profile}>
          <img src={profileImg} alt="" className={styles.profileImg} />
          <div className={styles.profileDetails}>
            <div className={styles.profileName}>{profileName}</div>
          </div>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
        {images && images.length > 0 && (
          <div className={styles.images_container}>
            {images.map((item, index) => (
              <img
                key={index}
                src={item.filePath}
                alt={`이미지 ${index + 1}`}
              />
            ))}
          </div>
        )}
        <div className={styles.hashtags}>
          {hashtags.map((hashtag, index) => (
            <span key={index} className={styles.hashtag}>
              #{hashtag}
            </span>
          ))}
        </div>

        <div className={styles.like_and_coment}>
          <div className="icon-group">
            <BiSolidLike
              className={styles.icon}
              onClick={toggleLike}
              style={{
                color: isLiked ? "red" : "gray",
                cursor: "pointer",
                pointerEvents: isLikeLoading ? "none" : "auto",
              }}
            />
            <span> {likes}</span>
          </div>
          <div className="icon-group">
            <BsChatFill className={styles.icon} />
            <span> {item.commentCount}</span>
          </div>
          <div className={styles.moreIconContainer}>
            <FiMoreVertical
              className={styles.moreIcon}
              onClick={() => setShowSubBottomSheet(true)}
            />
          </div>
        </div>

        <div className={styles.coment_area}>
          <CommentCreate comid={comid} onCommentSubmit={handleCommentSubmit} />
          <CommentList key={commentListKey} comid={comid} />
        </div>
      </Mobile>
      <DeskTop>
        <div className={`${styles.community} ${styles.dtver}`}>
          <div className={`${styles.commu_sidebar}`}>
            <div className={`${styles.category_buttons_area} ${styles.dtver}`}>
              <div># 카테고리</div>

              <button
                className={`${styles.category_button} ${styles.dtver}`}
                onClick={() => handleCategoryChange("freedomAndDaily")}
                disabled={CategoryName === "freedomAndDaily"}
              >
                #자유/일상
              </button>
              <button
                className={styles.category_button}
                onClick={() => handleCategoryChange("curious")}
                disabled={CategoryName === "curious"}
              >
                #궁금해요
              </button>
              <button
                className={styles.category_button}
                onClick={() => handleCategoryChange("sharingInformation")}
                disabled={CategoryName === "sharingInformation"}
              >
                #정보공유
              </button>
            </div>
          </div>
          <div className={`${styles.comm_listbox} ${styles.dtver}`}>
            <div className={styles.profile}>
              <img src={profileImg} alt="" className={styles.profileImg} />
              <div className={styles.profileDetails}>
                <div className={styles.profileName}>{profileName}</div>
              </div>
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
            {images && images.length > 0 && (
              <div className={styles.images_container}>
                {images.map((item, index) => (
                  <img
                    key={index}
                    src={item.filePath}
                    alt={`이미지 ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className={styles.hashtags}>
              {hashtags.map((hashtag, index) => (
                <span key={index} className={styles.hashtag}>
                  #{hashtag}
                </span>
              ))}
            </div>

            <div className={styles.like_and_coment}>
              <div className="icon-group">
                <BiSolidLike
                  className={styles.icon}
                  onClick={toggleLike}
                  style={{
                    color: isLiked ? "red" : "gray",
                    cursor: "pointer",
                    pointerEvents: isLikeLoading ? "none" : "auto",
                  }}
                />
                <span> {likes}</span>
              </div>
              <div className="icon-group">
                <BsChatFill className={styles.icon} />
                <span> {item.commentCount}</span>
              </div>
              <div className={styles.moreIconContainer}>
                <FiMoreVertical
                  className={styles.moreIcon}
                  onClick={() => setShowSubBottomSheet(true)}
                />
              </div>
            </div>

            <div className={styles.coment_area}>
              <CommentCreate
                comid={comid}
                onCommentSubmit={handleCommentSubmit}
              />
              <CommentList key={commentListKey} comid={comid} />
            </div>
          </div>
        </div>
      </DeskTop>
      {modalIsOpen && (
        <CheckModal onClose={closeModal} Content={modalMessage} oneBtn={true} />
      )}

      <EditDeleteBottomSheet
        show={showSubBottomSheet}
        type={writer ? "CommunityEditDelete" : "CommunityReportBlock"}
        genre={"게시글"}
        onClose={() => setShowSubBottomSheet(false)}
        onEditClick={navigateWithParams}
        onDeleteClick={handleDeleteClick}
        comid={comid}
        reduxMemberId={reduxMemberId.id}
        communityAuthorId={communityAuthorId}
      />
    </div>
  );
};

export default CommunityDetail;
