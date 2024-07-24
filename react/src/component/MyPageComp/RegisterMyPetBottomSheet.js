import React from "react";
import styles from "../../css/mypage_managemypets.module.css"
import { useNavigate } from 'react-router-dom';
import { GoShare } from "react-icons/go";
import { RxIdCard } from "react-icons/rx";

const RegisterMyPetBottomSheet = () => {
    const navigate = useNavigate();

    const InputPetCode = () => {
        return <div></div>
    }

    const goRegisterPage = () => {
        navigate(`/api/petregistration`);
    }

    return (
        <div className={styles.bottomsheet_inside_wrapper}>
            <div className={styles.bottomsheet_item} onClick={InputPetCode}>
                <GoShare className={styles.bottomsheet_icon} />
                <div className={styles.bottomsheet_text}>반려동물 코드 입력하기</div>
            </div>
            <div className={styles.bottomsheet_item} onClick={goRegisterPage}>
                <RxIdCard className={styles.bottomsheet_icon} />
                <div className={styles.bottomsheet_text}>직접 등록하기</div>
            </div>
        </div>
    )
}

export default RegisterMyPetBottomSheet;