import React, { useRef, useMemo, useCallback, useState, useEffect } from "react";
import MyPageCommonTopBar from '../../component/MyPageComp/MyPageCommonTopBar';
import styles from "../../css/mypage_editprofile.module.css";
import { TbPhoto } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";

const EditProfile = () => {
    const defaultProfileImage = 'https://i.pinimg.com/564x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg';
    const [profilePhoto, setProfilePhoto] = useState(defaultProfileImage);
    const [profileName, setProfileName] = useState('반려동물1');
    const [canSave, setCanSave] = useState();
    const fileInputRef = useRef(null);
    const currentProfilePhoto = defaultProfileImage; // 기존 사진
    const currentProfileName = '반려동물1'; // 기존 닉네임

    useEffect(() => {
        if(profilePhoto == undefined) {
            setProfilePhoto(defaultProfileImage);
        }
        if(profileName == '' || (profileName == currentProfileName && profilePhoto == currentProfilePhoto)){
            setCanSave(false);
        } else {
            setCanSave(true);
        }
    },[canSave, profileName, profilePhoto]);

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
        if (tempname.length <= 25) {
            setProfileName(tempname);
        }
    }

    const ProfilePhoto = useMemo(() => {
        return (
            <div className={styles.profile_photo_wrapper} onChange={handleProfilePhotoChange}>
                {profilePhoto && typeof profilePhoto === 'object' ? (
                    <div className={styles.selected_profile_photo_container}>
                        <img src={URL.createObjectURL(profilePhoto)} className={styles.selected_profile_photo} alt="Profile" />
                    </div>
                ) : 
                    (
                        <div className={styles.selected_profile_photo_container}>
                            <img src={profilePhoto} className={styles.selected_profile_photo} alt="Profile" />
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
                        value={profileName}
                        maxLength={25}
                        onChange={handleProfileNameChange}
                        placeholder="닉네임을 작성해주세요"
                    />
                    <TiDelete className={styles.input_delete_icon} onClick={DeleteInputText} />
                </div>
                <div className={styles.profile_name_length}>{profileName.length}/25</div>
            </div>
            <div className={styles.secession_wrapper}>
                <div className={styles.secession_phrase}>회원을 탈퇴하시겠습니까?</div>
                <div className={styles.secession_button} onClick={Secession}>회원탈퇴</div>
            </div>
            <div className={styles.save_button_wrapper}>
                <button className={`${!canSave ? styles.disabled : styles.save_button}`} onClick={SaveProfile}>{ '저장' }</button>
            </div>
        </div>
    )
}

export default EditProfile;