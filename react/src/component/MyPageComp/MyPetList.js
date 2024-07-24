import React, { useState } from "react";
import MyPetItem from './MyPetItem';
import styles from '../../css/mypage_managemypets.module.css';

const MyPetList = ({ petProfileData }) => {
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    return (
        <div>
            {petProfileData.map((pet) => (
                <MyPetItem 
                    key={pet.id}
                    photoUrl={pet.profileSrc}
                    name={pet.name}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    setCopied={setCopied}
                    copied={copied}
                />
            ))}
            {copied ? <div className={styles.copy_success_line}>클립보드에 복사되었습니다</div> : ''}
        </div>
    );
}

export default MyPetList;