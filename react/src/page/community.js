import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../component/TopBar";
import BottomSheet from "../component/BottomSheet";
import styles from "../css/community.module.css";
import CommunityList from "../component/CommunityComp/CommunityList";
import FloatingBtn from "../component/ButtonComp/FloatingBtn";

const Community = () => {
  const navigate = useNavigate();
  const { animalType, category } = useParams();

  const animalTypeMapReverse = {
    dog: "강아지",
    cat: "고양이",
    exoticpet: "특수동물",
  };
  const selectedAnimalType = animalTypeMapReverse[animalType] || "강아지";

  const [selectedCenter, setSelectedCenter] = useState(selectedAnimalType);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState("");

  const goCommunityWrite = () => {
    navigate("/api/community/communityWrite");
  };

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  const handleSelectPet = (pet) => {
    setSelectedCenter(pet);
    const animalTypeMap = {
      강아지: "dog",
      고양이: "cat",
      특수동물: "exoticpet",
    };
    const newAnimalType = animalTypeMap[pet] || "dog";
    navigate(`/community/preview/${newAnimalType}/freedomAndDaily`, {
      replace: true,
    });
  };

  useEffect(() => {
    // Fetch data whenever selectedCenter or category changes
  }, [selectedCenter, category]);

  return (
    <div className={styles.community}>
      <TopBar
        centerChange={selectedCenter}
        handleBottomSheetOpen={handleBottomSheetOpen}
      />
      <CommunityList selectedAnimal={selectedCenter} />
      <FloatingBtn onClick={goCommunityWrite} />
      <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
        initialTags={[]}
        setSelectedPet={handleSelectPet}
        setSelectedTags={() => {}}
        selectedTags={[]}
        selectedDate={new Date()}
      />
    </div>
  );
};

export default Community;
