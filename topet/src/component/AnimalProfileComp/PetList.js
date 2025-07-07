import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../css/animal_profile.css'


const PetList = ({ onSelectPet }) => {
  
  const petList = useSelector(state => state.petList.petList);
  
  const handleSelectPet = (pet) => {
    onSelectPet(pet);

//    console.log("PetList에서 출력한 pet :  ", pet);
  };

  return (
    <div>
    {petList.map((pet, idx) => (
      <div key={idx} className='animal-profile' onClick={() => handleSelectPet(pet)}>
        <img src={pet.profileSrc || 'default-image.jpg'} alt={pet.name} className='animal-img' />
        <p className='animal-name'>{pet.name}</p>
      </div>
    ))}
  </div>
  );
};

export default PetList;