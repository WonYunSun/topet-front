import React from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import MyPageSideBar from "../../component/MyPageComp/MyPageSideBar";
import styles from "../../css/mypage_seemy.module.css";
import shortsApi from "../../api/shortsApi";
import { useSelector, useDispatch } from "react-redux";
/// responsive
import MyPostList from "../../component/MyPageComp/MyPostList";
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";
import ContentList from "../../component/HandlerComp/ContentList";
import ShortItem  from "../../component/ShortsComp/ShortItem";

const SeeLikedShorts = () => {
  const reduxMember = useSelector((state) => state.member.member);
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });
  const renderShorts = (short) => (
    <ShortItem
      key={short.id}
      id={short.id}
      thumbnailUrl={short.thumbnail}
      content={short.content}
      author={short.author}
      heightAdjust="250px"
    />
  );
  const fetchShorts =(page, pageSize) => {


    return shortsApi.getLikedShorts(reduxMember.id, page, pageSize);
  };
  return (
    <>
      <div className={`${isDeskTop && styles.wrapper_dtver}`}>
        <div className={`${isDeskTop && styles.inner_wrapper}`}>
          {isDeskTop && <MyPageSideBar option={"좋아요 한 쇼츠 보기"} />}
          <div className={`${isDeskTop && styles.rightside_wrapper}`}>
            <MyPageCommonTopBar title={"좋아요 한 쇼츠"} />
            <div className={styles.shortsGridContainer}>
              <ContentList fetchItems={fetchShorts} 
              renderItem={renderShorts} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeLikedShorts;
