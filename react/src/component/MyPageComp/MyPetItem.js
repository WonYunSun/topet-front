import React from "react";
import styles from '../../css/mypage_managemypets.module.css';
import { RxShare2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";

const MyPetItem = ({ photoUrl, name }) => {
    return (
        <div className={styles.profile_container}>
            <div className={styles.profile_wrapper}>
                <div className={styles.photo_container}>
                    <img src={photoUrl} alt={name} className={styles.photo} />
                </div>
                <div className={styles.name}>{name}</div>
                <span className={styles.profile_span}></span>
                <RxShare2 className={styles.profile_icon} />
                <MdEdit className={styles.profile_icon} />
            </div>
        </div>
    );
}

export default MyPetItem;