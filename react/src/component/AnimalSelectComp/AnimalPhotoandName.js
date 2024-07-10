import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FaCamera } from 'react-icons/fa';
import styles from '../../css/animal_photoandname.module.css';

const AnimalPhotoandName = ({ name, setName, selectedPhoto, setSelectedPhoto, handleSelectedProfilePhotoChange, handleNameChange }) => {
    const fileInputRef = useRef(null);
    
    const photoSelect = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    const handleFileChange = useCallback((event) => {
        const photo = event.target.files[0];
        setSelectedPhoto(photo);
    }, [setSelectedPhoto]);

    const ProfilePhoto = useMemo(() => {
        return (
            <div className={styles.selected_profile_photo_box} onChange={handleSelectedProfilePhotoChange}>
                {selectedPhoto == null ? (
                    <div></div>
                ) : (
                    <img src={URL.createObjectURL(selectedPhoto)} className={styles.selected_profile_photo} />
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
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <FaCamera className={styles.selecting_photo_icon} />
            </div>
        );
    }, [photoSelect, handleFileChange]);

    return (
        <div>
            {ProfilePhoto}
            {SelectingPhoto}
            <div className={styles.profilename_bar_wrapper}>
                <input
                    className={styles.profilename_bar}
                    value={name || ''}
                    onChange={handleNameChange}
                    placeholder="반려동물의 이름을 입력해주세요"
                />
            </div>
        </div>
    );
};

export default AnimalPhotoandName;
