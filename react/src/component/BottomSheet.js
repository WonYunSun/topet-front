import React from 'react';
import PetList from './PetList';
import HashTagContent from './HashTagContent';
import '../css/bottomsheet.css'

const BottomSheet = ({ show, onClose, onSelectPet, type, onCompleteTags, initialTags }) => {  // initialTags 추가
  return (
    <div className={`bottom-sheet ${show ? 'show' : ''}`}>
        <div className='bottom-sheet-title'>
        {type === 'pet' ? (
          '반려동물 선택'
        ) : (
          '태그 선택'
        )}
        </div>
      <div className="bottom-sheet-content">
        {type === 'pet' ? (
          <PetList onSelectPet={onSelectPet} />
        ) : (
          <HashTagContent onComplete={onCompleteTags} initialTags={initialTags} /> // initialTags 추가
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
