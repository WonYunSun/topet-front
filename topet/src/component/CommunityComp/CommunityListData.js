import React from 'react';
import { BiSolidLike } from "react-icons/bi";
import { BsChatFill } from "react-icons/bs";
import styles from '../../css/communityList.module.css';
import { useNavigate } from 'react-router-dom';

const CommunityListData = ({ item }) => {
    
  console.log(item);
  const navigate = useNavigate();


  const formatHashtags = (hashtag) => {
    
    if(hashtag == null){
      return;
    }
    if(hashtag.length == 0 ){
      return;
    }
    else{
      return (
        <>
          {(hashtag != null)?
          (hashtag.length>0 && hashtag.map((tag, index) => (
            <span key={index} className={styles.hashtag}>#{tag.tag}</span>
          ))): <div></div>}
          {/* {remainingTagsCount > 0 && (
            <span className={styles.hashtag}>+{remainingTagsCount}</span>
          )} */}
        </>
      );

    }
    console.log(hashtag)
    const tags = hashtag;
      // .map(tag => tag.trim())
      // .filter(tag => tag !== '');

    // const visibleTags = tags.slice(0, 3);
    // const remainingTagsCount = tags.length - visibleTags.length;

    


  };

  const handlePostClick = (comid) => {
    navigate(`/community/detail/${comid}`);
  };

  return (
    <div onClick={() => handlePostClick(item.id)}>
      <div className={styles.each_community_area}>
        <div className={styles.content_and_photo_container}>
          <div className={styles.titleContentWrap}>
            <div className={styles.community_title}>{item.title}</div>
            <div className={styles.community_content}>{item.content}</div>
          </div>
          {item.thumbnail && item.thumbnail!=null && (
            <div className={styles.community_photo}>
              <img src={item.thumbnail} alt={item.thumbnail} />
            </div>
          )}
        </div>
        <div className={styles.community_hashtags}>
          {/* {formatHashtags(item.hashtag)} */}
          {item.hashtag &&
          (item.hashtag.map((tag, index) => (
            <span key={index} className={styles.hashtag}>#{tag.tag}</span>
          )))}
          </div>
        <div className={styles.like_and_coment}>
          <div className="icon-group">
            <BiSolidLike className={styles.icon}/>
            <span> {item.likeCount}</span> {/* 좋아요 수 */}
          </div>
          <div className="icon-group">
            <BsChatFill className={styles.icon}/>
            <span> {item.commentCount}</span> {/* 댓글 수 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityListData;
