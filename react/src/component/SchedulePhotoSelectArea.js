import React from "react";
import PhotoSelectBox from "./PhotoSelectBox";
import styles from "../css/photo_select.module.css";

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
    <div className={styles["photo-select-area-single"]}>
      <div className={styles["selected-photos"]}>
        {!selectedPhoto && (
          <PhotoSelectBox
            onPhotosSelected={handlePhotoSelected}
            selectedPhotoCount={selectedPhoto ? 1 : 0}
            cnt={1}
          />
        )}
        {selectedPhoto && (
          <div className={styles["selected-photo-box-single"]}>
            <img
              src={URL.createObjectURL(selectedPhoto)}
              alt="selected"
              className={styles["photo"]}
            />
            <button
              className={styles["remove-photo-button"]}
              onClick={onRemovePhoto}
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePhotoSelectArea;
