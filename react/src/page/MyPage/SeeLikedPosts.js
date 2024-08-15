import React from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import MyPostList from "../../component/MyPageComp/MyPostList";
import MyPageSideBar from "../../component/MyPageComp/MyPageSideBar";
import styles from "../../css/mypage_seemy.module.css";

/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const SeeLikedPost = () => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  return (
    <>
      <div className={`${isDeskTop && styles.wrapper_dtver}`}>
        <div className={`${isDeskTop && styles.inner_wrapper}`}>
          {isDeskTop && <MyPageSideBar option={"좋아요 한 게시글 보기"} />}
          <div className={`${isDeskTop && styles.rightside_wrapper}`}>
            <MyPageCommonTopBar title={"좋아요 한 게시글"} />
            <MyPostList />
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeLikedPost;
