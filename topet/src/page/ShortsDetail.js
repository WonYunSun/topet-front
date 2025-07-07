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
import { Mobile, DeskTop } from "../responsive/responsive";
import CommunityLikesApi from "../api/communityLikesApi";

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
        setThisShorts(resp);
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
    if (showBottomSheet) return;

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
      touchStartY.current = event.touches[0].clientY;
    }
  };

  const handleTouchMove = (event) => {
    if (showBottomSheet) return;

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

  const togglePlayPause = (event) => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }

    setIsPlaying(!video.paused);
    setIsButtonVisible(true);
    setTimeout(() => {
      setIsButtonVisible(false);
    }, 800);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (video) {
      const progressPercentage = (video.currentTime / video.duration) * 100;
      setProgress(progressPercentage);
    }
  };

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (video) {
  //     const handlePlay = () => setIsPlaying(true);
  //     const handlePause = () => setIsPlaying(false);

  //     video.addEventListener("play", handlePlay);
  //     video.addEventListener("pause", handlePause);

  //     return () => {
  //       video.removeEventListener("play", handlePlay);
  //       video.removeEventListener("pause", handlePause);
  //     };
  //   }
  // }, [thisShorts]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const goShorts = () => navigate("/shorts");

  const toggleLike = async () => {
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
            {isPlaying ? <FaPlay size={50} /> : <FaPause size={50} />}
          </button>
          <div className={styles.detaildiv}>
            <div className={styles.condiv}>{thisShorts?.content}</div>
          </div>
          <div className={styles.menudiv}>
            <div>
              <BiSolidLike
                size={26}
                onClick={toggleLike}
                className={isLiked ? styles.truelikeicon : styles.falselikeicon}
              />
              <div>{likes}</div>
            </div>
            <div>
              <BsChatFill
                size={23}
                className={styles.menuicon}
                onClick={handleBottomSheetOpen}
              />
              {/* 나중에 값 바꿔주세요 */}
              <div>
                {thisShorts?.commentCount ? thisShorts?.commentCount : 0}
              </div>
            </div>
            <div>
              <HiDotsHorizontal size={25} className={styles.menuicon} />
            </div>
          </div>
          {thisShorts && (
            <video
              ref={videoRef}
              src={thisShorts.videoSrc}
              autoPlay
              loop
              onTimeUpdate={handleProgress}
              onClick={() => {
                console.log("클릭");
                togglePlayPause(); // Ensure togglePlayPause is called
              }}
              className={styles.video}
            />
          )}
          <div className={styles.controls}>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        {showBottomSheet && (
          <ShortsBottom
            id={id}
            show={showBottomSheet}
            onClose={handleBottomSheetClose}
            isshorts={true}
          />
        )}
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
                {isPlaying ? <FaPlay size={50} /> : <FaPause size={50} />}
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
                  <div>{likes}</div>
                </div>
                <div>
                  <BsChatFill
                    size={23}
                    className={styles.menuicon}
                    onClick={handleBottomSheetOpen}
                  />
                  {/* 나중에 값 바꿔주세요 */}
                  <div>
                    {thisShorts?.commentCount ? thisShorts?.commentCount : 0}
                  </div>
                </div>
                <div>
                  <HiDotsHorizontal size={25} className={styles.menuicon} />
                </div>
              </div>
              {thisShorts && (
                <video
                  ref={videoRef}
                  src={thisShorts.videoSrc}
                  autoPlay
                  loop
                  onTimeUpdate={handleProgress}
                  onClick={togglePlayPause}
                  className={styles.video}
                ></video>
              )}
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
