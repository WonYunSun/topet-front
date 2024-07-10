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
    const [selectedType, setSelectedType] = useState('');
    
    const [selectedKind, setSelectedKind] = useState('');

    const [selectedGender, setSelectedGender] = useState();//남or여

    const [selectedNeutered, setSelectedNeuterd] = useState('');//중성화
    const [checkedGender, setCheckedGender] = useState(false);//몰라요


    const [selectedBirth, setSelectedBirth] = useState();
    const [name, setName] = useState();
    const [weight, setWeight] = useState();
    const [allergy, setAllergy] = useState();
    const [health, setHealth] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [nextPossible, setNextPossible] = useState(false);

    const [petData, setPetData] = useState({
        petType: '',
        petKind: '',

        petGender: '',
        petNeutered: '',
        
        petName: '',
        petBirth: '',
        petWeight: '',
        petAllergy: '',
        petHealth: '',
        petProfilePhoto: '',
    });

    useEffect(() => {
        //setCheckedGender(!checkedGender);
        
    }, [selectedType, selectedKind, selectedBirth ]);

    useEffect(() => { show1(); 
                    consoleLog();
                    nextPossibleFunction(stepNum) 
                    }, 
                    [stepNum]);

    useEffect(() => { NextPossibleComp(); }, [nextPossible]);


    const handleSelectedTypeChange = (value) => {

        if(selectedType != '' &&selectedType != value){
            console.log('이전 선택과 다릅니다!');
            ResetForm();
            setSelectedType(value);
            setNextPossible(selectedType>=1 && selectedType <= 3 || value != '');
            setPetData({
                ...petData,
                petType: value,
                petKind: '',
            });
            consoleLog();
        }else{
            console.log('이전 선택과 같습니다!');
            setSelectedType(value);
            setNextPossible(selectedType>=1 && selectedType <= 3 || value != ''); // 선택된 타입이 있을 때만 다음 단계로 진행 가능하도록 설정
            setPetData({
                ...petData,
                petType: value,
                petKind: '',
            });
            consoleLog();

        }
        
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
       
        
        if(value == '중성화'){
            console.log('중성화 콘솔')
            setSelectedNeuterd('중성화');
            setNextPossible(true);
        }else if(value == '성별모름'){
            
            setCheckedGender(true);
            setNextPossible(true);
            
        }else if(value == ''){
            setNextPossible(false);
        }else{//암컷수컷
            setSelectedGender(value);
            setPetData({
                ...petData,
                petGender: value,
            });
            setNextPossible(true);
        }


        
        
    };
    const handleNameChange = (e) => {
        const tempName = e.target.value;
        setName(tempName);
        setPetData({
            ...petData,
            petName: tempName,
        });
        setNextPossible(tempName != ''); // change가 일어날때마다 하지말고, 값을 저장하고, 저장된값을 검증해서, 유효하면 nextPossible이 바뀌게 하면 되겠다.
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
        
        if(stepNum == 1){
            
            //아니면 continue를 해야함
        }

        if (stepNum > 1) {
            setStepNum(stepNum - 1);
        } else {
            setStepNum(1);
        }

        
            
        
    };

    const ResetForm = () => {
        console.log('resetForm 작동됐음')
        setSelectedType('');
        setSelectedKind('');
        setSelectedGender('');
        setSelectedNeuterd('');
        setCheckedGender('');
        setSelectedBirth('');
        setName('');
        setWeight('');
        setAllergy('');
        setHealth('');
        setSelectedPhoto(null);
        consoleLog();
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
        
        console.log('Type: ', selectedType);
        console.log('Kind: ', selectedKind);
        console.log('Gender: ', selectedGender);
        console.log('name: ', name);
        console.log('birth: ', selectedBirth);
        console.log('weight: ', weight);
        console.log('allergy: ', allergy);
        console.log('health: ', health);
        
        console.log('setSelectedNeuterd :', selectedNeutered);
        console.log('checkedGender :' , checkedGender);
        console.log('nextPossible', nextPossible)
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

                        nextPossible={nextPossible}
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
                        checkedGender = {checkedGender}
                        setCheckedGender={setCheckedGender}

                       
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
                return (
                    <div>
                        <AnimalBirth 
                            selectedBirth={selectedBirth} 
                            setSelectedBirth={setSelectedBirth}
                            setNextPossible={setNextPossible} /> 
                        <NextPossibleComp/>
                    </div>
                    );
            case 6:
                return (
                    <div>
                        <AnimalWeightandHealth
                            weight={weight}
                            allergy={allergy}
                            health={health}
                            setWeight={setWeight}
                            handleWeightChange={handleWeightChange}
                            handleAllergyChange={handleAllergyChange}
                            handleHealthChange={handleHealthChange}
                            />
                        <NextPossibleComp/>
                    </div>
                );
            default:
                return null;
        }
    };
    

    return (
        <div>
            <RegisterTopBar stepNum={stepNum} />
            {show1(stepNum)}
            
        </div>
    );
};

export default PetRegistration;