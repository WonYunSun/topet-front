import React from 'react';
import AnimalProfile from './AnimalProfile';
import PetList from './PetList';


const BottomSheet = ({ show, onSelectPet }) => {
  return (
    <div className={`bottom-sheet ${show ? 'show' : ''}`}>
      <div className="bottom-sheet-content">
        <PetList onSelectPet={onSelectPet} />
      </div>
    </div>
  );
};

export default BottomSheet;
