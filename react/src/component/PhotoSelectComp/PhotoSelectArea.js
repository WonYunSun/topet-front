import React from "react";
import PhotoSelectBox from "./PhotoSelectBox";
import styles from "../../css/photo_select.module.css";

const PhotoSelectArea = ({
  selectedPhotos,
  onPhotosSelected,
  onRemovePhoto,
  cnt,
}) => {
  return (
    <div className={styles["photo-select-area"]}>
      <div className={styles["selected-photos"]}>
        {selectedPhotos.length < cnt && (
          <PhotoSelectBox
            onPhotosSelected={onPhotosSelected}
            selectedPhotoCount={selectedPhotos.length}
            cnt={cnt}
          />
        )}
        {
        

          selectedPhotos.map((photo, index) => (
            <div key={index} className={styles["selected-photo-box"]}>
              <img
                src=
                  {photo.path}
                //{URL.createObjectURL(photo)}
                alt={`selected ${index}`}
                className={styles["photo"]}
              />
              <button
                className={styles["remove-photo-button"]}
                onClick={() => onRemovePhoto(index)}
              >
                x
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PhotoSelectArea;
