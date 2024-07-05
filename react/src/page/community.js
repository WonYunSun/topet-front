import React from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar';
import CommunityPreview from '../component/CommunityPreview';
import styles from '../css/community.module.css';
import CommunityContentArea from '../component/CommunityContentArea';



const Community = () => {
    const navigate = useNavigate();

    const goCommunityWrite = () => {
        navigate('/community/communityWrite');
    }
  return (
    <div className={styles.community}>
      <TopBar />
      <button onClick={goCommunityWrite}>글 작성 이동</button>
      <CommunityContentArea />
      
      
    </div>
  )
}

export default Community
