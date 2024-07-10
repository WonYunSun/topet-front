import React, { useState, useEffect } from 'react';
import ManageBox from '../component/MyPageComp/ManageBox';
import { MdOutlinePets } from "react-icons/md";

const MyPage = () => {

    return (
        <div>
            <ManageBox icon={<MdOutlinePets />} managementItemTitle={'내 동물 관리'} />
        </div>
    );
}

export default MyPage;