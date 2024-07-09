import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar';
import CommunityPreview from '../component/Community/CommunityListData';
import styles from '../css/community.module.css';

import BottomSheet from '../component/BottomSheet';
import CommunityList from '../component/Community/CommunityList';



const Community = () => {
  const [selectedCenter, setSelectedCenter] = useState("");


  const navigate = useNavigate();
  const location = useLocation();
  const animalType = location.state?.animalType;

  const goCommunityWrite = () => {
    navigate('/api/community/communityWrite');
  }

  const ontextChange  = () => {
    if(selectedCenter == "") {
      return animalType
    } else {
      return selectedCenter
    }
  }




  return (
    <div className={styles.community}>
      <TopBar centerChange = {ontextChange()}/>
      <button onClick={goCommunityWrite}>글 작성 이동</button>
      <CommunityList selectedAnimal={ontextChange()}/>
    </div>
  )
}

export default Community
