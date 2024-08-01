import React, { useState, useRef, useEffect } from "react";
import styles from "../css/mypage_editpetprofile.module.css";
import { TbPhoto } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
export default function UserRegister() {
  const defaultProfileImage =
    "https://i.pinimg.com/564x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg";

  const [profilePhoto, setProfilePhoto] = useState(defaultProfileImage);
  const [profileName, setProfileName] = useState("");
  const [canSave, setCanSave] = useState();
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (profilePhoto == undefined) {
      setProfilePhoto(defaultProfileImage);
    }
    if (
      profileName == ""
      //   (profileName == currentProfileName && profilePhoto == currentProfilePhoto)
    ) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
  }, [canSave, profileName, profilePhoto]);
  const handleFileChange = (event) => {
    const photo = event.target.files[0];
    setProfilePhoto(photo);
  };

  const photoSelect = () => {
    fileInputRef.current.click();
  };
  const handleProfileNameChange = (e) => {
    const tempname = e.target.value;
    if (tempname.length <= 25) {
      setProfileName(tempname);
    }
  };

  const DeleteInputText = () => {
    setProfileName("");
  };
  const SaveProfile = () => {
    console.log("저장");
  };
  return (
    <>
      <div>어서오세요!</div>
      <div>프로필 등록</div>
      <div className={styles.form_wrapper}>
        <div className={styles.photo_wrapper}>
          <div className={styles.profile_photo_wrapper}>
            <div className={styles.selected_profile_photo_container}>
              <img
                src={
                  profilePhoto && typeof profilePhoto === "object"
                    ? URL.createObjectURL(profilePhoto)
                    : profilePhoto
                }
                className={styles.selected_profile_photo}
                alt="Profile"
              />
            </div>
          </div>
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
            <TiDelete
              className={styles.input_delete_icon}
              onClick={DeleteInputText}
            />
          </div>
          <div className={styles.profile_name_length}>
            {profileName.length}/25
          </div>
        </div>
        <div className={styles.save_button_wrapper}>
          <button
            className={`${!canSave ? styles.disabled : styles.save_button}`}
            onClick={SaveProfile}
          >
            {"완료"}
          </button>
        </div>
      </div>
    </>
  );
}
