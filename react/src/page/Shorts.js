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
  const [shorts, setShorts] = useState();
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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Mobile>
        <TopBar centerChange="쇼츠" />
        <div className={styles.shortWrapper}>
          {/* <div className={styles.divisionline}></div> */}
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
          <div className={`${styles.shortWrapper} ${styles.dtver}`}>
            <TopBar centerChange="쇼츠" />

            {/* <div className={styles.divisionline}></div> */}
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
