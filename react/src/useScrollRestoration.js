//이거 스크롤 복원 코드인데, 지금 안 쓰는데 나중에 쓸거에요.

import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();
  const scrollPositions = useRef({});

  useLayoutEffect(() => {
    // 현재 스크롤 위치 저장
    return () => {
      scrollPositions.current[location.key] = window.scrollY;
    };
  }, [location]);

  useLayoutEffect(() => {
    // 이전 페이지로 돌아갔을 때, 저장된 스크롤 위치로 복원
    if (scrollPositions.current[location.key] !== undefined) {
      window.scrollTo(0, scrollPositions.current[location.key]);
    }
  }, [location]);
};

export default useScrollRestoration;
