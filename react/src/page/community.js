import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar';
import CommunityPreview from '../component/CommunityPreview';
import styles from '../css/community.module.css';
import CommunityContentArea from '../component/CommunityContentArea';
import BottomSheet from '../component/BottomSheet';



const Community = () => {

  const navigate = useNavigate();
  const lacation = useLocation();
  const animalType = lacation.state?.animalType;

  const goCommunityWrite = () => {
    navigate('/api/community/communityWrite');
  }






  return (
    <div className={styles.community}>
      <TopBar centerChange = {animalType}/>
      <button onClick={goCommunityWrite}>글 작성 이동</button>
      <CommunityContentArea />
    </div>
  )
}

export default Community
