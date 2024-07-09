import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import styles from "../css/photo_select.module.css";

const PhotoSelectBox = ({ onPhotosSelected, selectedPhotoCount, cnt }) => {
  const fileInputRef = useRef(null);

  const photoSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );

    onPhotosSelected(validFiles);

    event.target.value = null; // reset the value of the input to allow re-upload of the same file
  };

  return (
    <div className={styles.photo_select_box} onClick={photoSelect}>
      <FaCamera className={styles.camera_icon} />
      <span>
        ({selectedPhotoCount}/{cnt})
      </span>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*" //나중에 쇼츠로 동영상만 받아 올 때는 "video/*"로 하면 동영상만 받아올 수 있음 이것도 역시 모바일에서 갤러리 열림
        multiple
      />
    </div>
  );
};

export default PhotoSelectBox;
