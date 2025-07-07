import React, { useState, useEffect } from "react";
import ManageBox from "../../component/MyPageComp/ManageBox";
import CheckModal from "../../component/CheckModal";

import memberApi from "../../api/memberApi";

import { useSelector, useDispatch } from "react-redux";
import styles from "../../css/mypage.module.css";
import { useNavigate } from "react-router-dom";
import MyPageSideBar from "../../component/MyPageComp/MyPageSideBar";

/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

// 아이콘
import { MdEdit, MdOutlinePets } from "react-icons/md"; // 프로필 수정, (보류)내 반려동물
import { IoIosHeart } from "react-icons/io"; // 내 반려동물 관리
import { IoDocumentText } from "react-icons/io5"; // 내 게시글
import { AiFillLike } from "react-icons/ai"; // 좋아요 한 게시글, 좋아요 한 쇼츠
import { FaCommentDots } from "react-icons/fa6"; // 내 댓글
import { FaPlayCircle } from "react-icons/fa"; // 내 쇼츠
import { TbLogout } from "react-icons/tb"; // 로그아웃

import { updateMember } from "../../redux/reducers/memberReducer";
import { updatePetList } from "../../redux/reducers/petListReducer";
import { updateSelectedPet } from "../../redux/reducers/selectedPetReducer";

const MyPage = () => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxMember = useSelector((state) => state.member.member);
  console.log(reduxMember);

  const defaultProfileImage =
    "https://i.pinimg.com/564x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg";
  const [showModal, setShowModal] = useState();

  const goEditProfile = () => {
    navigate(`/editprofile`);
  };

  const goManageMyPets = () => {
    navigate(`/managemypets`);
  };

  const goSeeMyPosts = () => {
    navigate(`/myposts`);
  };

  const goSeeMyComments = () => {
    navigate(`/mycomments`);
  };

  const goSeeLikedPosts = () => {
    navigate(`/likedposts`);
  };

  const goSeeMyShorts = () => {
    navigate(`/myshorts`);
  };

  const goSeeLikedShorts = () => {
    navigate(`/likedshorts`);
  };

  const handleShowLogoutModal = () => {
    setShowModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowModal(false);
  };

  // 로그아웃
  const handleLogout = async () => {
    const response = await memberApi.logout();
    if (response.status == 200 && response.data === "success") {
      dispatch(updateMember(""));
      dispatch(updatePetList([]));
      dispatch(updateSelectedPet(""));
      navigate(`/login`);
    }
    console.log("!! 로그아웃 !!");

    setShowModal(false);
  };

  const Profile = () => {
    return (
      <div
        className={`${styles.profile_continer_wrapper} ${
          isDeskTop ? styles.dtver : styles.mbver
        }`}
      >
        <div
          className={`${styles.profile_container} ${isDeskTop && styles.dtver}`}
        >
          <div
            className={`${styles.profile_photoandname_container} ${
              isDeskTop && styles.dtver
            }`}
          >
            <div className={styles.profile_photo_container}>
              {reduxMember.profileSrc ? (
                <img
                  className={styles.profile_photo}
                  src={reduxMember.profileSrc}
                />
              ) : (
                <img
                  className={styles.profile_photo}
                  src={defaultProfileImage}
                />
              )}
            </div>
            <div className={`${styles.username} ${isDeskTop && styles.dtver}`}>
              {reduxMember.name}
            </div>
          </div>
          <MdEdit
            className={`${styles.edit_icon} ${isDeskTop && styles.dtver}`}
            onClick={goEditProfile}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Mobile>
        <div className={styles.wrapper}>
          <div className={styles.title}>마이페이지</div>
          <div className={styles.mypage_content_wrapper}>
            <Profile />
            <ManageBox
              icon={<IoIosHeart />}
              managementItemTitle={"내 반려동물 관리"}
              pageRoute={goManageMyPets}
            />
            <ManageBox
              icon={<IoDocumentText />}
              managementItemTitle={"내 게시글 보기"}
              pageRoute={goSeeMyPosts}
            />
            <ManageBox
              icon={<AiFillLike />}
              managementItemTitle={"좋아요 한 게시글 보기"}
              pageRoute={goSeeLikedPosts}
            />
            <ManageBox
              icon={<FaCommentDots />}
              managementItemTitle={"내 댓글 보기"}
              pageRoute={goSeeMyComments}
            />
            <ManageBox
              icon={<FaPlayCircle />}
              managementItemTitle={"내 쇼츠 보기"}
              pageRoute={goSeeMyShorts}
            />
            <ManageBox
              icon={<AiFillLike />}
              managementItemTitle={"좋아요 한 쇼츠 보기"}
              pageRoute={goSeeLikedShorts}
            />
            <div className={styles.logout} onClick={handleShowLogoutModal}>
              <TbLogout className={styles.logout_icon} />
              <div className={styles.logout_text}>로그아웃하기</div>
            </div>
            {showModal ? (
              <CheckModal
                onClose={handleCloseLogoutModal}
                onContinue={() => {
                  handleLogout();
                }}
                Content={"로그아웃 하시겠습니까?"}
                CancleBtnContent={"취소"}
                ContinueBtnContent={"확인"}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Mobile>
      <DeskTop>
        <div className={styles.wrapper_dtver}>
          <div className={styles.inner_wrapper}>
            <MyPageSideBar />
            <div className={styles.rightside_wrapper}>
              <Profile />
            </div>
          </div>
        </div>
      </DeskTop>
    </>
  );
};

export default MyPage;
