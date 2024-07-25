import React, { useState, useEffect } from "react";
import ManageBox from "../../component/MyPageComp/ManageBox";
import CheckModal from "../../component/CheckModal";
import { MdOutlinePets, MdEdit } from "react-icons/md";
import styles from "../../css/mypage.module.css"
import { useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";

const MyPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState();

  const goEditProfile = () => {
    navigate(`/editprofile`)
  }

  const goManageMyPets = () => {
    navigate(`/managemypets`)
  }

  const goSeeMyPosts = () => {
    navigate(`/myposts`)
  }
  
  const goSeeMyComments = () => {
    navigate(`/mycomments`)
  }

  const goSeeLikedPosts = () => {
    navigate(`/likedposts`)
  }

  const goSeeMyShorts = () => {
    navigate(`/myshorts`)
  }

  const goSeeLikedShorts = () => {
    navigate(`/likedshorts`)
  }

  const handleShowLogoutModal = () => {
    setShowModal(true);
  }

  const handleCloseLogoutModal = () => {
    setShowModal(false);
  }

  // 로그아웃
  const handleLogout = () => {
    console.log("!! 로그아웃 !!");
    setShowModal(false);
  }

  const Profile = () => {
    return (
      <div>
        <div className={styles.profile_continer_wrapper}>
          <div className={styles.profile_container}>
            <div className={styles.profile_photoandname_container}>
              <div className={styles.profile_photo_container}>
                <img className={styles.profile_photo} src="https://i.pinimg.com/564x/87/09/e7/8709e78fb7d788bb86bbc63be55f3184.jpg"/>
              </div>
              <div className={styles.username}>사용자이름</div>
            </div>
            <MdEdit className={styles.edit_icon} onClick={goEditProfile} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.title}>마이페이지</div>
      <Profile />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"내 동물 관리"}
        pageRoute={goManageMyPets}
      />
      <ManageBox 
        icon={<MdOutlinePets />} 
        managementItemTitle={"내 게시글 보기"} 
        pageRoute={goSeeMyPosts}
      />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"좋아요 한 게시글 보기"}
        pageRoute={goSeeLikedPosts}
      />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"내 댓글 보기"}
        pageRoute={goSeeMyComments}
      />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"내 쇼츠 보기"}
        pageRoute={goSeeMyShorts}
      />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"좋아요 한 쇼츠 보기"}
        pageRoute={goSeeLikedShorts}
      />
      <div className={styles.logout} onClick={handleShowLogoutModal}>
        <TbLogout className={styles.logout_icon} />
        <div className={styles.logout_text}>로그아웃하기</div>
      </div>
      {showModal ? <CheckModal onClose={handleCloseLogoutModal} onContinue={handleLogout} Content={'로그아웃 하시겠습니까?'} CancleBtnContent={'취소'} ContinueBtnContent={'확인'} /> : ''}
    </div>
  );
};

export default MyPage;
