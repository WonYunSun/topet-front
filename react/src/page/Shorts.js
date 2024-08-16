import React, { useState, useEffect } from "react";

import TopBar from "../component/TopBar";
import styles from "../css/shortsscreen.module.css";
import ShortItem from "../component/ShortsComp/ShortItem";
import shortsApi from "../api/shortsApi";
import { all } from "axios";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

function Shorts() {
  const [shorts, setShorts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllShorts();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  const getAllShorts = async () => {
    const resp = await shortsApi.getAllShorts();
    console.log(resp);
    const allShorts = [];
    for (let i = 0; i < resp.length; i++) {
      let tempShorts = {
        id: resp[i].id,
        videoUrl: resp[i].videoSrc,
        thumbnailUrl: resp[i].thumbnailPhotoSrc,
        author: resp[i].author,
      };
      allShorts.push(tempShorts);
    }
    setShorts(allShorts);

    console.log(allShorts);
  };

  // 더미쇼츠리스트(최근인기쇼츠)
  const dummyPopularShortsData = [
    {
      id: 1,
      videoUrl: "https://dummyvideo1.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Dummy Video 1",
      author: "Author 1",
    },
    {
      id: 2,
      videoUrl: "https://dummyvideo2.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Dummy Video 2",
      author: "Author 2",
    },
    {
      id: 3,
      videoUrl: "https://dummyvideo3.com",
      thumbnailUrl: "https://dummyimage3.com",
      title: "Dummy Video 3",
      author: "Author 3",
    },
  ];
  // 더미쇼츠리스트(전체 쇼츠)
  // const dummyAllShortsData = shorts;


  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Mobile>
        <TopBar centerChange="쇼츠" />
        <div className={styles.shortWrapper}>
          <div className={styles.titlediv}>최근 인기 쇼츠</div>
          <div className={styles.popularShorts}>
            <div className={styles.shortsListContainer}>
              {dummyPopularShortsData.map((short) => (
                <ShortItem
                  key={short.id}
                  thumbnailUrl={short.thumbnailUrl}
                  title={short.title}
                  author={short.author}
                  heightAdjust="100%"
                />
              ))}
            </div>
          </div>
          <div className={styles.divisionline}></div>
          <div className={styles.allShortsWrap}>
            <div className={styles.titlediv}>전체 쇼츠</div>
            <div className={styles.shortsGridContainer}>
              {shorts.map((short) => (
                <ShortItem
                  key={short.id}
                  id={short.id}
                  thumbnailUrl={short.thumbnailUrl}
                  title={short.title}
                  author={short.author}
                  widthAdjust="100%" // 그리드 내에서 너비를 조정
                  heightAdjust="250px" // 필요 시 높이를 조정
                />
              ))}
            </div>
          </div>
        </div>
      </Mobile>
      <DeskTop>
        <div className={styles.deskTopshortswrap}>
          <div className={styles.sidebarTitle}>
            <div>쇼츠</div>
          </div>

          <div className={styles.shortWrapper}>
            <div className={styles.titlediv}>최근 인기 쇼츠</div>
            <div className={styles.popularShorts}>
              <div
                className={`${styles.shortsListContainer} ${
                  isDeskTop ? styles.dtver : ""
                }`}
              >
                {dummyPopularShortsData.map((short) => (
                  <ShortItem
                    key={short.id}
                    thumbnailUrl={short.thumbnailUrl}
                    title={short.title}
                    author={short.author}
                    heightAdjust="100%"
                  />
                ))}
              </div>
            </div>
            <div className={styles.divisionline}></div>
            <div className={styles.allShortsWrap}>
              <div className={styles.titlediv}>전체 쇼츠</div>
              <div className={styles.shortsGridContainer}>
                {shorts.map((short) => (
                  <ShortItem
                    key={short.id}
                    id={short.id}
                    thumbnailUrl={short.thumbnailUrl}
                    title={short.title}
                    author={short.author}
                    widthAdjust="100%" // 그리드 내에서 너비를 조정
                    heightAdjust="250px" // 필요 시 높이를 조정
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DeskTop>
    </>
  );
}

export default Shorts;
