import React, { useState } from "react";
import axios from "axios";
import TopBar from "../component/TopBar";
import Title from "../component/Title";
import Content from "../component/Content";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import HashTag from "../component/HashTagComp/HashTag";
import "../css/bottomsheet.css";
import PhotoSelectArea from "../component/PhotoSelect/PhotoSelectArea";
import Button from "../component/ButtonComp/Button";

const CommunityWrite = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
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

                  const postServer_withPhotos = () => {
                    const formData = new FormData();

                    selectedPhotos.slice(0, 10).forEach((photo, index) => {
                      formData.append("photos", photo);
                    });

                    axios
                      .post("/api/community/community/postPhoto", formData, {
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
                  };

                  const postServer_withoutPhotos = () => {
                    const formData = new FormData();

                    formData.append("title", titleText);
                    formData.append("content", contentText);

                    const hashtagsString = selectedTags
                      .map((tag, index) => `${index + 1},${tag}`)
                      .join("");
                    formData.append("hashtag", hashtagsString);

                    axios
                      .post("/api/community/community/post", formData, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                      .then((response) => {
                        console.log("서버 응답:", response.data);
                      })
                      .catch((error) => {
                        console.error("서버 오류:", error);
                      });
                  };

                  const handleSubmit = () => {
                    if (selectedPhotos.length > 0) {
                      postServer_withPhotos();
                      postServer_withoutPhotos();
                    } else {
                      postServer_withoutPhotos();
                    }
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
      />
      <div>
        <Button text={"취소"} btnstyle="white" />
        <Button
          text={"작성 완료"}
          btnstyle="white"
          onClick={handleSubmit}
        />
      </div>
      <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
        initialTags={selectedTags}
        setSelectedPet={setSelectedPet}
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
        selectedDate={new Date()}
      />
    </div>
  );
};

export default CommunityWrite;
