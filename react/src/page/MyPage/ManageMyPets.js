import React, { useState } from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar"
import styles from '../../css/mypage_managemypets.module.css';
import MyPetList from "../../component/MyPageComp/MyPetList";
import BottomSheet from "../../component/BottomSheet";
import PetCodeModal from "../../component/MyPageComp/PetCodeModal";

const ManageMyPets = () => {
    const dummyPetsData = [
        {
            id: 1,
            photoUrl: "https://i.pinimg.com/564x/10/ae/6a/10ae6ade71b4d40c2af9a8bde4bd2002.jpg",
            name: "아기",
            type: '강아지',
            neutered: 'false',
            weight: '3.5kg',
            allergy: '닭 포함 단백질',
            health: '',
        },
        {
            id: 2,
            photoUrl: "https://i.pinimg.com/564x/3f/ec/f7/3fecf7f1539948cc7b7c05c592f41a69.jpg",
            name: "애옹이",
            type: '고양이',
            neutered: 'true',
            weight: '3kg',
            allergy: '닭 포함 단백질',
            health: '',
        },
        {
            id: 3,
            photoUrl: "https://i.pinimg.com/564x/5a/44/b1/5a44b1276b31fb751ddbcf9652447a7b.jpg",
            name: "쥐",
            type: '특수동물',
            neutered: 'false',
            weight: '5kg',
            allergy: '닭 포함 단백질',
            health: '',
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