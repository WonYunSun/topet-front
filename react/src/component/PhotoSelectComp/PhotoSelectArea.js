import React from "react";
import PhotoSelectBox from "./PhotoSelectBox";
import styles from "../../css/photo_select.module.css";

const PhotoSelectArea = ({
  selectedPhotos,
  onPhotosSelected,
  onRemovePhoto,
  setDeletedPhoto,
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
        {selectedPhotos.map((photo, index) => (
            <div key={index} className={styles["selected-photo-box"]}>
              {(photo instanceof File) ? 
              (<img src= {URL.createObjectURL(photo)} alt={`selected ${index}`} className={styles["photo"]}/>) : 
              (<img src= {photo.path} alt={`selected ${index}`} className={styles["photo"]}></img>)}
              
              <button
                className={styles["remove-photo-button"]}
                onClick={() => onRemovePhoto(index, photo.id)}
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
