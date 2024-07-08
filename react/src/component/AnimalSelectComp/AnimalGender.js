import React, { useState, useEffect } from 'react';
import { PiGenderMaleBold } from 'react-icons/pi';
import { PiGenderFemaleBold } from 'react-icons/pi';
import styles from '../../css/animal_gender.module.css';

const AnimalGender = ({
    handleSelectedGenderChange,
    setSelectedGender,
    selectedNeutered,
    selectedGender,
    setSelectedNeuterd,
    selectedType,
    checkedGender,
    setCheckedGender,
}) => {
    const [toggle, setToggle] = useState(false);
    const ShowGender = ({ genderIcon, gender, value }) => {
        return (
            <div
                className={`${styles.genderIconWrapper} ${
                    toggle ? setSelectedGender('성별모름') : selectedGender === value ? styles.selectedIconWrapper : ''
                }`}
            >
                <div>
                    <div
                        onClick={() => {
                            handleSelectedGenderChange(value);
                            setSelectedGender(value);
                            console.log('gender value: ', value);
                        }}
                        className={styles.genderIcon}
                    >
                        {genderIcon}
                    </div>
                </div>
                <div className={styles.genderText}>{gender}</div>
            </div>
        );
    };
    const Neutering = () => {
        const handleNeuteredChecked = (e) => {
            setCheckedGender(!checkedGender);
        };

        console.log('중성화 여부:', selectedNeutered);

        return (
            <div>
                <div>중성화를 했어요</div>
                <div>
                    <input type="checkbox" checked={checkedGender} onChange={handleNeuteredChecked} />
                </div>
            </div>
        );
    };
    const DontKnowGender = () => {
        const handleDontKnowGenderChecked = (e) => {
            setSelectedGender('성별모름');
            setToggle(!toggle);
        };
        console.log('성별:', selectedGender);

        return (
            <div>
                <div>성별을 몰라요</div>
                <div>
                    <input type="checkbox" onChange={handleDontKnowGenderChecked} checked={toggle} />
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1 className={styles.title}>성별을 알려주세요</h1>
            <ShowGender value={'남아'} genderIcon={<PiGenderMaleBold />} gender={'남아'} />
            <ShowGender value={'여아'} genderIcon={<PiGenderFemaleBold />} gender={'여아'} />
            {selectedType == '3' ? <DontKnowGender /> : <Neutering />}
        </div>
    );
};

export default AnimalGender;
