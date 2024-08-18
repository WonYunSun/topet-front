// ShortsBox.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShortsDetail from "./ShortsDetail";
import shortsApi from "../api/shortsApi";

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

function ShortsBox() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thisShorts, setThisShorts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shortsArr, setShortsArr] = useState([id]);
  const [index, setIndex] = useState(0);
  const touchStartY = useRef(0);
  const [eventPrevent, setEventPrevent] = useState(false);

  const handleEventPrevent = (ep) => {
    console.log("eventPrevent 상태:", ep); // 디버깅을 위한 로그 추가
    setEventPrevent(ep);
  };

  useEffect(() => {
    console.log(shortsArr);
    console.log(index);
  }, [shortsArr, index]);

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
  }, [index]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await shortsApi.getShortsDetail(shortsArr[index]);
        setThisShorts(resp);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [shortsArr, index]);

  const next = async () => {
    console.log("쇼츠박스에서움직이는next");
    const nextIndex = index + 1;
    if (nextIndex < shortsArr.length) {
      setIndex(nextIndex);
    } else {
      const resp = await getRandomShorts();
      setShortsArr((prevArr) => [...prevArr, resp]);
      setIndex(shortsArr.length); // Update index to the new random short's index
    }
    window.scrollTo(0, 50);
  };

  const prev = () => {
    console.log("쇼츠박스에서움직이는prev");
    if (index > 0) {
      setIndex(index - 1);
    }
    window.scrollTo(0, 50);
  };

  const getRandomShorts = async () => {
    const resp = await shortsApi.getRandomShorts();
    return resp;
  };

  const handleWheel = async (event) => {
    if (!eventPrevent) {
      // eventPrevent가 false일 때만 실행
      console.log("쇼츠박스에서움직이는handleWheel");
      if (event.deltaY > 0) {
        await next();
      } else if (event.deltaY < 0) {
        prev();
      }
    }
  };

  const handleTouchStart = (event) => {
    if (event.touches.length > 0) {
      const startY = event.touches[0].clientY;
      touchStartY.current = startY;
    }
  };

  const handleTouchMove = (event) => {
    if (!eventPrevent) {
      // eventPrevent가 false일 때만 실행
      const touchEndY = event.touches[0].clientY;

      if (touchStartY.current !== null) {
        if (touchStartY.current > touchEndY) {
          next();
          window.scrollTo(0, 50);
        } else if (touchStartY.current < touchEndY) {
          prev();
          window.scrollTo(0, 50);
        }
      }
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <ShortsDetail eventPrevent={handleEventPrevent} />;
}
// videoSrc={thisShorts?.videoSrc} id={shortsArr[index]}
export default ShortsBox;
