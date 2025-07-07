import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SchedulePhotoSelectArea from "../component/CalendarComp/SchedulePhotoSelectArea";
import shortsApi from "../api/shortsApi";
import Content from "../component/Content";
import TopBar from "../component/TopBar";
import Button from "../component/ButtonComp/Button";
import CheckModal from "../component/CheckModal";
import styles from "../css/addshorts.module.css";
import { LuUpload } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { Loading } from "../component/HandlerComp/CompHandler";
import { Mobile, DeskTop } from "../responsive/responsive";

function AddShorts() {
  const reduxMember = useSelector((state) => state.member.member);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");

  // const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showWriteNullCheckModal, setShowWriteNullCheckModal] = useState(false);
  const [showWriteCancleModal, setShowWriteCancleModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const isSubmitDisabled = !videoPreviewUrl || !selectedPhoto;
  const videoSelect = () => {
    fileInputRef.current.click();
  };

  const handlePhotoSelected = (photo) => {
    setSelectedPhoto(photo);
  };

  useEffect(() => {}, [loading]);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // 처리할 파일이 이미지인 경우
    const validImages = files.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    if (validImages.length > 0) {
      handlePhotoSelected(validImages[0]); // 이미지 처리
    }

    // 처리할 파일이 동영상인 경우
    const validVideos = files.filter((file) => file.type.startsWith("video/"));
    if (validVideos.length > 0) {
      const videoFile = validVideos[0];
      setSelectedVideo(videoFile);
      const videoUrl = URL.createObjectURL(videoFile);
      setVideoPreviewUrl(videoUrl);
    }

    event.target.value = null; // 입력값 리셋
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
  };

  const handleRemoveVideo = () => {
    setSelectedVideo(null);
    setVideoPreviewUrl(""); // 비디오 미리보기 URL 초기화
  };
  const handleShowNullCheckModal = () => {
    setShowWriteNullCheckModal(true);
  };
  const handleShowCheckModal = () => {
    setShowWriteCancleModal(true);
  };
  const navigate = useNavigate();
  const handleWriteCancleModal = () => {
    setShowWriteCancleModal(false);
    navigate(-1);
  };
  const handleCloseCancleModal = () => {
    setShowWriteCancleModal(false);
  };
  const handleNullCheckModal = () => {
    setShowWriteNullCheckModal(false);
  };
  // const titleChange = (e) => {
  //   const tempTitle = e.target.value || "";
  //   setTitle(tempTitle);
  // };

  const contentChange = (e) => {
    const tempContent = e.target.value || "";
    setContent(tempContent);
  };

  const submitShorts = async () => {
    setLoading(true);

    const formData = new FormData();
    // formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnailPhoto", selectedPhoto);
    formData.append("video", selectedVideo);
    formData.append("author", reduxMember.id);
    const resp = await shortsApi.postShorts(formData);

    if (resp.status === 200) {
      console.log("들어감");
      setLoading(false);
      navigate(`/shortsDetail/${resp.data.id}`);
    } else {
      console.log("안들어감");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Mobile>
        <TopBar />
        <div>
          <Content
            value={content}
            handleContentTextChange={contentChange}
            maxLength={99}
            placeholder={"동영상 설명을 입력해주세요"}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*" // 이미지와 비디오 파일 모두 허용
            multiple
            style={{ display: "none" }}
          />

          {selectedVideo == null ? (
            <>
              <div className={styles.divtext}>동영상을 선택해주세요</div>
              <div className={styles.upload_div} onClick={videoSelect}>
                <LuUpload size={30} />
              </div>
            </>
          ) : (
            <div></div>
          )}
          {selectedVideo && (
            <div className={styles.videoPreview_wrap}>
              <div className={styles.divtext}>동영상 미리보기</div>
              <div className={styles.videoBoxDiv}>
                <video
                  className={styles.videoPreview}
                  height="95"
                  controls
                  controlsList="nodownload"
                >
                  <source src={videoPreviewUrl} type={selectedVideo.type} />
                  Your browser does not support the video tag.
                </video>

                <div
                  className={styles.videoPreview_rmv}
                  onClick={handleRemoveVideo}
                >
                  <IoIosClose size={19} />
                </div>
              </div>
            </div>
          )}
          <div className={styles.divtext}>썸네일을 선택해주세요</div>
          {/* SchedulePhotoSelectArea 컴포넌트가 실제로 어떻게 동작하는지에 따라 수정 필요 */}
          <SchedulePhotoSelectArea
            selectedPhoto={selectedPhoto}
            onPhotoSelected={handlePhotoSelected}
            onRemovePhoto={handleRemovePhoto}
          />
        </div>
        <div>
          <Button
            text={"취소"}
            btnstyle="white"
            onClick={handleShowCheckModal}
          />
          <Button
            text={"작성 완료"}
            // text={edit ? "수정 완료" : "작성 완료"}
            btnstyle={isSubmitDisabled ? "white_disabled" : "white"}
            onClick={isSubmitDisabled ? handleShowNullCheckModal : submitShorts}
          />
        </div>
      </Mobile>
      <DeskTop>
        <div className={styles.comm_write_wrap}>
          <Content
            value={content}
            handleContentTextChange={contentChange}
            maxLength={99}
            placeholder={"동영상 설명을 입력해주세요"}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*" // 이미지와 비디오 파일 모두 허용
            multiple
            style={{ display: "none" }}
          />

          {selectedVideo == null ? (
            <>
              <div className={styles.divtext}>동영상을 선택해주세요</div>
              <div className={styles.upload_div} onClick={videoSelect}>
                <LuUpload size={30} />
              </div>
            </>
          ) : (
            <div></div>
          )}
          {selectedVideo && (
            <div className={styles.videoPreview_wrap}>
              <div className={styles.divtext}>동영상 미리보기</div>
              <div className={styles.videoBoxDiv}>
                <video
                  className={styles.videoPreview}
                  height="95"
                  controls
                  controlsList="nodownload"
                >
                  <source src={videoPreviewUrl} type={selectedVideo.type} />
                  Your browser does not support the video tag.
                </video>

                <div
                  className={styles.videoPreview_rmv}
                  onClick={handleRemoveVideo}
                >
                  <IoIosClose size={19} />
                </div>
              </div>
            </div>
          )}
          <div className={styles.divtext}>썸네일을 선택해주세요</div>
          {/* SchedulePhotoSelectArea 컴포넌트가 실제로 어떻게 동작하는지에 따라 수정 필요 */}
          <SchedulePhotoSelectArea
            selectedPhoto={selectedPhoto}
            onPhotoSelected={handlePhotoSelected}
            onRemovePhoto={handleRemovePhoto}
          />
        </div>
        <div>
          <Button
            text={"취소"}
            btnstyle="white"
            onClick={handleShowCheckModal}
          />
          <Button
            text={"작성 완료"}
            // text={edit ? "수정 완료" : "작성 완료"}
            btnstyle={isSubmitDisabled ? "white_disabled" : "white"}
            onClick={isSubmitDisabled ? handleShowNullCheckModal : submitShorts}
          />
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
          Content="썸네일 및 동영상은 필수 항목입니다."
          onClose={handleNullCheckModal}
          oneBtn={true}
        />
      )}
    </>
  );
}

export default AddShorts;
