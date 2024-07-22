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
    setNextPossible,
    setCheckedGender,
}) => {
    const [neuToggle, setNeuToggle] = useState(selectedNeutered=='중성화');
    const [genderToggle, setGenderToggle] = useState(checkedGender); //성별모름
    //()?setNeuToggle(true):setNeuToggle(false);
    useEffect(() => {
        setGenderToggle(selectedGender === '성별모름');
        if(selectedGender==null || selectedGender == ''){
            setNextPossible(false);
        }
    }, [selectedGender]);

    
    const ShowGender = ({ genderIcon, gender, value }) => {
        if(selectedGender==null || selectedGender == ''){
            setNextPossible(false);
        }
        return (
            <div className={styles.gender_wrapper}>
                <div
                className={`${styles.gender_icon_wrapper} ${
                    genderToggle ? setSelectedGender('성별모름')
                    : 
                    selectedGender === value
                        ? styles.selected_icon_wrapper
                        : ''
                }`}
                >
                <div
                    onClick={() => {
                        selectedGender === '성별모름' ? handleSelectedGenderChange('성별모름') : handleSelectedGenderChange(value);
                            setSelectedGender(value);
                        }}
                    className={styles.gender_icon}
                >
                {genderIcon}
                </div>
                </div>
                <div className={styles.gender_text}>{gender}</div>
            </div>
        );
    };
    const CheckboxOption = ({ label, type, 
        //toggleState, setToggleState, 
        selectedValue, setSelectedValue }) => {
        const handleCheckboxChange = () => {
            if (type === 'gender') {
                if(genderToggle == false){
                    setSelectedValue('');    
                    handleSelectedGenderChange('');
                }
                setSelectedValue('성별모름');
                handleSelectedGenderChange('성별모름');
                setGenderToggle(!genderToggle);
            } else if (type === 'neutering') {
                console.log('selectedNeutered' , selectedNeutered);
                if(selectedNeutered == '중성화'){
                    setSelectedNeuterd('');
                    setNeuToggle(!neuToggle);
                }else{
                setSelectedNeuterd('중성화');
                setNeuToggle(!neuToggle);
            }
            }
        };

        return (
            <div className={styles.checkbox_wrapper}>
                <div className={styles.checkbox_text}>{label}</div>
                <div>
                    <input className={styles.checkbox} type="checkbox" onChange={handleCheckboxChange} checked={type == 'gender' ? genderToggle : neuToggle} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>성별을 알려주세요</h1>
            <div className={styles.container}>
                <ShowGender value={'남아'} genderIcon={<PiGenderMaleBold />} gender={'남아'} />
                <ShowGender value={'여아'} genderIcon={<PiGenderFemaleBold />} gender={'여아'} />
            </div>

            {selectedType == 3 ? (
                <CheckboxOption
                    label="성별을 몰라요"
                    type="gender"
                    // toggleState={genderToggle}
                    // setToggleState={setGenderToggle}
                    selectedValue={selectedGender}
                    setSelectedValue={setSelectedGender}
                />
            ) : (
                <CheckboxOption
                    label="중성화를 했어요"
                    type="neutering"
                    // toggleState={neuToggle}
                    // setToggleState={setNeuToggle}
                    selectedValue={selectedNeutered}
                    setSelectedValue={setSelectedNeuterd}
                />
            )}
        </div>
    );
};

export default AnimalGender;
