import React from "react";
import AnimalProfile from "./AnimalProfile";
import { GoChevronDown } from "react-icons/go";
import "../../css/animal_profile.css";

const AnimalSelect = ({ onClick, selectedPet, setSelectedPet ,isHome, pets }) => {
  
  if(selectedPet == null){
    if(pets == null){
      
    }else{
      setSelectedPet(pets[0]);
    }
  }
  
  return (
    <div
      className={`animal-select ${isHome ? "homeComp" : ""}`}
      onClick={onClick}
    >
      <AnimalProfile selectedPet={selectedPet} isHome={isHome} pets={pets}/>
      <GoChevronDown className="arrow-bottom" />
    </div>
  );
};

export default AnimalSelect;
