import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePetList } from "../../redux/reducers/petListReducer";
import "../../css/animal_profile.css";

const  AnimalProfile = ({ selectedPet, isHome, pets , }) => {
  const dispatch = useDispatch();
  const petList = useSelector((state) => state.petList.petList);

  //console.log("pets : " , pets);
    

  const [animalName, setAnimalName] = useState("");
  const [animalProfileSrc, setAnimalProfileSrc] = useState("");

  useEffect(() => {
    //dispatch(updatePetList(initialPetList));
  }, [
    //dispatch
  ]);

  // useEffect(() => {
  //   if (petList && Object.keys(petList).length > 0) {
      
  //     const firstPetName = Object.keys(petList)[0];
  //     setAnimalName(firstPetName);
  //     setAnimalProfileSrc(petList[firstPetName]);
      
  //   }
  // }, [petList]);

  useEffect(() => {
    if (selectedPet) {
      setAnimalName(selectedPet.name);
      setAnimalProfileSrc(selectedPet.url);
    }
  }, [selectedPet]);

  const profileClass = `animal-profile ${isHome ? "homeComp" : ""}`;
  const imgClass = `animal-img ${isHome ? "homeComp" : ""}`;
  const nameClass = `animal-name ${isHome ? "homeComp" : ""}`;

  return (
    <div className={profileClass}>
      <img src={animalProfileSrc} alt={animalName} className={imgClass} />
      <p className={nameClass}>{animalName}</p>
    </div>
  );
};

export default AnimalProfile;
