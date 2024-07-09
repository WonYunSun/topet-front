import React, { useState, useEffect } from 'react';
import RegisterTopBar from '../component/RegisterTopBar';
import AnimalType from '../component/AnimalSelectComp/AnimalType';
import AnimalKind from '../component/AnimalSelectComp/AnimalKind';
import AnimalGender from '../component/AnimalSelectComp/AnimalGender';
import AnimalPhotoandName from '../component/AnimalSelectComp/AnimalPhotoandName';

const PetRegistration = () => {
    const [stepNum, setStepNum] = useState(1);
    const [selectedType, setSelectedType] = useState();
    const [selectedKind, setSelectedKind] = useState(''); // 추가된 부분
    const [selectedGender, setSelectedGender] = useState();
    const [selectedNeutered, setSelectedNeuterd] = useState(false);
    const [checkedGender, setCheckedGender] = useState(false);
    const [name, setName] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState();
    useEffect(() => {
        show1(stepNum);
        checkedGenderControl((current) => !current);
        setSelectedGender('');
        setSelectedPhoto();
    }, [stepNum, selectedType]);

    const [petData, setPetData] = useState({
        petGender: '',
        petKind: '',
        petType: '',
        petName: '',
        petBirth: '',
        petWeight: '',
        petAllergy: '',
        petHealth: '',
        petProfilePhoto: '',
    });

    const handleNameChange = (value) => {
        setName(value);
        setPetData({
            ...petData,
            petName: value,
        });
    };

    const handleSelectedProfilePhotoChange = (value) => {
        setSelectedPhoto(value);
        setPetData({
            ...petData,
            petProfilePhoto: value,
        });
    };

    const handleSelectedKindChange = (value) => {
        setSelectedKind(value);
        setPetData({
            ...petData,
            petKind: value,
        });
    };

    const handleSelectedGenderChange = (value) => {
        setSelectedGender(value);
        setPetData({
            ...petData,
            petGender: value,
        });
    };

    const handleSelectedTypeChange = (value) => {
        setSelectedType(value);
        setSelectedKind(''); // 종류 초기화
        setPetData({
            ...petData,
            petType: value,
            petKind: '', // 종류 초기화
        });
    };

    const checkedGenderControl = () => {
        setCheckedGender(false);
    };

    console.log('petName: ', petData.petName);
    console.log('selectedType: ', petData.petType);
    console.log('selectedKind: ', petData.petKind);
    console.log('selectedGender: ', petData.petGender);
    console.log('selectedProfilePhoto: ', petData.petProfilePhoto);

    const nextStep = () => {
        if (stepNum < 6) setStepNum(stepNum + 1);
        else setStepNum(6);
        show1(stepNum);
    };

    const prevStep = () => {
        if (stepNum > 1) setStepNum(stepNum - 1);
        else setStepNum(1);
    };

    const show1 = (stepNum) => {
        switch (stepNum) {
            case 1:
                return (
                    <AnimalType
                        setSelectedType={setSelectedType}
                        handleSelectedTypeChange={handleSelectedTypeChange}
                        setSelectedKind={setSelectedKind}
                        petData={petData}
                    />
                );
            case 2:
                return (
                    <AnimalKind
                        handleSelectedKindChange={handleSelectedKindChange}
                        selectedType={selectedType}
                        selectedKind={selectedKind} // 추가된 부분
                    />
                );
            case 3:
                return (
                    <AnimalGender
                        handleSelectedGenderChange={handleSelectedGenderChange}
                        selectedGender={selectedGender}
                        setSelectedGender={setSelectedGender}
                        selectedNeutered={selectedNeutered}
                        setSelectedNeuterd={setSelectedNeuterd}
                        selectedType={selectedType}
                        //checkedGender={checkedGender}
                        //setCheckedGender={setCheckedGender}
                    />
                );
            case 4:
                return (
                    <AnimalPhotoandName
                        selectedPhoto={selectedPhoto}
                        setSelectedPhoto={setSelectedPhoto}
                        handleSelectedProfilePhotoChange={handleSelectedProfilePhotoChange}
                        name={name}
                        setName={setName}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <RegisterTopBar stepNum={stepNum} />
            {show1(stepNum)}
            <button onClick={prevStep}>이전</button>
            <button onClick={nextStep}>다음</button>
        </div>
    );
};

export default PetRegistration;
