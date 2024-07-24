import React, { useState, useEffect } from "react";
import styles from '../../css/mypage_managemypets.module.css';
import { MdEdit, MdShare } from "react-icons/md";
import PetCodeModal from "../MyPageComp/PetCodeModal";

const MyPetItem = ({ photoUrl, name }) => {
    const [showModal, setShowModal] = useState(false);
    const petCode = '임시코드'

    // const handleModal = () => {
    //     setShowModal(true);
    // }
    // const handleCloseModal = () => {
    //     setShowModal(false);
    // }

    // useEffect(() => {
    //     if(showModal == true){
    //         return <PetCodeModal type={'코드복사'} codeToCopy={petCode} onClose={handleCloseModal} modalTitle={'반려동물코드 복사'} />
    //     }
    // },[showModal])
        
    return (
        <div className={styles.profile_container}>
            <div className={styles.profile_wrapper}>
                <div className={styles.photo_container}>
                    <img src={photoUrl} alt={name} className={styles.photo} />
                </div>
                <div className={styles.name}>{name}</div>
                <span className={styles.profile_span}></span>
                <MdShare className={styles.profile_icon} />
                <MdEdit className={styles.profile_icon} />
            </div>
        </div>
    );
}

export default MyPetItem;