import React from "react";
import AnimalProfile from "./AnimalProfile";
import { GoChevronDown } from "react-icons/go";
import "../../css/animal_profile.css";

const AnimalSelect = ({ onClick, selectedPet, isHome }) => {
  return (
    <div className={`animal-select ${isHome ? "home" : ""}`} onClick={onClick}>
      <AnimalProfile selectedPet={selectedPet} />
      <GoChevronDown className="arrow-bottom" />
    </div>
  );
};

export default AnimalSelect;
