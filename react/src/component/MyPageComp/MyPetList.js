import React, { useState } from "react";
import MyPetItem from './MyPetItem';
import styles from '../../css/mypage_managemypets.module.css';
import PetCodeModal from "./PetCodeModal";

const MyPetList = ({ petProfileData }) => {
    const [copied, setCopied] = useState(false);
    const [modalData, setModalData] = useState(null); // 현재 열려있는 모달 데이터

    const handleOpenModal = (pet) => {
        setModalData(pet);
    };

    const handleCloseModal = () => {
        setModalData(null);
    };

    return (
        <div>
            {petProfileData.map((pet) => (
                <MyPetItem 
                    key={pet.id}
                    pet={pet}
                    photoUrl={pet.profileSrc}
                    uid={pet.uid}
                    name={pet.name}
                    onOpenModal={() => handleOpenModal(pet)}
                />
            ))}
            {copied ? <div className={styles.copy_success_line}>클립보드에 복사되었습니다</div> : ''}
            {modalData && (
                <PetCodeModal
                    type={'코드복사'} 
                    codeToCopy={modalData.uid}
                    uid={modalData.uid}
                    onClose={handleCloseModal}
                    modalTitle={'반려동물코드 복사'} 
                    setCopied={setCopied}
                />
            )}
        </div>
    );
}

export default MyPetList;
