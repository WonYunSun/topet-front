import React from "react";
import TopBar from "../component/TopBar";
import styles from "../css/shortsscreen.module.css";
import ShortItem from "../component/ShortsComp/ShortItem";
import shortsApi from "../api/shortsApi";
import ContentList from "../component/HandlerComp/ContentList";
import { Mobile, DeskTop } from "../responsive/responsive";
import FloatingBtn from "../component/ButtonComp/FloatingBtn";
import { useNavigate } from "react-router-dom";

const Shorts = () => {
  const navigate = useNavigate();

  const fetchShorts = async (page, pageSize) => {
    try {
      const response = await shortsApi.getAllShorts(page, pageSize);
      const allShorts = response.map((short) => ({
        id: short.id,
        videoUrl: short.videoSrc,
        thumbnailUrl: short.thumbnailPhotoSrc,
        author: short.author,
        content: short.content,
      }));
      console.log("전체쇼츠", allShorts);
      return allShorts;
    } catch (error) {
      console.error("Failed to fetch shorts:", error);
      return [];
    }
  };

  const renderShorts = (short) => (
    <ShortItem
      key={short.id}
      id={short.id}
      thumbnailUrl={short.thumbnailUrl}
      content={short.content}
      author={short.author}
      heightAdjust="250px"
    />
  );

  const goAddShorts = () => {
    navigate(`/addshorts`);
  };

  return (
    <>
      <Mobile>
        <TopBar centerChange="쇼츠" />
        <div className={styles.shortWrapper}>
          <div className={styles.allShortsWrap}>
            <div className={styles.titlediv}>전체 쇼츠</div>'
            <div className={styles.shortsGridContainer}>
              <ContentList fetchItems={fetchShorts} renderItem={renderShorts} />
            </div>
          </div>
          <FloatingBtn onClick={goAddShorts} />
        </div>
      </Mobile>
      <DeskTop>
        <div className={styles.deskTopshortswrap}>
          <FloatingBtn onClick={goAddShorts} />
          <div className={styles.sidebarTitle}>
            <div>쇼츠</div>
          </div>
          <div className={`${styles.shortWrapper} ${styles.dtver}`}>
            <TopBar centerChange="쇼츠" />
            <div className={styles.allShortsWrap}>
              <div className={styles.titlediv}>전체 쇼츠</div>
              <div className={styles.shortsGridContainer}>
                <ContentList
                  fetchItems={fetchShorts}
                  renderItem={renderShorts}
                />
              </div>
            </div>
          </div>
        </div>
      </DeskTop>
    </>
  );
};

export default Shorts;
