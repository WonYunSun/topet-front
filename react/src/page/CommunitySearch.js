import React, { useState } from 'react';
import TopBar from '../component/TopBar';
import { useLocation } from 'react-router-dom';
import BottomSheet from '../component/BottomSheet';
import CommunityUserSearchRecord from '../component/CommunityComp/CommunityUserSearchRecord';

const CommunitySearch = () => {
  const location = useLocation();
  const { centerChange } = location.state || {};

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState("");
  const [selectedSearchType, setSelectedSearchType] = useState("제목+본문");
  const [searchText, setSearchText] = useState("");

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  return (
    <div>
      <TopBar centerChange={centerChange} selectedSearchType={selectedSearchType} handleBottomSheetOpen={handleBottomSheetOpen} searchText={searchText} setSearchText={setSearchText} />
      <CommunityUserSearchRecord />
      <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
        initialTags={[]}
        setSelectedPet={[]}
        setSelectedTags={() => {}}
        selectedTags={[]}
        selectedDate={new Date()}
        setSelectedSearchType={setSelectedSearchType}
      />
    </div>
  );
};

export default CommunitySearch;
