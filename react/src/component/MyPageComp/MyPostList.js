import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommunityApi from "../../api/communityApi";
import CommunityListData from "../CommunityComp/CommunityListData";
import ContentList from "../HandlerComp/ContentList";
import styles from "../../css/communityList.module.css";

const MyPostList = ({ postType }) => {
  const reduxMember = useSelector((state) => state.member.member);
  const fetchPosts = () => {
    if (postType == "mypost") {
      // 내 게시글
      return CommunityApi.getMyCommunity(reduxMember.id);
    } else if (postType == "likedpost") {
      // 좋아요 한 게시글
      return CommunityApi.getMyCommunity(reduxMember.id); // !! 수정 필요 !!
    }
  };

  const renderPosts = (item) => {
    <CommunityListData key={item.id} item={item} />;
  };

  return (
    <div>
      <div className={styles.communities_content_area}>
        <ContentList fetchItems={fetchPosts} renderItem={renderPosts} />
      </div>
    </div>
  );
};

export default MyPostList;
