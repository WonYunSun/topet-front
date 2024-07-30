import React from "react";
import TopBar from "../component/TopBar";
import styles from "../css/shortsscreen.module.css";
import ShortItem from "../component/ShortsComp/ShortItem";

function Shorts() {
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

  return (
    <>
      <TopBar centerChange="쇼츠" />
      <div>
        <div className={styles.popularShorts}>
          <div>최근 인기 쇼츠</div>
          <div className={styles.shortsListContainer}>
            {dummyPopularShortsData.map((short) => (
              <ShortItem
                key={short.id}
                thumbnailUrl={short.thumbnailUrl}
                title={short.title}
                author={short.author}
                widthAdjust="32%"
                heightAdjust="90%"
              />
            ))}
          </div>
        </div>
        <div className={styles.divisionline}></div>
        <div>
          <div>전체 쇼츠</div>
        </div>
      </div>
    </>
  );
}

export default Shorts;
