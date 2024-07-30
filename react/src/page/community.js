import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../component/TopBar";
import BottomSheet from "../component/BottomSheet";
import styles from "../css/community.module.css";
import CommunityList from "../component/CommunityComp/CommunityList";
import FloatingBtn from "../component/ButtonComp/FloatingBtn";
import { IoMdArrowDropdown } from "react-icons/io";

const animalTypeMapReverse = {
  dog: "강아지",
  cat: "고양이",
  exoticpet: "특수동물",
};

const animalTypeMap = {
  강아지: "dog",
  고양이: "cat",
  특수동물: "exoticpet",
};

const categoryMap = {
  freedomAndDaily: "자유/일상",
  curious: "궁금해요",
  sharingInformation: "정보공유",
};

const Community = () => {
  const navigate = useNavigate();
  const { animalType, category } = useParams();

  const selectedAnimalType = animalTypeMapReverse[animalType] || "강아지";

  const [selectedCenter, setSelectedCenter] = useState(selectedAnimalType);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState("");
  const [currentCategory, setCurrentCategory] = useState(
    categoryMap[category] || "자유/일상"
  );
  const [sortListText, setSortListText] = useState("최신순");

  const goCommunityWrite = () => {
    const animalKey = animalTypeMap[selectedAnimalType] || "dog";
    navigate("/community/communityWrite", { state: { animal: animalKey } });
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
    const newAnimalType = animalTypeMap[pet] || "dog";
    navigate(`/community/preview/${newAnimalType}/freedomAndDaily`, {
      replace: true,
    });
  };

  const handleSelectSortListText = (text) => {
    setSortListText(text);
    handleBottomSheetClose();
  };

  const handleCategoryChange = (newCategory) => {
    const animalKey = animalTypeMap[selectedCenter] || "dog";
    navigate(`/community/preview/${animalKey}/${newCategory}`, {
      replace: true,
    });
    setCurrentCategory(categoryMap[newCategory] || "자유/일상");
  };

  useEffect(() => {
    setCurrentCategory(categoryMap[category] || "자유/일상");
  }, [category]);

  return (
    <div className={styles.community}>
      <TopBar
        centerChange={selectedCenter}
        handleBottomSheetOpen={handleBottomSheetOpen}
      />

      <div className={styles.category_buttons_area}>
        <button
          className={styles.category_button}
          onClick={() => handleCategoryChange("freedomAndDaily")}
          disabled={category === "freedomAndDaily"}
        >
          #자유/일상
        </button>
        <button
          className={styles.category_button}
          onClick={() => handleCategoryChange("curious")}
          disabled={category === "curious"}
        >
          #궁금해요
        </button>
        <button
          className={styles.category_button}
          onClick={() => handleCategoryChange("sharingInformation")}
          disabled={category === "sharingInformation"}
        >
          #정보공유
        </button>
      </div>

      <div className={styles.menu_area}>
        <div className={styles.category_text}>#{currentCategory}</div>
        <div
          className={styles.sort_option}
          onClick={() => handleBottomSheetOpen("sort")}
        >
          {sortListText}
          <IoMdArrowDropdown />
        </div>
      </div>
      <CommunityList
        selectedAnimal={selectedCenter}
        sortListText={sortListText}
      />
      <FloatingBtn onClick={goCommunityWrite} />
      <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
        setSelectedPet={handleSelectPet}
        handleSelectSortListText={handleSelectSortListText}
      />
    </div>
  );
};

export default Community;
