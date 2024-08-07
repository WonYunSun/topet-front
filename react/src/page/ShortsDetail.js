import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shortsApi from "../api/shortsApi";

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

function ShortsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thisShorts, setThisShorts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFetchedRandom, setHasFetchedRandom] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const screenX = window.outerWidth;
  const screenY = window.outerHeight;

  useEffect(() => {
    window.scrollTo(0, 50); // 초기값을 50으로 설정
    const debouncedHandleWheel = debounce(handleWheel, 200); // 200ms 지연
    const debouncedHandleTouchMove = debounce(handleTouchMove, 200);

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up
        };
    }, [
        
    ]);

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
    window.scrollTo(0, 50); // id가 변경될 때마다 스크롤을 약간의 여유를 두고 설정
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
      window.scrollTo(0, 50); // 스크롤을 약간의 여유를 두고 설정
    } else if (event.deltaY < 0) {
      navigate(-1);
      window.scrollTo(0, 50); // 스크롤을 약간의 여유를 두고 설정
    }
  };

  const handleTouchStart = (event) => {
    console.log("Touch start detected");
    setTouchStartY(event.touches[0].clientY);
    console.log("touchStartY set to", event.touches[0].clientY);
  };

  const handleTouchMove = (event) => {
    const touchEndY = event.touches[0].clientY;
    console.log("touchEndY", touchEndY);
    console.log("touchStartY", touchStartY);
    if (touchStartY > touchEndY) {
      console.log("위로스크롤");
      getRandomShorts();
    } else if (touchStartY > touchEndY) {
      console.log("아래로스크롤");
      navigate(-1);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: "0px", overflow: "hidden" }}>
      <h1 style={{ zIndex: 1, position: "absolute" }}>ShortsDetail</h1>
      <div></div>
      <h2>{id}</h2>
      <video
        src={thisShorts?.videoSrc}
        autoPlay
        loop
        style={{ width: screenX, height: screenY * 0.6 }}
      ></video>
      <div>하단여백</div>
    </div>
  );
}

export default ShortsDetail;
