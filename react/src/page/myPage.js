import React, { useState, useEffect } from "react";
import ManageBox from "../component/MyPageComp/ManageBox";
import { MdOutlinePets } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import styles from "../css/mypage.module.css"
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const goEditProfile = () => {
    navigate(`/api/editprofile`)
  }

  const goManageMyPets = () => {
    navigate(`/api/managemypets`)
  }

  const goSeeMyPosts = () => {
    navigate(`/api/myposts`)
  }
  
  const goSeeMyComments = () => {
    navigate(`/api/mycomments`)
  }

  const goSeeLikedPosts = () => {
    navigate(`/api/likedposts`)
  }

  const goSeeMyShorts = () => {
    navigate(`/api/myshorts`)
  }

  const goSeeLikedShorts = () => {
    navigate(`/api/likedshorts`)
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
    </div>
  );
};

export default MyPage;
