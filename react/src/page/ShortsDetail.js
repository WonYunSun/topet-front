import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shortsApi from "../api/shortsApi";
import styles from "../css/shortsDetail.module.css";
import { GoArrowLeft } from "react-icons/go";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import ShortsBottom from "../component/ShortsBottom";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";
import CommunityLikesApi from "../api/communityLikesApi";

// 디바운스 함수 구현
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function ShortsDetail({ eventPrevent }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thisShorts, setThisShorts] = useState();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFetchedRandom, setHasFetchedRandom] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const videoRef = useRef(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 50);
    const debouncedHandleWheel = debounce(handleWheel, 200);
    const debouncedHandleTouchMove = debounce(handleTouchMove, 200);

    window.addEventListener("wheel", debouncedHandleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", debouncedHandleTouchMove);

    return () => {
      window.removeEventListener("wheel", debouncedHandleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", debouncedHandleTouchMove);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await shortsApi.getShortsDetail(id);
        // const likesResp = await CommunityLikesApi.postShortsLike(id);
        setThisShorts(resp);
        // setLikes(likesResp.likeCount);
        console.log(resp);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 50);
  }, [id]);

  const handlegetRandomShorts = async () => {
    if (!hasFetchedRandom) {
      const resp = await shortsApi.getRandomShorts();
      setHasFetchedRandom(true);
      navigate(`/shortsDetail/${resp}`);
    }
  };

  const handleWheel = (event) => {
    if (showBottomSheet) return; // BottomSheet가 열려있으면 함수 종료

    if (event.deltaY > 0) {
      handlegetRandomShorts();
      window.scrollTo(0, 50);
    } else if (event.deltaY < 0) {
      navigate(-1);
      window.scrollTo(0, 50);
    }
  };

  const handleTouchStart = (event) => {
    if (event.touches.length > 0) {
      const startY = event.touches[0].clientY;
      touchStartY.current = startY;
    }
  };

  const handleTouchMove = (event) => {
    if (showBottomSheet) return; // BottomSheet가 열려있으면 함수 종료

    const touchEndY = event.touches[0].clientY;

    if (touchStartY.current !== null) {
      if (touchStartY.current > touchEndY) {
        handlegetRandomShorts();
        window.scrollTo(0, 50);
      } else if (touchStartY.current < touchEndY) {
        navigate(-1);
        window.scrollTo(0, 50);
      }
    }
  };
  const handleBottomSheetOpen = () => {
    setShowBottomSheet(true);
    eventPrevent(true);
  };
  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
    eventPrevent(false);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    // Play/Pause toggle
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    setIsButtonVisible(true);
    console.log("Button visibility:", isButtonVisible); // 이 위치에서만 로그를 찍도록 수정
    setTimeout(() => {
      setIsButtonVisible(false);
    }, 800);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video) {
      return; // video가 없을 때는 아무 것도 하지 않음
    }
    const progressPercentage = (video.currentTime / video.duration) * 100;
    setProgress(progressPercentage);
  };

  // console.log(id);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const goShorts = () => navigate("/shorts");

  const toggleLike = async () => {
    // 좋아요 등록 및 취소 함수
    if (isLikeLoading) return;
    setIsLikeLoading(true);
    try {
      await CommunityLikesApi.postShortsLike(id);
      setIsLiked(!isLiked);
      setLikes((prevCount) => prevCount + (isLiked ? -1 : 1));
    } catch (error) {
      console.error("Error liking the post:", error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  return (
    <>
      <Mobile>
        <div className={styles.detail_wrap}>
          <div className={styles.icon} onClick={goShorts}>
            <GoArrowLeft size={25} color="#fff" />
          </div>
          <button
            className={`${styles.pauseBtn} ${
              isButtonVisible ? styles.visible : ""
            }`}
            onClick={togglePlayPause}
            style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
          >
            {isPlaying ? <FaPause size={50} /> : <FaPlay size={50} />}
          </button>
          <div className={styles.detaildiv}>
            <div>{thisShorts?.content}</div>
          </div>
          <div className={styles.menudiv}>
            <div>
              <BiSolidLike
                size={26}
                onClick={toggleLike}
                className={isLiked ? styles.truelikeicon : styles.falselikeicon}
              />
              {/* 나중에 값 바꿔주세요 */}
              <div>{likes}</div>
            </div>
            <div>
              <BsChatFill
                size={23}
                className={styles.menuicon}
                onClick={handleBottomSheetOpen}
              />
              {/* 나중에 값 바꿔주세요 */}
              <div>100</div>
            </div>
            <div>
              {/* 나중에 값 바꿔주세요 */}
              <HiDotsHorizontal size={25} className={styles.menuicon} />
            </div>
          </div>
          <video
            ref={videoRef}
            src={thisShorts?.videoSrc}
            autoPlay
            loop
            onTimeUpdate={handleProgress}
            onClick={togglePlayPause}
            className={styles.video}
          ></video>

          <div className={styles.controls}>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <ShortsBottom
          id={id}
          show={showBottomSheet}
          onClose={handleBottomSheetClose}
          isshorts={true}
        />
      </Mobile>
      <DeskTop>
        <div className={styles.shortsWrap_dtver}>
          <div className={styles.leftWrapper}>
            <div className={styles.sidebarTitle}>쇼츠</div>
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.detail_wrap}>
              <div className={styles.icon} onClick={goShorts}>
                <GoArrowLeft size={25} color="#fff" />
              </div>
              <button
                className={`${styles.pauseBtn} ${
                  isButtonVisible ? styles.visible : ""
                }`}
                onClick={togglePlayPause}
                style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
              >
                {isPlaying ? <FaPause size={50} /> : <FaPlay size={50} />}
              </button>
              <div className={styles.detaildiv}>
                <div className={styles.condiv}>{thisShorts?.content}</div>
              </div>
              <div className={styles.menudiv}>
                <div>
                  <BiSolidLike
                    size={26}
                    onClick={toggleLike}
                    className={
                      isLiked ? styles.truelikeicon : styles.falselikeicon
                    }
                  />
                  {/* 나중에 값 바꿔주세요 */}
                  <div>{likes}</div>
                </div>
                <div>
                  <BsChatFill
                    size={23}
                    className={styles.menuicon}
                    onClick={handleBottomSheetOpen}
                  />
                  {/* 나중에 값 바꿔주세요 */}
                  <div>100</div>
                </div>
                <div>
                  {/* 나중에 값 바꿔주세요 */}
                  <HiDotsHorizontal size={25} className={styles.menuicon} />
                </div>
              </div>

              <video
                ref={videoRef}
                src={thisShorts?.videoSrc}
                autoPlay
                loop
                onTimeUpdate={handleProgress}
                onClick={togglePlayPause}
                className={styles.video}
              ></video>

              <div className={styles.controls}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className={styles.btmWrapper}>
              <ShortsBottom
                id={id}
                show={showBottomSheet}
                onClose={handleBottomSheetClose}
                isshorts={true}
              />
            </div>
          </div>
        </div>
      </DeskTop>
    </>
  );
}

export default ShortsDetail;
