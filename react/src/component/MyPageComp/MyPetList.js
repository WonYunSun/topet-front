import React from "react";
import MyPetItem from './MyPetItem';
import styles from '../../css/mypage_managemypets.module.css';

const MyPetList = ({ petProfileData }) => {
    return (
        <div>
            {petProfileData.map((pet) => (
                <MyPetItem 
                    key={pet.id}
                    photoUrl={pet.profileSrc}
                    name={pet.name}
                />
            ))}
        </div>
    );
}

export default MyPetList;