import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../../css/mypage_managemypets.module.css';
import { MdEdit, MdShare } from "react-icons/md";

const MyPetItem = ({ onOpenModal, photoUrl, name, uid }) => {
    const navigate = useNavigate();

    const goPetDetail = () => {
        navigate(`/petprofiledetail`);
    }

    return (
        <div className={styles.profile_container}>
            <div className={styles.profile_wrapper}>
                <div className={styles.photo_container}>
                    <img src={photoUrl} alt={name} className={styles.photo} />
                </div>
                <div className={styles.name}>{name}</div>
                <span className={styles.profile_span}></span>
                <MdShare className={styles.profile_icon} onClick={onOpenModal} />
                <MdEdit className={styles.profile_icon} onClick={goPetDetail} />
            </div>
        </div>
    );
}

export default MyPetItem;
