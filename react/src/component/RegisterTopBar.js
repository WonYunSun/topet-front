import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
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

    return (
        <div>
            <div className={styles.registertopBar}>
                <IoArrowBackOutline className={styles.icon} onClick={goBack} />
                <div className={styles.sequence} onChange={Sequence}>{stepNum}/6</div>
            </div>
            <div
                style={{
                    width: (100 * stepNum) / 6 + '%',
                    height: '5px',
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    backgroundColor: "#ffa62f",
                }}
            ></div>
        </div>
    );
};

export default RegisterTopBar;
