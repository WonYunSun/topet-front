import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/communityWrite.module.css";
import TopBar from "../component/TopBar";
import Title from "../component/Title";
import Content from "../component/Content";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import "../css/bottomsheet.css";
import PhotoSelectArea from "../component/PhotoSelectComp/PhotoSelectArea";
import Button from "../component/ButtonComp/Button";
import communityApi from "../api/communityApi";
import CheckModal from "../component/CheckModal";
import HashTag from "../component/HashTagComp/HashTag";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

const CommunityWrite = () => {
  const reduxMemberId = useSelector((state) => state.member.member.id);
  
  // responsive
  const isDeskTop = useMediaQuery({
    query: "(min-width: 1110px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [edit, setEdit] = useState(false);
  const [comid, setComid] = useState(null);

  const [animal, setAnimal] = useState("");
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedHashTag, setSelectedHashTag] = useState([]);
  const [conversionStringHashTag, setConversionStringHashTag] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [showWriteCancleModal, setShowWriteCancleModal] = useState(false);
  const [showWriteNullCheckModal, setShowWriteNullCheckModal] = useState(false);
  const [submitCheck, setSubmitCheck] = useState(false);

  useEffect(() => {
    // 수정 시 변수 값 세팅
    if (state?.edit) {
      setEdit(true);
      setTitleText(state.title);
      setContentText(state.content);
      setSelectedPhotos(state.images);
      setSelectedCategory(state.category);
      setComid(state.comid);
    }
    if (state?.hashtag) {
      const hashtagsArray = state.hashtag.split(",").map((tag) => tag.trim());
      setSelectedHashTag(hashtagsArray);
    }
    if (state?.animal) {
      setAnimal(state.animal);
    }
  }, [state]);

  useEffect(() => {
    conversionHashTag();
  }, [selectedHashTag]);

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
    const updatedPhotos = [...selectedPhotos, ...newPhotos].slice(0, 5);
    setSelectedPhotos(updatedPhotos);
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const conversionHashTag = () => {
    const conversion = selectedHashTag.join(",");
    setConversionStringHashTag(conversion);
  };

  const handleSubmit = async () => {
    if (submitCheck || isSubmitDisabled) return; // 이미 전송 중이거나 필수값이 없으면 함수 종료
    setSubmitCheck(true); // 전송 중 상태로 설정
  
    try {
      const formData = new FormData();
      formData.append("animal", animal);
      formData.append("title", titleText);
      formData.append("content", contentText);
      formData.append("category", selectedCategory);
      formData.append("hashtag", conversionStringHashTag);
      formData.append("author", reduxMemberId);
      await communityApi.postCommunity(selectedPhotos, formData);
      navigate(-1); // 전송 후 페이지 이동
    } catch (error) {
      console.error("게시물 작성에 실패했습니다.", error);
    } finally {
      setSubmitCheck(false); // 전송 완료 후 상태 초기화
    }
  };

  const handleUpdate = async (comid) => {
    if (submitCheck || isSubmitDisabled) return; // 이미 전송 중이거나 필수값이 없으면 함수 종료
    setSubmitCheck(true); // 전송 중 상태로 설정
  
    try {
      const formData = new FormData();
      formData.append("title", titleText);
      formData.append("content", contentText);
      formData.append("category", selectedCategory);
      formData.append("hashtag", conversionStringHashTag);
      await communityApi.editCommunity(selectedPhotos, formData, comid);
      navigate(-1); // 전송 후 페이지 이동
    } catch (error) {
      console.error("게시물 수정에 실패했습니다.", error);
    } finally {
      setSubmitCheck(false); // 전송 완료 후 상태 초기화
    }
  };

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  const isSubmitDisabled = !titleText.trim() || !contentText.trim() || !selectedCategory;

  const handleShowCheckModal = () => {
    setShowWriteCancleModal(true);
  };

  const handleShowNullCheckModal = () => {
    setShowWriteNullCheckModal(true);
  };

  const handleCloseCancleModal = () => {
    setShowWriteCancleModal(false);
  };

  const handleNullCheckModal = () => {
    setShowWriteNullCheckModal(false);
  };

  const handleWriteCancleModal = () => {
    setShowWriteCancleModal(false);
    navigate(-1);
  };

  const handleCompleteTags = (category, tags) => {
    setSelectedCategory(category);
    setSelectedHashTag(tags);
    handleBottomSheetClose();
  };

  return (
    <div>
      <Mobile>
        <TopBar />
        <Title
          value={titleText}
          handleTitleTextChange={handleTitleTextChange}
        />
        <Content
          value={contentText}
          handleContentTextChange={handleContentTextChange}
          maxLength={1499}
          placeholder={"내용을 입력해주세요"}
        />
        <br />
        <PhotoSelectArea
          selectedPhotos={selectedPhotos}
          onPhotosSelected={handlePhotosSelected}
          onRemovePhoto={handleRemovePhoto}
          cnt={5}
        />
        <br />
        <HashTag
          selectedCategory={selectedCategory}
          selectedHashTag={selectedHashTag}
          handleBottomSheetOpen={handleBottomSheetOpen}
        />
        <div>
          <Button
            text={"취소"}
            btnstyle="white"
            onClick={handleShowCheckModal}
          />
          <Button
            text={edit ? "수정 완료" : "작성 완료"}
            btnstyle={isSubmitDisabled ? "white_disabled" : "white"}
            onClick={
              isSubmitDisabled
                ? handleShowNullCheckModal
                : edit
                ? () => handleUpdate(comid)
                : handleSubmit
            }
          />
        </div>
      </Mobile>
      <DeskTop>
        <div className={styles.comm_write_wrap}>
          <Title
            value={titleText}
            handleTitleTextChange={handleTitleTextChange}
          />
          <Content
            value={contentText}
            handleContentTextChange={handleContentTextChange}
            maxLength={1499}
            placeholder={"내용을 입력해주세요"}
          />
          <br />
          <PhotoSelectArea
            selectedPhotos={selectedPhotos}
            onPhotosSelected={handlePhotosSelected}
            onRemovePhoto={handleRemovePhoto}
            cnt={5}
          />
          <br />
          <HashTag
            selectedCategory={selectedCategory}
            selectedHashTag={selectedHashTag}
            handleBottomSheetOpen={handleBottomSheetOpen}
          />
          <div className={styles.dtBtn}>
            <Button
              text={"취소"}
              btnstyle="white"
              onClick={handleShowCheckModal}
            />
            <Button
              text={edit ? "수정 완료" : "작성 완료"}
              btnstyle={isSubmitDisabled ? "white_disabled" : "white"}
              onClick={
                isSubmitDisabled
                  ? handleShowNullCheckModal
                  : edit
                  ? () => handleUpdate(comid)
                  : handleSubmit
              }
            />
          </div>
        </div>
      </DeskTop>
      {showWriteCancleModal && (
        <CheckModal
          Content="게시물 작성을 취소하시겠어요?"
          CancleBtnContent="작성 취소"
          ContinueBtnContent="계속 작성"
          onClose={handleWriteCancleModal}
          onContinue={handleCloseCancleModal}
        />
      )}
      {showWriteNullCheckModal && (
        <CheckModal
          Content="제목, 본문, 해시태그는 필수 항목입니다."
          onClose={handleNullCheckModal}
          oneBtn={true}
        />
      )}
      <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
        selectedDate={new Date()}
        handleCompleteTags={handleCompleteTags}
        initialSelectedCategory={selectedCategory}
        initialSelectedHashTag={selectedHashTag}
      />
    </div>
  );
};

export default CommunityWrite;
