import React, { useState } from 'react';
import styles from '../../css/animal_type.module.css';

const AnimalType = ({ handleSelectedTypeChange, petData, setSelectedType, setSelectedKind }) => {
    const SelectPet = ({ petImg, petType, value }) => {
        return (
            <div className={styles.animal_type_wrapper}>
                <div
                    className={`${styles.type} ${petData.petType === value ? styles.selected : ''}`}
                    onClick={() => {
                        handleSelectedTypeChange(value);
                        setSelectedType(value);
                        setSelectedKind(''); // 종류 초기화
                    }}
                >
                    <div className={styles.img_container}>
                        <img src={petImg} className={`${styles.typeimg} `} alt={petType}></img>
                    </div>
                </div>
                <div className={styles.typename}>{petType}</div>
            </div>
        );
    };

    return (
        <div style={{marginTop: '7%', marginBottom: '6%'}}>
            <SelectPet
                petImg={
                    'https://i.pinimg.com/564x/43/87/90/438790c04a883bf01071479103f86676.jpg'
                }
                petType={'강아지'}
                value={1}
            ></SelectPet>
            <SelectPet
                petImg={
                    'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQC5qNvtQUdFvFdOVhurco8HcIQZzM7VzZ6aJZ9JoysBIlkcGeZ'
                }
                petType={'고양이'}
                value={2}
            ></SelectPet>
            <SelectPet
                petImg={'https://img.seoul.co.kr//img/upload/2024/02/15/SSC_20240215002627.jpg'}
                petType={'특수동물'}
                value={3}
            ></SelectPet>
        </div>
    );
};

export default AnimalType;
