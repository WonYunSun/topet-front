import React from 'react';
import { useSelector } from 'react-redux';
import '../css/animal_profile.css'


const PetList = ({ onSelectPet }) => {
  const petList = useSelector(state => state.main.petList);

  const handleSelectPet = (name) => {
    const url = petList[name];
    onSelectPet({name, url});
  };

  return (
    <div>
      {Object.entries(petList).map(([name, url]) => (
        <div key={name} className='animal-profile' onClick={() => handleSelectPet(name)}>
          <img src={url} alt={name} className='animal-img' />
          <p className='animal-name'>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default PetList;