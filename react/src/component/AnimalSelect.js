import React from 'react';
import AnimalProfile from './AnimalProfile';
import { GoChevronDown } from "react-icons/go";


const AnimalSelect = ({ onClick, selectedPet }) => {
  return (
    <div className='animal-select' onClick={onClick}>
      <AnimalProfile selectedPet={selectedPet}/>
      <GoChevronDown className='arrow-bottom' />
    </div>
  );
}

export default AnimalSelect;
