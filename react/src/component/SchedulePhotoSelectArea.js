import React from "react";
import PhotoSelectBox from "./PhotoSelectBox";
import "../css/photo_select.css";

const SchedulePhotoSelectArea = ({
  selectedPhoto,
  onPhotoSelected,
  onRemovePhoto,
}) => {
  const handlePhotoSelected = (photos) => {
    if (photos.length > 0) {
      onPhotoSelected(photos[0]);
    }
  };

  return (
    <div className="photo-select-area">
      <div className="selected-photos">
        {!selectedPhoto && (
          <PhotoSelectBox
            onPhotosSelected={handlePhotoSelected}
            selectedPhotoCount={selectedPhoto ? 1 : 0}
            cnt={1}
          />
        )}
        {selectedPhoto && (
          <div className="selected-photo-box">
            <img
              src={URL.createObjectURL(selectedPhoto)}
              alt="selected"
              className="photo"
            />
            <button className="remove-photo-button" onClick={onRemovePhoto}>
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePhotoSelectArea;
