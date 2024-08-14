import React from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import MyPostList from "../../component/MyPageComp/MyPostList";

const SeeLikedPost = () => {
  return (
    <div>
      <MyPageCommonTopBar title={"좋아요 한 게시글"} />
      <MyPostList />
    </div>
  );
};

export default SeeLikedPost;
