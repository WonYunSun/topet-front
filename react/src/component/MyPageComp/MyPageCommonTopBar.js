import React from "react";
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import styles from "../../css/mypage_common_topbar.module.css"

const MyPageCommonTopBar = ({ title }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 뒤로가기
    };

    return (
        <div className={styles.wrapper}>
            <IoArrowBackOutline className={styles.back_icon} onClick={goBack} />
            <div className={styles.page_title}>{title}</div>
        </div>
    )
}

export default MyPageCommonTopBar;