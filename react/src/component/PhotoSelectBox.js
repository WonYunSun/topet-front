import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import "../css/photo_select.css";

const PhotoSelectBox = ({ onPhotosSelected, selectedPhotoCount }) => {
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
    <div className="photo-select-box" onClick={photoSelect}>
      <FaCamera className="camera-icon" />

      <span className="photoCntSpan">({selectedPhotoCount}/10)</span>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png"
        multiple
      />
    </div>
  );
};

export default PhotoSelectBox;
