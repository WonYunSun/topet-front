import React, { useState } from "react";
import TopBar from "../component/TopBar";
import Title from "../component/Title";
import Content from "../component/Content";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import HashTag from "../component/HashTagComp/HashTag";
import "../css/bottomsheet.css";
import PhotoSelectArea from "../component/PhotoSelectComp/PhotoSelectArea";
import Button from "../component/ButtonComp/Button";
import communityApi from "../api/communityApi";

const CommunityWrite = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);

  const handleTitleTextChange = (e) => {
    setTitleText(e.target.value);
  };

  const handleContentTextChange = (e) => {
    setContentText(e.target.value);
  };

  const handlePhotosSelected = (photos) => {
    const newPhotos = photos.filter(
      (photo) =>
        !selectedPhotos.some(
          (selectedPhoto) => selectedPhoto.name === photo.name
        )
    );
    const updatedPhotos = [...selectedPhotos, ...newPhotos].slice(0, 10);

    setSelectedPhotos(updatedPhotos);
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };


  const handleSubmit = () => { // 서버 전송 함수
    const formData = new FormData();
    formData.append("title", titleText)
    formData.append("content", contentText);
    formData.append("category" , selectedCategory);
    formData.append("hashtag", selectedTags);
    communityApi.postCommunity(selectedPhotos, formData);
    
  };

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  return (
    <div>
      <TopBar />
      <AnimalSelect
        onClick={() => handleBottomSheetOpen("pet")}
        selectedPet={selectedPet}
      />
      <div style={{ height: "10px" }}></div>
      <Title value={titleText} handleTitleTextChange={handleTitleTextChange} />
      <div style={{ height: "20px" }}></div>
      <Content
        value={contentText}
        handleContentTextChange={handleContentTextChange}
      />
      <br />
      <PhotoSelectArea
        selectedPhotos={selectedPhotos}
        onPhotosSelected={handlePhotosSelected}
        onRemovePhoto={handleRemovePhoto}
        cnt={10}
      />
      <br />
      <HashTag
        onClick={() => handleBottomSheetOpen("tag")}
        selectedTags={selectedTags}
        selectedCategory = {selectedCategory}
        
      />
      <div>
        <Button text={"취소"} btnstyle="white" />
        <Button text={"작성 완료"} btnstyle="white" onClick={handleSubmit} />
      </div>
      <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
        initialTags={selectedTags}
        setSelectedPet={setSelectedPet}
        
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}

        selectedCategory ={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDate={new Date()}
      />
    </div>
  );
};

export default CommunityWrite;
