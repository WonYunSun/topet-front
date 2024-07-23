import React, { useState } from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar"
import styles from '../../css/mypage_managemypets.module.css';
import MyPetList from "../../component/MyPageComp/MyPetList";
import BottomSheet from "../../component/BottomSheet";

const ManageMyPets = () => {
    const dummyPetsData = [
        {
            id: 1,
            photoUrl: "https://i.pinimg.com/564x/10/ae/6a/10ae6ade71b4d40c2af9a8bde4bd2002.jpg",
            name: "아기",
        },
        {
            id: 2,
            photoUrl: "https://i.pinimg.com/564x/00/01/dc/0001dc013a9fdaaf3c67cf8818c58b58.jpg",
            name: "개죽이"
        },
        {
            id: 3,
            photoUrl: "https://i.pinimg.com/736x/14/80/e5/1480e5451a90b53739760269ae0244a0.jpg",
            name: "바보"
        },
    ]

    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [bottomSheetType, setBottomSheetType] = useState("");

    const handleOpenBottomSheet = (type) => {
        setBottomSheetType(type);
        setShowBottomSheet(true);
    };
    
    const handleCloseBottomSheet = () => {
        setShowBottomSheet(false);
    };

    return (
        <div>
            <MyPageCommonTopBar title={'내 동물 관리'} />
            <div>
                <MyPetList petProfileData={dummyPetsData} />
            </div>
            <div>
                <button onClick={() => handleOpenBottomSheet("petRegister")}>등록</button>
            </div>
            <BottomSheet show={showBottomSheet} onClose={handleCloseBottomSheet} type={bottomSheetType} />
        </div>
    )
}

export default ManageMyPets;