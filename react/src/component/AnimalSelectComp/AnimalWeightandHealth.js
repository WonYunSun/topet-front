import React, { useState } from 'react';

const InputPetHealth = ({ value, onChange, title, inputText }) => {
    const handleInputChange = (e) => {
        onChange(e.target.value); // 입력 값이 변경될 때 onChange 콜백을 호출합니다.
    };

    return (
        <div>
            <div>{title}</div>
            <div>
                <input
                    value={value || ''}
                    onChange={handleInputChange} // 입력 값이 변경될 때 handleInputChange 함수를 호출합니다.
                    placeholder={inputText}
                />
            </div>
        </div>
    );
};

const InputWeight = ({ weight, setWeight }) => {
    const [weightValue, setWeightValue] = useState(''); // 체중 값을 개별 상태로 관리합니다.
    const [selectedUnit, setSelectedUnit] = useState('kg'); // 초기값을 'kg'로 설정합니다.

    const handleWeightUnitChange = (e) => {
        const newUnit = e.target.value;
        setSelectedUnit(newUnit);
        setWeight(`${weightValue}${newUnit}`); // weight 값과 새로운 단위를 결합합니다.
    };

    const handleWeightInputChange = (e) => {
        const newValue = e.target.value;
        setWeightValue(newValue); // 입력 값을 상태로 설정합니다.
        setWeight(`${newValue}${selectedUnit}`); // 입력 값과 현재 선택된 단위를 결합합니다.
    };

    return (
        <div>
            <div>체중</div>
            <div>
                <input
                    type="number"
                    value={weight}
                    onChange={handleWeightInputChange} // 입력 값이 변경될 때 handleInputChange 함수를 호출합니다.
                    placeholder={'체중을 알려주세요'}
                />
                <select value={selectedUnit} onChange={handleWeightUnitChange}>
                    <option value='kg'>kg</option>
                    <option value='g'>g</option>
                </select>
            </div>
        </div>
    );
};

const AnimalWeightandHealth = ({ allergy, health, handleAllergyChange, handleHealthChange }) => {
    

    return (
        <div>
            <h2>반려동물의 건강상태를 알려주세요</h2>
            <InputWeight />
            <InputPetHealth
                title={'알레르기(선택)'}
                value={allergy}
                onChange={handleAllergyChange} // allergy 값이 변경될 때 handleAllergyChange 함수를 호출합니다.
                inputText={'알레르기가 있는 음식을 알려주세요'}
            />
            <InputPetHealth
                title={'건강상태(선택)'}
                value={health}
                onChange={handleHealthChange} // health 값이 변경될 때 handleHealthChange 함수를 호출합니다.
                inputText={'과거나 현재의 병력을 알려주세요'}
            />
        </div>
    );
};

export default AnimalWeightandHealth;
