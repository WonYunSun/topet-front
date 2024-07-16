import React, { useState, useEffect } from 'react';
import ManageBox from '../component/MyPageComp/ManageBox';
import { MdOutlinePets } from "react-icons/md";

const MyPage = () => {

    return (
        <div>
            <ManageBox icon={<MdOutlinePets />} managementItemTitle={'내 동물 관리'} />
            <ManageBox icon={<MdOutlinePets />} managementItemTitle={'내 글 보기'} />
            <ManageBox icon={<MdOutlinePets />} managementItemTitle={'내 댓글 보기'} />
            <ManageBox icon={<MdOutlinePets />} managementItemTitle={'좋아요 한 게시글 보기'} />
            <ManageBox icon={<MdOutlinePets />} managementItemTitle={'내 쇼츠 보기'} />
        </div>
    );
}

export default MyPage;