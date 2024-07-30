import React, { useEffect, useState } from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar"
import styles from '../../css/mypage_managemypets.module.css';
import MyPetList from "../../component/MyPageComp/MyPetList";
import BottomSheet from "../../component/BottomSheet";
import PetCodeModal from "../../component/MyPageComp/PetCodeModal";
import { useSelector, useDispatch } from "react-redux";

const ManageMyPets = () => {

    const reduxMember = useSelector((state)=>state.member.member);
    const reduxPet = useSelector((state)=>state.petList.petList);
    
    //Redux에서 받아온 현재 로그인한 유저의 정보
    
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [bottomSheetType, setBottomSheetType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [petCode, setPetCode] = useState('');

    const handleOpenBottomSheet = (type) => {
        setBottomSheetType(type);
        setShowBottomSheet(true);
    };
    
    const handleCloseBottomSheet = () => {
        setShowBottomSheet(false);
    };
    
    const handleModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    // 반려동물 코드로 등록
    const onRegister = () => {
        console.log('반려동물 코드로 등록 : ', petCode);
        setShowModal(false);
    }

    const handleOpenInputPetCodeModal = () => {
        setShowModal(true);
        setShowBottomSheet(false);
    }

    return (
        <div>
            <MyPageCommonTopBar title={'내 동물 관리'} />
            <div>
                <MyPetList petProfileData={reduxPet} />
            </div>
            <div>
                <button onClick={() => handleOpenBottomSheet("petRegister")}>등록</button>
            </div>
            <BottomSheet handleOpenInputPetCodeModal={handleOpenInputPetCodeModal} show={showBottomSheet} onClose={handleCloseBottomSheet} type={bottomSheetType} />
            {showModal ? <PetCodeModal type={'코드등록'} onClose={handleCloseModal} onRegister={onRegister} modalTitle={'반려동물 코드 입력'} setPetCode={setPetCode} /> : ''}
        </div>
    )
}

export default ManageMyPets;