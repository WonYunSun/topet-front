import React, { useEffect, useState } from 'react';
import CommunityApi from '../../api/communityApi';
import styles from '../../css/CommentList.module.css';
import { FiMoreVertical } from "react-icons/fi";

const CommentList = ({ comid }) => {
  const [comments, setComments] = useState([]);
  const [userProfile, setUserProfile] = useState("https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDdfMjEy/MDAxNjQ0MTk0Mzk2MzY3.WAeeVCu2V3vqEz_98aWMOjK2RUKI_yHYbuZxrokf-0Ug.sV3LNWlROCJTkeS14PMu2UBl5zTkwK70aKX8B1w2oKQg.JPEG.41minit/1643900851960.jpg?type=w800");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommunityApi.fetchComment(comid);
        setComments(response);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [comid]);

  return (
    <div className={styles.comentContainer}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comentItem}>
          <div className={styles.userProfileContent}>
            <div className={styles.userProfileContainer}>
              <img src={userProfile} alt="User Profile" className={styles.userProfile} />
              <span className={styles.userName}>{comment.author.name}</span>
              <div className={styles.moreIconContainer}>
                <FiMoreVertical className={styles.moreIcon} />
              </div>
            </div>
            <div className={styles.comentText}>
              {comment.content}
            </div>
          </div>
          <div className={styles.repliesContainer}>
            {comment.children && comment.children.map((reply) => (
              <div key={reply.id} className={styles.replyItem}>
                <div className={styles.userProfileContent}>
                  <div className={styles.userProfileContainer}>
                    <img src={userProfile} alt="User Profile" className={styles.userProfile} />
                    <span className={styles.userName}>{reply.author.name}</span>
                    <div className={styles.moreIconContainer}>
                      <FiMoreVertical className={styles.moreIcon} />
                    </div>
                  </div>
                  <div className={styles.comentText}>
                    {reply.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
