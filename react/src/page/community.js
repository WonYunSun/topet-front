import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar';
import BottomSheet from '../component/BottomSheet';
import styles from '../css/community.module.css';
import CommunityList from '../component/CommunityComp/CommunityList';
import FloatingBtn from '../component/ButtonComp/FloatingBtn';

const Community = () => {
  const [selectedCenter, setSelectedCenter] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const animalType = location.state?.animalType;

  const goCommunityWrite = () => {
    navigate('/api/community/communityWrite');
  }

  const ontextChange = () => {
    return selectedCenter || animalType;
  }

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  return (
    <div className={styles.community}>
      <TopBar centerChange={ontextChange()} handleBottomSheetOpen={handleBottomSheetOpen} />
      <CommunityList selectedAnimal={ontextChange()} />
      <FloatingBtn onClick={goCommunityWrite}/>
      <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
        initialTags={[]}
        setSelectedPet={setSelectedCenter}
        setSelectedTags={() => {}}
        selectedTags={[]}
        selectedDate={new Date()}
      />
    </div>
  );
}

export default Community;
