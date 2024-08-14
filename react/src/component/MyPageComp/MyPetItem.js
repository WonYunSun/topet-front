import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../../css/mypage_managemypets.module.css';
import { MdEdit, MdShare } from "react-icons/md";
import PetProfileDetail from "../../page/MyPage/PetProfileDetail";

const MyPetItem = ({ onOpenModal, photoUrl, name, uid, pet }) => {
    const navigate = useNavigate();

    const goPetDetail = (pet) => {
        
        // navigate(`/petprofiledetail/${pet.id}`);
        navigate(`/petprofiledetail`,  { state: { id: pet.id } });
        console.log(pet.id);
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
                <div style={{width:"20px"}}></div>
                <MdEdit className={styles.profile_icon} onClick={()=>{goPetDetail(pet)}} />
            </div>
        </div>
    );
}

export default MyPetItem;
