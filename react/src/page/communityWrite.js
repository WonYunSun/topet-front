import React, { useState, useEffect } from 'react';
import TopBar from '../component/TopBar';
import Title from '../component/Title';
import Content from '../component/Content';
import AnimalSelect from '../component/AnimalSelect';
import BottomSheet from '../component/BottomSheet';
import HashTag from '../component/HashTag';
import '../css/bottomsheet.css';
import PhotoSelectArea from '../component/PhotoSelectArea';
import WhiteButton from '../component/WhiteButton';

const CommunityWrite = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]); //selectedTags를 백엔드에 넘겨주면 됨.
  const [tempTags, setTempTags] = useState([]);

  const handleOpenPetBottomSheet = () => {
    setBottomSheetType('pet');
    setShowBottomSheet(true);
  };

  const handleOpenTagBottomSheet = () => {
    setBottomSheetType('tag');
    setTempTags([...selectedTags]);
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    handleCloseBottomSheet();
  };

  const handleCompleteTags = (requiredTag, optionalTags) => {
    setSelectedTags([requiredTag, ...optionalTags]);
    handleCloseBottomSheet();
  };

  useEffect(() => {
    if (!showBottomSheet && bottomSheetType === 'tag') {
      setTempTags([]);
    }
  }, [showBottomSheet, bottomSheetType]);

  useEffect(() => {
    console.log('selectedTags:', selectedTags);
  }, [selectedTags]);

  return (
    <div>
      <TopBar />
      <AnimalSelect onClick={handleOpenPetBottomSheet} selectedPet={selectedPet} />
      <div style={{ height: '10px' }}></div>
      <Title />
      <div style={{ height: '20px' }}></div>
      <Content />
      <br />
      <PhotoSelectArea />
      <br />
      <HashTag onClick={handleOpenTagBottomSheet} selectedTags={selectedTags} />
      {showBottomSheet && (
        <div className="overlay" onClick={handleCloseBottomSheet}></div>
      )}
      <div>
      <WhiteButton text={'취소'} />
      <WhiteButton text={'작성 완료'} />
      </div>
      <BottomSheet
        show={showBottomSheet}
        onClose={handleCloseBottomSheet}
        onSelectPet={handleSelectPet}
        type={bottomSheetType}
        onCompleteTags={handleCompleteTags}
        initialTags={tempTags}
      />
    </div>
  );
};

export default CommunityWrite;
