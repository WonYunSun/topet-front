import React from 'react';
import AnimalProfile from './AnimalProfile';
import PetList from './PetList';
import HashTagContent from './HashTagContent';

const BottomSheet = ({ show, onClose, onSelectPet, type, onCompleteTags }) => {
  return (
    <div className={`bottom-sheet ${show ? 'show' : ''}`}>
      <div className="bottom-sheet-content">
        {type === 'pet' ? (
          <PetList onSelectPet={onSelectPet} />
        ) : (
          <HashTagContent onComplete={onCompleteTags} />
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
