import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shortsApi from "../api/shortsApi";
import styles from "../css/shortsDetail.module.css";
import { GoArrowLeft } from "react-icons/go";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
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

function ShortsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thisShorts, setThisShorts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFetchedRandom, setHasFetchedRandom] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const touchStartY = useRef(0);
  // const screenX = window.outerWidth;
  // const screenY = window.outerHeight;

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
        await getShortsDetail();
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

  const getShortsDetail = async () => {
    const resp = await shortsApi.getShortsDetail(id);
    setThisShorts(resp);
  };

  const getRandomShorts = async () => {
    if (!hasFetchedRandom) {
      const resp = await shortsApi.getRandomShorts();
      setHasFetchedRandom(true);
      navigate(`/shortsDetail/${resp}`);
    }
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      getRandomShorts();
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
    const touchEndY = event.touches[0].clientY;

    if (touchStartY.current !== null) {
      if (touchStartY.current > touchEndY) {
        getRandomShorts();
        window.scrollTo(0, 50);
      } else if (touchStartY.current < touchEndY) {
        navigate(-1);
        window.scrollTo(0, 50);
      }
    }
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

    // Show button and hide it after 0.8 seconds
    setIsButtonVisible(true);
    console.log("Button visibility:", isButtonVisible); // 이 위치에서만 로그를 찍도록 수정
    setTimeout(() => {
      setIsButtonVisible(false);
    }, 800);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    const progressPercentage = (video.currentTime / video.duration) * 100;
    setProgress(progressPercentage);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const goShorts = () => navigate("/shorts");

  return (
    <div className={styles.detail_wrap}>
      <div className={styles.icon} onClick={goShorts}>
        <GoArrowLeft size={25} />
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
          <BiSolidLike size={26} className={styles.menuicon} />
          {/* 나중에 값 바꿔주세요 */}
          <div>100</div>
        </div>
        <div>
          <BsChatFill size={23} className={styles.menuicon} />
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
  );
}

export default ShortsDetail;
