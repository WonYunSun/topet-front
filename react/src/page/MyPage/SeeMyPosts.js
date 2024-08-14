import React, { useEffect, useState } from "react";

import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import CommunityApi from "../../api/communityApi";
import MyPostList from "../../component/MyPageComp/MyPostList";
import styles from "../../css/communityList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SeeMyPosts = () => {
  const reduxMember = useSelector((state) => state.member.member);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let myPosts = await CommunityApi.getMyCommunity(reduxMember.id);
  //       console.log("myPosts :", myPosts);
  //       setPosts(myPosts);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       console.log("end");
  //     }
  //   };
  //   fetchData();
  // }, []);

  const goDetail = (id) => {
    navigate(`/community/detail/${id}`);
  };

  const handlePostClick = async (comid) => {
    try {
      await CommunityApi.fetchCommunityDetail(comid);
      navigate(`/community/detail/${comid}`);
    } catch (error) {
      if (error.message.includes("404")) {
        console.log("게시물이 없습니다.");
      } else {
        console.log("게시물을 불러오는 데 실패했습니다.");
      }
    }
  };

  // {posts.map((post, index) => (
  //   <div key={index} onClick={() => goDetail(post.id)}>
  //     <div>{post.title}</div>
  //     <div>{post.author.name}</div>
  //     {post.images && post.images.length > 0 && (
  //       <div>
  //         <img
  //           src={`${post.images[0].filePath}`}
  //           alt={post.images[0].origFileName}
  //         />
  //       </div>
  //     )}
  //     <div>{post.content}</div>
  //     {/* <div>{formatHashtags(post.hashtag)}</div> */}
  //     {post.likesList == null ? (
  //       <div>좋아요 0</div>
  //     ) : (
  //       <div>좋아요 {post.likesList.length}</div>
  //     )}
  //     {post.comments == null ? (
  //       <div>댓글 0</div>
  //     ) : (
  //       <div>댓글 {post.comments.length}</div>
  //     )}
  //   </div>
  // ))}

  return (
    <div>
      <MyPageCommonTopBar title={"내 게시글"} />
      <MyPostList />
    </div>
  );
};

export default SeeMyPosts;
