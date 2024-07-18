import React, { useState } from 'react';
import styles from '../../css/ComentList.module.css';

const ComentList = () => {
  const ComentValueList = [
    "댓글0입니다.", "댓글1입니다.", "댓글2입니다.", "댓글3입니다.",
    "댓글4입니다.", "댓글5입니다.", "댓글6입니다.", "댓글7입니다.",
    "댓글8입니다.", "댓글9입니다.", "댓글10입니다.", "댓글11입니다.",
    "댓글12입니다.", "댓글13입니다.", "댓글14입니다."
  ];

  const [userProfile, setUserProfile] = useState("https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDdfMjEy/MDAxNjQ0MTk0Mzk2MzY3.WAeeVCu2V3vqEz_98aWMOjK2RUKI_yHYbuZxrokf-0Ug.sV3LNWlROCJTkeS14PMu2UBl5zTkwK70aKX8B1w2oKQg.JPEG.41minit/1643900851960.jpg?type=w800");
  const [userName, setUserName] = useState("코코아빠");

  return (
    <div className={styles.comentContainer}>
      {ComentValueList.map((coment, index) => (
        <div key={index} className={styles.comentItem}>
          <div className={styles.userProfileContent}>
            <div className={styles.userProfileContainer}>
              <img src={userProfile} alt="User Profile" className={styles.userProfile} />
              <span className={styles.userName}>{userName}</span>
            </div>
            <div className={styles.comentText}>
              {coment}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComentList;
