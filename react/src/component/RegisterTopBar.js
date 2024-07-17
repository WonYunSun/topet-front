import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
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
        navigate('/api'); // 홈으로 이동
    };

    return (
        <div>
            <div className={styles.registertopBar}>
                <IoArrowBackOutline className={styles.icon} onClick={goBack} />
                <div className={styles.sequence} onChange={Sequence}>{stepNum}/6</div>
                <RxCross2 className={styles.icon} onClick={cancel} />
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
