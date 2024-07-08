import React, { useState, useEffect, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import styles from '../../css/animal_photoandname.module.css';

const AnimalPhotoandName = ({ onPhotosSelected }) => {
    const [selectedPhoto, setSelectedPhoto] = useState();

    const fileInputRef = useRef(null);
    const photoSelect = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const photo = Array.from(event.target.files);
        const validPhoto = photo.filter((file) => file.type === 'image/jpeg' || file.type === 'image/png');

        onPhotosSelected(validPhoto);

        event.target.value = null; // reset the value of the input to allow re-upload of the same file
    };

    const ProfilePhoto = () => {
        return (
            <div>
                <div className={styles.selecting_photo_button} onClick={photoSelect}>
                    <FaCamera className={styles.selecting_photo_icon} />
                </div>
            </div>
        );
    };

    const SelectingPhoto = () => {
        return (
            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*" //나중에 쇼츠로 동영상만 받아 올 때는 "video/*"로 하면 동영상만 받아올 수 있음 이것도 역시 모바일에서 갤러리 열림
                    multiple
                />
            </div>
        );
    };

    return (
        <div>
            <ProfilePhoto />
            <SelectingPhoto />
        </div>
    );
};

export default AnimalPhotoandName;
