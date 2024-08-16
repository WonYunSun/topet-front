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
  const dummyAllShortsData = [
    {
      id: 1,
      videoUrl: "https://dummyvideo1.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGRvZ3xlbnwwfHx8fDE2OTEyMDA4Nzg&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Playful Puppy",
      author: "Author 1",
    },
    {
      id: 2,
      videoUrl: "https://dummyvideo2.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNhdHxlbnwwfHx8fDE2OTEyMDA5NjY&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Cute Cat",
      author: "Author 2",
    },
    {
      id: 3,
      videoUrl: "https://dummyvideo3.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1525351484163-7529415b3b98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAwOTgw&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Exotic Animal",
      author: "Author 3",
    },
    {
      id: 4,
      videoUrl: "https://dummyvideo4.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGRvZ3xlbnwwfHx8fDE2OTEyMDA5OTg&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Happy Dog",
      author: "Author 4",
    },
    {
      id: 5,
      videoUrl: "https://dummyvideo5.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNhdHxlbnwwfHx8fDE2OTEyMDEwMTI&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Sleepy Cat",
      author: "Author 5",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
    {
      id: 6,
      videoUrl: "https://dummyvideo6.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGV4b3RpYyUyMGFuaW1hbHN8ZW58MHx8fHwxNjkxMjAxMDM0&ixlib=rb-4.0.3&q=80&w=1080",
      title: "Curious Animal",
      author: "Author 6",
    },
  ];
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
          <div className={styles.sidebarTitle}>쇼츠</div>

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
