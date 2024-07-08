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
    const [genderToggle, setGenderToggle] = useState(false);

    const ShowGender = ({ genderIcon, gender, value }) => {
        return (
            <div
                className={`${styles.genderIconWrapper} ${
                    genderToggle
                        ? setSelectedGender('성별모름')
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
    // const Neutering = () => {
    //     const handleNeuteredChecked = (e) => {
    //         setSelectedNeuterd(!selectedNeutered);
    //     };

    //     console.log('중성화 여부:', selectedNeutered);

    //     return (
    //         <div>
    //             <div>중성화를 했어요</div>
    //             <div>
    //                 <input type="checkbox" checked={neuToggle} onChange={handleNeuteredChecked} />
    //             </div>
    //         </div>
    //     );
    // };
    // const DontKnowGender = () => {
    //     const handleDontKnowGenderChecked = (e) => {
    //         setSelectedGender('성별모름');
    //         setGenderToggle(!genderToggle);
    //     };
    //     console.log('성별:', selectedGender);

    //     return (
    //         <div>
    //             <div>성별을 몰라요</div>
    //             <div>
    //                 <input type="checkbox" onChange={handleDontKnowGenderChecked} checked={genderToggle} />
    //             </div>
    //         </div>
    //     );
    // };

    const CheckboxOption = ({ label, type, toggleState, setToggleState, selectedValue, setSelectedValue }) => {
        const handleCheckboxChange = () => {
            if (type === 'gender') {
                setSelectedValue('성별모름');
                setToggleState(!toggleState);
            } else if (type === 'neutering') {
                setSelectedValue(!selectedValue);
                setToggleState(!toggleState);
            }
            //datatype int String
            /*
                == 같냐?
                === 데이터타입까지 같냐?
                '3'  ==  3  true
                '3'  === 3 false
             */
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
