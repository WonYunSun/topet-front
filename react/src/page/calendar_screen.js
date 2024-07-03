import React, { useEffect, useState } from "react";
import { Calendar } from "./../component/Calendar";
import TopBar from "../component/TopBar";

import AnimalSelect from "../component/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import "../css/bottomsheet.css";

export const Calendarscreen = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleOpenPetBottomSheet = () => {
    setBottomSheetType("pet");
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    handleCloseBottomSheet();
  };

  return (
    <div>
      <TopBar />
      <AnimalSelect
        onClick={handleOpenPetBottomSheet}
        selectedPet={selectedPet}
      />
      <Calendar />
      <BottomSheet
        show={showBottomSheet}
        onClose={handleCloseBottomSheet}
        onSelectPet={handleSelectPet}
        type={bottomSheetType}
        initialTags={[]}
      />
    </div>
  );
};
export default Calendarscreen;
