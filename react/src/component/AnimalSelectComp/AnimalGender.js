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
    // checkedGender,
    // setCheckedGender,
}) => {
    const [neuToggle, setNeuToggle] = useState(false);
    const [genderToggle, setGenderToggle] = useState();
    const ShowGender = ({ genderIcon, gender, value }) => {
    
    (selectedNeutered === '중성화')? setNeuToggle(true) : setNeuToggle(false);
         
        return (
            <div
                className={`${styles.genderIconWrapper} ${
                    genderToggle? 
                    setSelectedGender('성별모름')
                    : selectedGender === value
                        ? styles.selectedIconWrapper
                        : ''
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

    const CheckboxOption = ({ label, type, toggleState, setToggleState, selectedValue, setSelectedValue }) => {
        const handleCheckboxChange = () => {
            if (type === 'gender') {
                setSelectedValue('성별모름');
                setToggleState(!toggleState);
            } else if (type === 'neutering') {
                //setSelectedValue(!selectedValue);
                setSelectedNeuterd('중성화');
                setToggleState(!toggleState);
            }
        };

        return (
            <div>
                <div>{label}</div>
                <div>
                    <input type="checkbox" onChange={handleCheckboxChange} checked={toggleState} />
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1 className={styles.title}>성별을 알려주세요</h1>
            <ShowGender value={'남아'} genderIcon={<PiGenderMaleBold />} gender={'남아'} />
            <ShowGender value={'여아'} genderIcon={<PiGenderFemaleBold />} gender={'여아'} />

            {selectedType == 3 ? (
                <CheckboxOption
                    label="성별을 몰라요"
                    type="gender"
                    toggleState={genderToggle}
                    setToggleState={setGenderToggle}
                    selectedValue={selectedGender}
                    setSelectedValue={setSelectedGender}
                />
            ) : (
                <CheckboxOption
                    label="중성화를 했어요"
                    type="neutering"
                    toggleState={neuToggle}
                    setToggleState={setNeuToggle}
                    selectedValue={selectedNeutered}
                    setSelectedValue={setSelectedNeuterd}
                />
            )}
        </div>
    );
};

export default AnimalGender;
