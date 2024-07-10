import React, { useState, useEffect } from 'react';
import RegisterTopBar from '../component/RegisterTopBar';
import AnimalType from '../component/AnimalSelectComp/AnimalType';
import AnimalKind from '../component/AnimalSelectComp/AnimalKind';
import AnimalGender from '../component/AnimalSelectComp/AnimalGender';
import AnimalBirth from '../component/AnimalSelectComp/AnimalBirth';
import AnimalPhotoandName from '../component/AnimalSelectComp/AnimalPhotoandName';
import AnimalWeightandHealth from '../component/AnimalSelectComp/AnimalWeightandHealth';

const PetRegistration = () => {
    const [stepNum, setStepNum] = useState(1);
    const [selectedType, setSelectedType] = useState();
    const [selectedKind, setSelectedKind] = useState('');
    const [selectedGender, setSelectedGender] = useState();
    const [selectedBirth, setSelectedBirth] = useState();
    const [selectedNeutered, setSelectedNeuterd] = useState('');
    const [checkedGender, setCheckedGender] = useState(false);
    const [name, setName] = useState();
    const [weight, setWeight] = useState();
    const [allergy, setAllergy] = useState();
    const [health, setHealth] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [nextPossible, setNextPossible] = useState(false);

    const [petData, setPetData] = useState({
        petGender: '',
        petNeutered: '',
        petKind: '',
        petType: '',
        petName: '',
        petBirth: '',
        petWeight: '',
        petAllergy: '',
        petHealth: '',
        petProfilePhoto: '',
    });

    useEffect(() => {
        setCheckedGender(!checkedGender);
        setSelectedPhoto();
        nextPossibleFunction(stepNum);
        show1();
        NextPossibleComp();
        consoleLog();
    }, [selectedType, selectedKind, selectedBirth, nextPossible, stepNum]);

    const handleSelectedTypeChange = (value) => {
        setSelectedType(value);
        setSelectedKind('');
        setNextPossible(selectedType>=1 && selectedType <= 3 || value != ''); // 선택된 타입이 있을 때만 다음 단계로 진행 가능하도록 설정
        setPetData({
            ...petData,
            petType: value,
            petKind: '',
        });
    };
    
    

    const handleSelectedKindChange = (value) => {
        setSelectedKind(value);
        console.log("kind" , value);
        setPetData({
            ...petData,
            petKind: value,
        });
        if(value != ''){
            setNextPossible(true); // 선택된 종류가 있을 때만 다음 단계로 진행 가능하도록 설정
        }else{
            setNextPossible(false); 
        }
    };
    const handleSelectedGenderChange = (value) => {
        setSelectedGender(value);
        setNextPossible(value != '');
        setPetData({
            ...petData,
            petGender: value,
        });
        setNextPossible(value != ''); // 선택된 종류가 있을 때만 다음 단계로 진행 가능하도록 설정
    };
    const handleNameChange = (e) => {
        const tempName = e.target.value;
        setName(tempName);
        setPetData({
            ...petData,
            petName: tempName,
        });
        setNextPossible(tempName != ''); // 선택된 종류가 있을 때만 다음 단계로 진행 가능하도록 설정
    };

    const handleSelectedProfilePhotoChange = (value) => {
        setSelectedPhoto(value);
        setPetData({
            ...petData,
            petProfilePhoto: value,
        });
        setNextPossible(value != ''); // 선택된 종류가 있을 때만 다음 단계로 진행 가능하도록 설정
    };
    
    const handleSelectedBirthChange = (value) => {
        setSelectedBirth(value);
        setPetData({
            ...petData,
            petBirth: value,
        });
        // setNextPossible(value != ''); // 선택된 종류가 있을 때만 다음 단계로 진행 가능하도록 설정
    };

    const handleWeightChange = (value) => {
        setWeight(value);
        setPetData({
            ...petData,
            petWeight: value,
        });
        // 선택된 종류가 있을 때만 다음 단계로 진행 가능하도록 설정
    };

    const handleAllergyChange = (value) => {
        setAllergy(value);
        setPetData({
            ...petData,
            petAllergy: value,
        });
    };

    const handleHealthChange = (value) => {
        setHealth(value);
        setPetData({
            ...petData,
            petHealth: value,
        });
    };


   

    const nextStep = () => {
        if (stepNum < 6) {
            setStepNum(stepNum + 1);
        } else {
            setStepNum(6);
        }
        setNextPossible(false);
    };

    const prevStep = () => {
        if (stepNum > 1) {
            setStepNum(stepNum - 1);
        } else {
            setStepNum(1);
        }

        switch(stepNum){
            case 2 :
                setSelectedKind('');
            return;
        }
    };
    function nextPossibleFunction(stepNum){
        switch(stepNum){
            case 1 :
                (selectedType >= 1 && selectedType <= 3)?setNextPossible(true):setNextPossible(false);
                return;
            case 2 :
                (petData.petKind == '')?setNextPossible(false):setNextPossible(true);
                return;
            case 3 :
                (petData.petGender == '')?setNextPossible(false):setNextPossible(true);
                return;
            case 4 :
                (petData.petName == '')?setNextPossible(false):setNextPossible(true);
                return;
            case 5 :
                (petData.petBirth == '')?setNextPossible(false):setNextPossible(true);
                return;
        }
    }

    const NextPossibleComp = () => {
        return (
            <div>            
            <button onClick={prevStep}>이전</button>
            {nextPossible ? <button onClick={nextStep}>다음</button> : <button style={{ backgroundColor: 'gray' }}>다음</button>}
            </div>
        )
    }

    function consoleLog(){
        console.log("-------------------------------------------------")
        console.log("toggle : ", nextPossible);
        console.log('Type: ', petData.petType);
        console.log('Kind: ', petData.petKind);
        console.log('Gender: ', petData.petGender);
        console.log('name: ', petData.petName);
        console.log('birth: ', petData.petBirth);
        console.log('weight: ', petData.petWeight);
        console.log('allergy: ', petData.petAllergy);
        console.log('health: ', petData.petHealth);
        console.log('setSelectedNeuterd :' , selectedNeutered);
        console.log("-------------------------------------------------")
    }
    const show1 = () => {
        switch (stepNum) {
            case 1:
                return (
                        <div>
                        <AnimalType
                            setSelectedType={setSelectedType}
                            handleSelectedTypeChange={handleSelectedTypeChange}
                            setSelectedKind={setSelectedKind}
                            petData={petData}
                        />
                        <NextPossibleComp/>
                        </div>

                );
            case 2:
                
                return (
                    
                    <div>
                    <AnimalKind
                        handleSelectedKindChange={handleSelectedKindChange}
                        selectedType={selectedType}
                        selectedKind={selectedKind}
                        setNextPossible={setNextPossible}
                    />
                    <NextPossibleComp/>
                        </div>
                );
            case 3:
                return (
                    <div>
                    <AnimalGender
                        handleSelectedGenderChange={handleSelectedGenderChange}
                        selectedGender={selectedGender}
                        setSelectedGender={setSelectedGender}
                        selectedNeutered={selectedNeutered}
                        setSelectedNeuterd={setSelectedNeuterd}
                        selectedType={selectedType}
                        
                        setNextPossible={setNextPossible}
                    />
                    <NextPossibleComp/>
                        </div>
                );
            case 4:
                return (
                    <div>
                    <AnimalPhotoandName
                        selectedPhoto={selectedPhoto}
                        setSelectedPhoto={setSelectedPhoto}
                        handleSelectedProfilePhotoChange={handleSelectedProfilePhotoChange}
                        name={name}
                        setName={setName}
                        handleNameChange={handleNameChange}
                    />
                    <NextPossibleComp/>
                        </div>
                );
            case 5:
                return (<div><AnimalBirth selectedBirth={selectedBirth} setSelectedBirth={setSelectedBirth} /> <NextPossibleComp/></div>);
            case 6:
                return (
                    <AnimalWeightandHealth
                        weight={weight}
                        allergy={allergy}
                        health={health}
                        setWeight={setWeight}
                        handleWeightChange={handleWeightChange}
                        handleAllergyChange={handleAllergyChange}
                        handleHealthChange={handleHealthChange}
                    />
                );
            default:
                return null;
        }
    };
    function reRender() {
        
    }

    return (
        <div>
            <RegisterTopBar stepNum={stepNum} />
            {show1(stepNum)}
            
        </div>
    );
};

export default PetRegistration;
