import React, { useState, useEffect } from "react";
import axios from "axios";
import TopBar from "../component/TopBar";
import Title from "../component/Title";
import Content from "../component/Content";
import AnimalSelect from "../component/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import HashTag from "../component/HashTag";
import "../css/bottomsheet.css";
import PhotoSelectArea from "../component/PhotoSelectArea";
import Button from "../component/Button";

const CommunityWrite = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [tempTags, setTempTags] = useState([]);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState([]); //selectedPhotos에 사진이 저장되어 있음.
  const [selectedTags, setSelectedTags] = useState([]); //selectedTags를 백엔드에 넘겨주면 됨.

  const handleOpenPetBottomSheet = () => {
    //petList를 bottomSheet에 띄어주기 위한 함수
    setBottomSheetType("pet");
    setShowBottomSheet(true);
  };

  const handleSelectPet = (pet) => {
    //pet선택 함수
    setSelectedPet(pet);
    handleCloseBottomSheet();
  };

  const handleOpenTagBottomSheet = () => {
    //hashTag를 bottomSheet에 띄어주기 위한 함수
    setBottomSheetType("tag");
    setTempTags([...selectedTags]);
    setShowBottomSheet(true);
  };

  const handleCompleteTags = (requiredTag, optionalTags) => {
    //선택된 hashTag들을 저장하기 위한 함수
    setSelectedTags([requiredTag, ...optionalTags]);
    handleCloseBottomSheet();
  };

  const handleCloseBottomSheet = () => {
    // bottomSheet를 닫는 함수
    setShowBottomSheet(false);
  };

  const handleTitleTextChange = (e) => {
    // 제목 저장 함수
    setTitleText(e.target.value);
  };

  const handleContentTextChange = (e) => {
    // 본문 저장 함수
    setContentText(e.target.value);
  };

  const handlePhotosSelected = (photos) => {
    //사진 저장 함수
    const newPhotos = photos.filter(
      (photo) =>
        !selectedPhotos.some(
          (selectedPhoto) => selectedPhoto.name === photo.name
        )
    );
    const updatedPhotos = [...selectedPhotos, ...newPhotos].slice(0, 10);

    axios
      .post("/api/community/community/postPhoto", photos, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("서버 응답:", response.data);
      })
      .catch((error) => {
        console.error("서버 오류:", error);
      });

    setSelectedPhotos(updatedPhotos);
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const postServer = () => {
    //서버 전송 함수
    const data = {
      title: titleText,
      content: contentText,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    selectedPhotos.forEach((photo, index) => {
      formData.append(`photo_${index}`, photo);
    });

    selectedTags.forEach((tag, index) => {
      formData.append(`hashtag_${index}`, tag);
    });
  };

  useEffect(() => {
    if (!showBottomSheet && bottomSheetType === "tag") {
      setTempTags([]);
    }
  }, [showBottomSheet, bottomSheetType]);

  useEffect(() => {
    console.log("selectedTags:", selectedTags);
  }, [selectedTags]);

  return (
    <div>
      <TopBar />
      <AnimalSelect
        onClick={handleOpenPetBottomSheet}
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
      />
      <br />
      <HashTag onClick={handleOpenTagBottomSheet} selectedTags={selectedTags} />
      <div>
        <Button text={"취소"} btnstyle="white" />
        <Button text={"작성 완료"} btnstyle="white" postServer={postServer} />
      </div>
      <BottomSheet
        show={showBottomSheet}
        onClose={handleCloseBottomSheet}
        onSelectPet={handleSelectPet}
        type={bottomSheetType}
        onCompleteTags={handleCompleteTags}
        initialTags={tempTags}
        selectedDate={new Date()}
      />
    </div>
  );
};

export default CommunityWrite;
