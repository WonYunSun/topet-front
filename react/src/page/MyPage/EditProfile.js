import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import styles from "../../css/mypage_editprofile.module.css";
import { TbPhoto } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import homeApi from "../../api/homeApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const reduxMember = useSelector((state) => state.member.member);
  const navigate = useNavigate();
  const defaultProfileImage =
    "https://i.pinimg.com/564x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg";
  const [profilePhoto, setProfilePhoto] = useState(reduxMember.profileSrc);
  const [profileName, setProfileName] = useState(reduxMember.name);
  const [canSave, setCanSave] = useState();
  const fileInputRef = useRef(null);

  console.log(reduxMember);

  const currentProfilePhoto = reduxMember.profileSrc; // 기존 사진
  const currentProfileName = reduxMember.name; // 기존 닉네임

  useEffect(() => {
    if (profilePhoto == undefined) {
      setProfilePhoto(defaultProfileImage);
    }
    if (
      profileName == currentProfileName
      // &&
      // profilePhoto == currentProfilePhoto
    ) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
  }, [canSave, profileName, profilePhoto]);

  const photoSelect = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleFileChange = useCallback(
    (event) => {
      const photo = event.target.files[0];
      setProfilePhoto(photo);
    },
    [setProfilePhoto]
  );

  const handleProfilePhotoChange = (value) => {
    setProfilePhoto(value);
  };

  const handleProfileNameChange = (e) => {
    const tempname = e.target.value;
    if (tempname.length <= 25) {
      setProfileName(tempname);
    }
  };

  const handleSubmit = async () => {
    // 프로필 등록
    console.log("저장");
    const formData = new FormData();
    formData.append("profileName", profileName);
    if (profilePhoto != null) {
      formData.append("photo", profilePhoto);
    }
    const resp = await homeApi.postMemberInfo(formData);
    if (resp.status == 200) {
      navigate(`/home`);
    } else {
      alert("실패");
      window.location.reload();
    }
    // navigate(-1);
  };
  const ProfilePhoto = useMemo(() => {
    return (
      <div
        className={styles.profile_photo_wrapper}
        onChange={handleProfilePhotoChange}
      >
        {profilePhoto && typeof profilePhoto === "object" ? (
          <div className={styles.selected_profile_photo_container}>
            <img
              src={URL.createObjectURL(profilePhoto)}
              className={styles.selected_profile_photo}
              alt="Profile"
            />
          </div>
        ) : (
          <div className={styles.selected_profile_photo_container}>
            <img
              src={profilePhoto}
              className={styles.selected_profile_photo}
              alt="Profile"
            />
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
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <TbPhoto className={styles.selecting_photo_icon} />
      </div>
    );
  }, [photoSelect, handleFileChange]);

  const DeleteInputText = () => {
    setProfileName("");
  };

  // 회원탈퇴
  const Secession = () => {
    console.log("회원탈퇴");
  };

  return (
    <div className={styles.wrapper}>
      <MyPageCommonTopBar title={"프로필 수정"} />
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
          <TiDelete
            className={styles.input_delete_icon}
            onClick={DeleteInputText}
          />
        </div>
        <div className={styles.profile_name_length}>
          {profileName.length}/25
        </div>
      </div>
      <div className={styles.secession_wrapper}>
        <div className={styles.secession_phrase}>회원을 탈퇴하시겠습니까?</div>
        <div className={styles.secession_button} onClick={Secession}>
          회원탈퇴
        </div>
      </div>
      <div className={styles.save_button_wrapper}>
        <button
          className={`${!canSave ? styles.disabled : styles.save_button}`}
          onClick={() => {
            handleSubmit();
          }}
        >
          {"저장"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
