import React, { useRef, useMemo, useCallback, useState } from "react";
import MyPageCommonTopBar from '../component/MyPageComp/MyPageCommonTopBar'
import styles from '../css/mypage_editprofile.module.css'
import { TbPhoto } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";

const EditProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState();
    const [profileName, setProfileName] = useState();
    const fileInputRef = useRef(null);

    const photoSelect = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    const handleFileChange = useCallback((event) => {
        const photo = event.target.files[0];
        setProfilePhoto(photo);
    }, [setProfilePhoto]);

    const handleProfilePhotoChange = (value) => {
        setProfilePhoto(value);
    }

    const handleProfileNameChange = (e) => {
        const tempname = e.target.value;
        setProfileName(tempname);
    }

    const ProfilePhoto = useMemo(() => {
        return (
            <div className={styles.profile_photo_wrapper} onChange={handleProfilePhotoChange}>
                {profilePhoto == null ? (
                    <div className={styles.empty_profile_photo}></div>
                ) : (
                    <div className={styles.selected_profile_photo_container} >
                        <img src={URL.createObjectURL(profilePhoto)} className={styles.selected_profile_photo} />
                    </div>
                )}
            </div>
        );    
    }, [setProfilePhoto, handleProfilePhotoChange]);

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
                <TbPhoto className={styles.selecting_photo_icon} />
            </div>
        );
    }, [photoSelect, handleFileChange]);

    const DeleteInputText = () => {
        setProfileName('');
    }
    
    const Secession = () => {
        console.log('회원탈퇴')
    }

    const SaveProfile = () => {
        console.log('저장')
    }


    return (
        <div className={styles.wrapper}>
            <MyPageCommonTopBar title={'프로필 수정'} />
            <div className={styles.photo_wrapper}>
                {ProfilePhoto}
                {SelectingPhoto}
            </div>
            <div className={styles.profile_name_wrapper}>
                <div className={styles.profile_name_title}>닉네임</div>
                <div className={styles.profile_name_inputbar_wrapper}>
                    <input
                        className={styles.profile_name_inputbar}
                        value={profileName || ''}
                        onChange={handleProfileNameChange}
                        placeholder="닉네임을 작성해주세요"
                    />
                    <TiDelete className={styles.input_delete_icon} onClick={DeleteInputText} />
                </div>
            </div>
            <div className={styles.secession_wrapper}>
                <div className={styles.secession_phrase}>회원을 탈퇴하시겠습니까?</div>
                <div className={styles.secession_button} onClick={Secession}>회원탈퇴</div>
            </div>
            <div className={styles.save_button_wrapper}>
                <button className={`${profileName == '' ? styles.disabled : styles.save_button}`} onClick={SaveProfile}>{ '저장' }</button>
            </div>
        </div>
    )
}

export default EditProfile;