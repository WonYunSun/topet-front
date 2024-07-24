import { useEffect, useState } from "react";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  // react-kakao-maps-sdk에서 제공하는 훅 사용
  useKakaoLoaderOrigin({
    appkey: "013236da36d05a18e2f3d061c798177a",
    libraries: ["clusterer", "drawing", "services"],
  });

  useEffect(() => {
    // 추가적인 초기화 작업 필요시
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=013236da36d05a18e2f3d061c798177a&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };

    script.onerror = () => {
      console.error("Failed to load Kakao Maps script");
      setIsLoaded(false);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return isLoaded;
}
