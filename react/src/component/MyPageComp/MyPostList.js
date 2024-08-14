import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommunityApi from "../../api/communityApi";
import CommunityListData from "../CommunityComp/CommunityListData";
import ContentList from "../HandlerComp/ContentList";
import styles from "../../css/communityList.module.css";

const MyPostList = ({ postType }) => {
  const reduxMember = useSelector((state) => state.member.member);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    try{
      fetchPosts();
    }catch(error){
      throw error;
    }finally{
      setIsLoaded(true);
    }
  },[])
  
  
  const fetchPosts = async() => {
    if (postType == "mypost") {
      // 내 게시글
      const resp = await CommunityApi.getMyCommunity(reduxMember.id);
      return resp;
      
    } else if (postType == "likedpost") {
      // 좋아요 한 게시글
      return await CommunityApi.getMyCommunity(reduxMember.id); // !! 수정 필요 !!
    }
  };

  const renderPosts = (item) => {
    <CommunityListData key={item.id} item={item} />;
  };

  if(!isLoaded){
    return(<div>Loading...</div>);
  }
  return (
    <div>
      <div className={styles.communities_content_area}>
        <ContentList fetchItems={fetchPosts} renderItem={renderPosts}/>
      </div>
    </div>
  );
};

export default MyPostList;
