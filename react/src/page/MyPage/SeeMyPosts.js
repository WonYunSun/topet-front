import React, { useEffect, useState } from "react";

import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import CommunityApi from "../../api/communityApi";
import styles from "../../css/communityList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SeeMyPosts = () => {
  const reduxMember = useSelector((state) => state.member.member);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let myPosts = await CommunityApi.getMyCommunity(reduxMember.id);
        console.log("myPosts :", myPosts);
        setPosts(myPosts);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("end");
      }
    };
    fetchData();
  }, []);

  const goDetail = (id) => {
    navigate(`/community/detail/${id}`);
  };

  /*
    animal: "dog"
    author: {id: 1, socialId: '3604958249', name: '이정현', email: 'andre1130@nate.com', profileSrc: null}
    category: "자유/일상"
    comments: null
    content: "5151511551"
    createdTime: "2024-07-30T20:06:00.052511"
    hashtag: ""
    id: 1
    images: []
    likesList: []
    title: "15151515"
    updatedTime:"2024-07-30T20:06:00.052511"
    */

  // const formatHashtags = (hashtagString) => {
  //   if (hashtagString == null) {
  //     return;
  //   }
  //   const tags = hashtagString
  //     .split(",")
  //     .map((tag) => tag.trim())
  //     .filter((tag) => tag !== "");

  //   const visibleTags = tags.slice(0, 3);
  //   const remainingTagsCount = tags.length - visibleTags.length;

  //   return (
  //     <>
  //       {visibleTags.map((tag, index) => (
  //         <span key={index} className={styles.hashtag}>
  //           #{tag}
  //         </span>
  //       ))}
  //       {remainingTagsCount > 0 && (
  //         <span className={styles.hashtag}>+{remainingTagsCount}</span>
  //       )}
  //     </>
  //   );
  // };

  const handlePostClick = async (comid) => {
    try {
      await CommunityApi.fetchCommunityDetail(comid);
      navigate(`/community/detail/${comid}`);
    } catch (error) {
      if (error.message.includes("404")) {
        console.log("게시물이 없습니다.");
        // setModalMessage("게시물이 없습니다.");
      } else {
        console.log("게시물을 불러오는 데 실패했습니다.");
        // setModalMessage("게시물을 불러오는 데 실패했습니다.");
      }
      // setModalIsOpen(true);
    }
  };

  return (
    <div onClick={handlePostClick}>
      <MyPageCommonTopBar title={"내 게시글"} />
      {posts.map((post, index) => (
        <div key={index} onClick={() => goDetail(post.id)}>
          <div>{post.title}</div>
          <div>{post.author.name}</div>
          {post.images && post.images.length > 0 && (
            <div>
              <img
                src={`${post.images[0].filePath}`}
                alt={post.images[0].origFileName}
              />
            </div>
          )}
          <div>{post.content}</div>
          {/* <div>{formatHashtags(post.hashtag)}</div> */}
          {post.likesList == null ? (
            <div>좋아요 0</div>
          ) : (
            <div>좋아요 {post.likesList.length}</div>
          )}
          {post.comments == null ? (
            <div>댓글 0</div>
          ) : (
            <div>댓글 {post.comments.length}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SeeMyPosts;
