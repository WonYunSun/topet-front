import React, { useState, useRef } from "react";
import SchedulePhotoSelectArea from "../component/CalendarComp/SchedulePhotoSelectArea";
import shortsApi from "../api/shortsApi";

function AddShorts() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fileInputRef = useRef(null);

  const videoSelect = () => {
    fileInputRef.current.click();
  };

  const handlePhotoSelected = (photo) => {
    setSelectedPhoto(photo);
  };

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
    const validVideos = files.filter(
      (file) => file.type.startsWith("video/")
    );
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

  const titleChange = (e) => {
    const tempTitle = e.target.value || '';
    setTitle(tempTitle);
};


const contentChange = (e) => {
  const tempContent = e.target.value || '';
  setContent(tempContent);
};

const submitShorts = () => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("thumbnailPhoto", selectedPhoto);
  formData.append("video", selectedVideo);

  const resp = shortsApi.postShorts(formData);
  if(resp.status == 200){
    
  }else{
    
  }

  
}


  return (
    <>
      <h1>Add Shorts</h1>
      <div style={{ border: "1px solid black", padding: "20px" }}>
      <div><label>제목<input onChange={titleChange} style={{border:"1px solid black"}} type="text"/></label></div>  
      <div><label>내용<input onChange={contentChange} style={{border:"1px solid black"}} type="text"/></label></div>  





        <p>썸네일 사진</p>
        {/* SchedulePhotoSelectArea 컴포넌트가 실제로 어떻게 동작하는지에 따라 수정 필요 */}
        <SchedulePhotoSelectArea
          selectedPhoto={selectedPhoto}
          onPhotoSelected={handlePhotoSelected}
          onRemovePhoto={handleRemovePhoto}
        />
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*" // 이미지와 비디오 파일 모두 허용
          multiple
          style={{ display: 'none' }}
        />

        {(selectedVideo == null )?
        <button onClick={videoSelect}>동영상 선택</button> : <div></div>
}
        {selectedVideo && (
          <div>
            <h2>동영상 미리보기</h2>
            <video width="400" controls>
              <source src={videoPreviewUrl} type={selectedVideo.type} />
              Your browser does not support the video tag.
            </video>
            <button onClick={handleRemoveVideo}>동영상 제거</button>
          </div>
        )}
      </div>
      <button onClick={submitShorts}>작성</button>
    </>
  );
}

export default AddShorts;
