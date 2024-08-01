import React, { useEffect, useState } from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import styles from '../../css/mypage_managemypets.module.css';
import MyPetList from "../../component/MyPageComp/MyPetList";
import BottomSheet from "../../component/BottomSheet";
import PetCodeModal from "../../component/MyPageComp/PetCodeModal";
import { useSelector, useDispatch } from "react-redux";
import petApi from "../../api/petApi";
import { addPetToList } from "../../redux/reducers/petListReducer";

const ManageMyPets = () => {
    const dispatch = useDispatch();
    const reduxMember = useSelector((state) => state.member.member);
    const petList = useSelector((state) => state.petList.petList);

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
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // 반려동물 코드로 등록
    const onRegister = async () => {
        try {
            console.log('반려동물 코드로 등록 : ', petCode);

            const newPet = await petApi.postAddPet(petCode);

            if (newPet) {
                dispatch(addPetToList(newPet));
                setShowModal(false);
            }

        } catch (error) {
            console.error("Error registering pet:", error);
        }
    };

    const handleOpenInputPetCodeModal = () => {
        setShowModal(true);
        setShowBottomSheet(false);
    };

    return (
        <div>
            <MyPageCommonTopBar title={'내 동물 관리'} />
            <div>
                <MyPetList />
            </div>
            <div>
                <button onClick={() => handleOpenBottomSheet("petRegister")}>등록</button>
            </div>
            <BottomSheet handleOpenInputPetCodeModal={handleOpenInputPetCodeModal} show={showBottomSheet} onClose={handleCloseBottomSheet} type={bottomSheetType} />
            {showModal ? <PetCodeModal type={'코드등록'} onClose={handleCloseModal} onRegister={onRegister} modalTitle={'반려동물 코드 입력'} setPetCode={setPetCode} /> : ''}
        </div>
    );
};

export default ManageMyPets;
