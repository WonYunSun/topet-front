import React, { useState } from "react";
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

    const onRegister = async () => {
        try {
            console.log('반려동물 코드로 등록 : ', petCode);

            const newPet = await petApi.postAddPet(petCode);

            if (newPet) {
                dispatch(addPetToList(newPet));
                setShowModal(false);
                // 페이지를 새로 고침하는 대신 상태를 업데이트하여 리액트의 상태 관리를 활용
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
                <MyPetList petList={petList} /> {/* `petList`를 props로 전달할 수 있습니다 */}
            </div>
            <div>
                <button onClick={() => handleOpenBottomSheet("petRegister")}>등록</button>
            </div>
            <BottomSheet 
                handleOpenInputPetCodeModal={handleOpenInputPetCodeModal} 
                show={showBottomSheet} 
                onClose={handleCloseBottomSheet} 
                type={bottomSheetType} 
            />
            {showModal && 
                <PetCodeModal 
                    type={'코드등록'} 
                    onClose={handleCloseModal} 
                    onRegister={onRegister} 
                    modalTitle={'반려동물 코드 입력'} 
                    setPetCode={setPetCode} 
                />
            }
        </div>
    );
};

export default ManageMyPets;
