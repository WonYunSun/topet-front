import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/mypage_sidebar.module.css";

const MyPageSideBar = ({ option }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(option);

  const goManageMyPets = () => {
    navigate(`/managemypets`);
  };

  const goSeeMyPosts = () => {
    navigate(`/myposts`);
  };

  const goSeeLikedPosts = () => {
    navigate(`/likedposts`);
  };

  const goSeeMyComments = () => {
    navigate(`/mycomments`);
  };

  const goSeeMyShorts = () => {
    navigate(`/myshorts`);
  };

  const goSeeLikedShorts = () => {
    navigate(`/likedshorts`);
  };

  const goEditProfile = () => {
    navigate(`/editprofile`);
  };

  const handleClickedOption = ({ clickedOption }) => {
    if (clickedOption == "myPets") {
      return goManageMyPets();
    } else if (clickedOption == "myPosts") {
      return goSeeMyPosts();
    } else if (clickedOption == "likedPosts") {
      return goSeeLikedPosts();
    } else if (clickedOption == "myComments") {
      return goSeeMyComments();
    } else if (clickedOption == "myShorts") {
      return goSeeMyShorts();
    } else if (clickedOption == "likedShorts") {
      return goSeeLikedShorts();
    } else if (clickedOption == "editProfile") {
      return goEditProfile();
    }
  };

  const Option = ({ text, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`${styles.list_option} ${option == text && styles.bold}`}
      >
        {text}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>마이페이지</div>
      <div className={styles.list_wrapper}>
        <div
          className={styles.list_group_wrapper}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.category_title}>동물 관리</div>
          <Option
            onClick={() => handleClickedOption({ clickedOption: "myPets" })}
            text={"내 동물 관리"}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          className={styles.list_group_wrapper}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.category_title}>게시글 관리</div>
          <Option
            onClick={() => handleClickedOption({ clickedOption: "myPosts" })}
            text={"내 게시글 보기"}
          />
          <Option
            onClick={() => handleClickedOption({ clickedOption: "likedPosts" })}
            text={"좋아요 한 게시글 보기"}
          />
          <Option
            onClick={() => handleClickedOption({ clickedOption: "myComments" })}
            text={"내 댓글 보기"}
          />
        </div>
        <div
          className={styles.list_group_wrapper}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.category_title}>쇼츠 관리</div>
          <Option
            onClick={() => handleClickedOption({ clickedOption: "myShorts" })}
            text={"내 쇼츠 보기"}
          />
          <Option
            onClick={() =>
              handleClickedOption({ clickedOption: "likedShorts" })
            }
            text={"좋아요 한 쇼츠 보기"}
          />
        </div>
        <div
          className={styles.list_group_wrapper}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.category_title}>계정 설정</div>
          <Option
            onClick={() =>
              handleClickedOption({ clickedOption: "editProfile" })
            }
            text={"프로필 수정"}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPageSideBar;
