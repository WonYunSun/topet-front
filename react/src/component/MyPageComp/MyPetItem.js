import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../../css/mypage_managemypets.module.css';
import { MdEdit, MdShare } from "react-icons/md";
import PetCodeModal from "../MyPageComp/PetCodeModal";

const MyPetItem = ({ setShowModal, setCopied, copied, showModal, photoUrl, name, uid }) => {
    const petCode = uid;
    const navigate = useNavigate();

    const handleModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const goPetDetail = () => {
        navigate(`/petprofiledetail`);
    }

    useEffect(() => {
        if(copied == true) {
            setShowModal(false);
        }
    },[copied])
        
    return (
        <div className={styles.profile_container}>
            <div className={styles.profile_wrapper}>
                <div className={styles.photo_container}>
                    <img src={photoUrl} alt={name} className={styles.photo} />
                </div>
                <div className={styles.name}>{name}</div>
                <span className={styles.profile_span}></span>
                <MdShare className={styles.profile_icon} onClick={handleModal} />
                <MdEdit className={styles.profile_icon} onClick={goPetDetail} />
            </div>
            {showModal && (
                <PetCodeModal
                    type={'코드복사'} 
                    codeToCopy={petCode} 
                    onClose={handleCloseModal} 
                    modalTitle={'반려동물코드 복사'} 
                    setCopied={setCopied}
                />
            )}
        </div>
    );
}

export default MyPetItem;