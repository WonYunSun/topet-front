import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePetList } from '../../redux/reducers/petListReducer';
import '../../css/animal_profile.css'

const AnimalProfile = ({ selectedPet }) => {
    const dispatch = useDispatch();
    const petList = useSelector(state => state.petList.petList);

    const initialPetList = {
        '체리': 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQC5qNvtQUdFvFdOVhurco8HcIQZzM7VzZ6aJZ9JoysBIlkcGeZ',
        '이티': 'https://lh6.googleusercontent.com/proxy/cm-xLarCEsGkewLWHGVnmq97nd1_jmDowqrTzS6eSHi_1suwzHewGa25VZyynlEEyvpjQyqGaBKSri53Oym_JyxrsD5MZQGeTEVGn0d7lGKNQDSEn1uw6jBY4FEP4wyS',
        '단추' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKCArbr29NHQngi50AsC43HYLsVrSiLfb5jA&s',
        '성근': 'https://img.seoul.co.kr//img/upload/2024/02/15/SSC_20240215002627.jpg',
    };

    const [animalName, setAnimalName] = useState('');
    const [animalProfileSrc, setAnimalProfileSrc] = useState('');

    useEffect(() => {
        dispatch(updatePetList(initialPetList));
    }, [dispatch]);

    useEffect(() => {
        if (petList && Object.keys(petList).length > 0) {
            const firstPetName = Object.keys(petList)[0];
            setAnimalName(firstPetName);
            setAnimalProfileSrc(petList[firstPetName]);
        }
    }, [petList]);

    useEffect(() => {
        if (selectedPet) {
            setAnimalName(selectedPet.name);
            setAnimalProfileSrc(selectedPet.url);
        }
    }, [selectedPet]);

    return (
        <div className='animal-profile'>
            <img src={animalProfileSrc} alt={animalName} className='animal-img' />
            <p className='animal-name'>{animalName}</p>
        </div>
    );
};

export default AnimalProfile;