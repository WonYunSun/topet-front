import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { FaCamera } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import styles from "../../css/animal_photoandname.module.css";

const AnimalPhotoandName = ({
  name,
  setName,
  defaultImage,
  nextPossible,
  setNextPossible,
  selectedPhoto,
  setSelectedPhoto,
  handleSelectedProfilePhotoChange,
  handleNameChange,
}) => {
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (selectedPhoto == undefined) {
      setSelectedPhoto(defaultImage);
    }
    if (name == undefined || name == "") {
      setNextPossible(false);
    } else {
      setNextPossible(true);
    }
  }, [name, selectedPhoto, nextPossible]);

  const photoSelect = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleFileChange = useCallback(
    (event) => {
      const photo = event.target.files[0];
      setSelectedPhoto(photo);
    },
    [setSelectedPhoto]
  );
  // https://i.pinimg.com/564x/b5/b0/c0/b5b0c0313bfeb3cd262e16b546499a8c.jpg
  const ProfilePhoto = useMemo(() => {
    return (
      <div
        className={styles.photo_wrapper}
        onChange={handleSelectedProfilePhotoChange}
      >
        {selectedPhoto && typeof selectedPhoto == "object" ? (
          <div className={styles.selected_profile_photo_box}>
            <img
              src={URL.createObjectURL(selectedPhoto)}
              className={styles.selected_profile_photo}
            />
          </div>
        ) : (
          <div className={styles.selected_profile_photo_box}>
            <img
              src={selectedPhoto}
              className={styles.selected_profile_photo}
            />
          </div>
        )}
      </div>
    );
  }, [selectedPhoto, handleSelectedProfilePhotoChange]);

  const SelectingPhoto = useMemo(() => {
    return (
      <div className={styles.selecting_photo_button} onClick={photoSelect}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <TbPhoto className={styles.selecting_photo_icon} />
      </div>
    );
  }, [photoSelect, handleFileChange]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>이름을 알려주세요</div>
      <div className={styles.photo_wrapper}>
        {ProfilePhoto}
        {SelectingPhoto}
      </div>
      <div className={styles.profilename_bar_wrapper}>
        <input
          className={styles.profilename_bar}
          value={name || ""}
          maxLength={25}
          onChange={handleNameChange}
          placeholder="반려동물의 이름을 입력해주세요"
        />
      </div>
      <div className={styles.pet_name_length}>
        {name == undefined ? "0" : name.length}/25
      </div>
    </div>
  );
};

export default AnimalPhotoandName;
