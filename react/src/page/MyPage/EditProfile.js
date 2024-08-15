import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import MyPageSideBar from "../../component/MyPageComp/MyPageSideBar";
import styles from "../../css/mypage_editprofile.module.css";
import { TbPhoto } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";

import memberApi from "../../api/memberApi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/// responsive
import { useMediaQuery } from "react-responsive";
import { updateMember } from "../../redux/reducers/memberReducer";

const EditProfile = () => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const reduxMember = useSelector((state) => state.member.member);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultProfileImage =
    "https://i.pinimg.com/564x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg";
  const currentProfilePhoto = reduxMember.profileSrc || defaultProfileImage;
  const currentProfileName = reduxMember.name; // 기존 닉네임

  const [profilePhoto, setProfilePhoto] = useState();
  const [profileName, setProfileName] = useState(currentProfileName);
  const [canSave, setCanSave] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const isPhotoChanged = profilePhoto && profilePhoto !== currentProfilePhoto;
    const isNameChanged = profileName !== currentProfileName;

    // If either the profile photo or the profile name is changed
    if (isPhotoChanged || isNameChanged) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [profilePhoto, profileName, currentProfilePhoto, currentProfileName]);

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

  const handleProfileNameChange = (e) => {
    const tempName = e.target.value;
    if (tempName.length <= 25) {
      setProfileName(tempName);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", profileName);
    formData.append("id", reduxMember.id);
    if (profilePhoto != null) {
      formData.append("photo", profilePhoto);
    }
    const resp = await memberApi.memberUpdate(formData);
    dispatch(updateMember(resp.data));

    navigate(`/mypage`);
  };

  const ProfilePhoto1 = useMemo(() => {
    return (
      <div className={styles.profile_photo_wrapper}>
        {profilePhoto ? (
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
              src={currentProfilePhoto}
              className={styles.selected_profile_photo}
              alt="Profile"
            />
          </div>
        )}
      </div>
    );
  }, [profilePhoto, currentProfilePhoto]);

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
    <>
      <div className={`${isDeskTop ? styles.wrapper_dtver : styles.wrapper}`}>
        <div className={`${isDeskTop && styles.inner_wrapper}`}>
          {isDeskTop && <MyPageSideBar option={"좋아요 한 쇼츠 보기"} />}
          <div className={`${isDeskTop && styles.rightside_wrapper}`}>
            <MyPageCommonTopBar title={"프로필 수정"} />
            <div className={styles.photo_wrapper}>
              {ProfilePhoto1}
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
                {profileName ? profileName.length : "0"}/25
              </div>
            </div>
            <div
              className={`${styles.save_button_wrapper} ${
                isDeskTop ? styles.dtver : styles.mbver
              }`}
            >
              <button
                className={`${styles.save_button} ${
                  !canSave && styles.disabled
                } ${isDeskTop && styles.dtver}`}
                onClick={() => {
                  if (canSave) {
                    handleSubmit();
                  }
                }}
              >
                {"저장"}
              </button>
            </div>
            <div
              className={`${styles.secession_wrapper} ${
                isMobile ? styles.mbver : styles.dtver
              }`}
            >
              <div className={styles.secession_button} onClick={Secession}>
                회원탈퇴
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
