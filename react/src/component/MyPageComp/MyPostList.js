import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommunityApi from "../../api/communityApi";
import CommunityListData from "../CommunityComp/CommunityListData";
import ContentList from "../HandlerComp/ContentList";
import styles from "../../css/communityList.module.css";

const MyPostList = ({ fetchItems }) => {
  const renderPosts = (item) => {
    return <CommunityListData key={item.id} item={item} />;
  };

  return (
    <div className={styles.communities_content_area}>
      <ContentList fetchItems={fetchItems} renderItem={renderPosts} />
    </div>
  );
};

export default MyPostList;
