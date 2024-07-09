import React, { useState, useEffect, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import styles from '../../css/animal_photoandname.module.css';

const AnimalPhotoandName = ({ name, setName, selectedPhoto, setSelectedPhoto, handleSelectedProfilePhotoChange }) => {
    const fileInputRef = useRef(null);
    const photoSelect = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const photo = event.target.files[0];
        setSelectedPhoto(photo);
    };

    console.log(selectedPhoto);

    const onChange = (e) => {
        setName(e.target.value.trim());
    };

    const ProfileName = () => {
        return (
            <div className={styles.profilename_bar_wrapper}>
                <input
                    className={styles.profilename_bar}
                    type="text"
                    onChange={onChange}
                    placeholder="반려동물의 이름을 입력해주세요!"
                ></input>
            </div>
        );
    };

    const ProfilePhoto = () => {
        return (
            <div className={styles.selected_profile_photo_box} onChange={handleSelectedProfilePhotoChange}>
                {/* <img src={URL.createObjectURL(selectedPhoto)} className={styles.selected_profile_photo} /> */}
                {selectedPhoto == null ? (
                    <div></div>
                ) : (
                    <img src={URL.createObjectURL(selectedPhoto)} className={styles.selected_profile_photo} />
                )}
            </div>
        );
    };

    const SelectingPhoto = () => {
        return (
            <div className={styles.selecting_photo_button} onClick={photoSelect}>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <FaCamera className={styles.selecting_photo_icon} />
            </div>
        );
    };

    return (
        <div>
            <ProfilePhoto />
            <SelectingPhoto />
            <ProfileName />
        </div>
    );
};

export default AnimalPhotoandName;
