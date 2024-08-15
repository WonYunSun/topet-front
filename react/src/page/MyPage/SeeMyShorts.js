import React, { useState, useEffect } from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import ShortItem from "../../component/ShortsComp/ShortItem";
import shortsApi from "../../api/shortsApi";
import MyPageSideBar from "../../component/MyPageComp/MyPageSideBar";
import styles from "../../css/mypage_seemy.module.css";

/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const SeeMyShorts = () => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const [shorts, setShorts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("요청보냄");
        await getMyShorts();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  const getMyShorts = async () => {
    const resp = await shortsApi.getMyShorts();

    setShorts(resp);
  };
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={`${isDeskTop && styles.wrapper_dtver}`}>
        <div className={`${isDeskTop && styles.inner_wrapper}`}>
          {isDeskTop && <MyPageSideBar option={"내 쇼츠 보기"} />}
          <div className={`${isDeskTop && styles.rightside_wrapper}`}>
            <MyPageCommonTopBar title={"내 쇼츠"} />
            {shorts != null && shorts != "" ? (
              shorts.map((short) => (
                <ShortItem
                  key={short.id}
                  id={short.id}
                  thumbnailUrl={short.thumbnailUrl}
                  title={short.title}
                  author={short.author}
                  widthAdjust="100%" // 그리드 내에서 너비를 조정
                  heightAdjust="250px" // 필요 시 높이를 조정
                />
              ))
            ) : (
              <div className={styles.no_contents}>쇼츠가 없습니다</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeMyShorts;
