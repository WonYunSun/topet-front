import React, { useState, useEffect } from "react";
import ManageBox from "../component/MyPageComp/ManageBox";
import { MdOutlinePets } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const MyPage = () => {

  const Profile = () => {
    return (
      <div>
        <div>
          <div>
            <img src="https://i.pinimg.com/564x/87/09/e7/8709e78fb7d788bb86bbc63be55f3184.jpg"/>
          </div>
        </div>
        <MdEdit />
      </div>
    )
  }

  return (
    <div>
      <div>마이페이지</div>
      <Profile />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"내 동물 관리"}
      />
      <ManageBox 
        icon={<MdOutlinePets />} 
        managementItemTitle={"내 글 보기"} 
      />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"내 댓글 보기"}
      />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"좋아요 한 게시글 보기"}
      />
      <ManageBox
        icon={<MdOutlinePets />}
        managementItemTitle={"내 쇼츠 보기"}
      />
    </div>
  );
};

export default MyPage;
