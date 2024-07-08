import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import styles from '../css/registertopbar.module.css';

const RegisterTopBar = ({ stepNum }) => {
    const navigate = useNavigate();

    const [index, setIndex] = useState();
    const Sequence = () => {
        setIndex((current) => current + 1);
    };

    const goBack = () => {
        navigate(-1); // 뒤로가기
    };
    const cancel = () => {
        navigate('/'); // 홈으로 이동
    };

    return (
        <div className={styles.registertopBar}>
            <GoArrowLeft className={styles.icon} onClick={goBack} />
            <div onChange={Sequence}>{stepNum}/6</div>
            <MdOutlineCancel className={styles.icon} onClick={cancel} />
        </div>
    );
};

export default RegisterTopBar;
