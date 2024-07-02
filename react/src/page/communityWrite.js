import React, { useState } from 'react';
import TopBar from '../component/TopBar';
import Title from '../component/Title';
import Content from '../component/Content';
import AnimalSelect from '../component/AnimalSelect';
import BottomSheet from '../component/BottomSheet';

const CommunityWrite = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleOpenBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    handleCloseBottomSheet();
  };

  return (
    <div>
      <TopBar />
      <AnimalSelect onClick={handleOpenBottomSheet} selectedPet={selectedPet} />
      <div style={{ height: '10px' }}></div>
      <Title />
      <div style={{ height: '20px' }}></div>
      <Content />
      {showBottomSheet && (
        <div className="overlay" onClick={handleCloseBottomSheet}></div>
      )}
      <BottomSheet show={showBottomSheet} onClose={handleCloseBottomSheet} onSelectPet={handleSelectPet} />
    </div>
  );
}

export default CommunityWrite;
