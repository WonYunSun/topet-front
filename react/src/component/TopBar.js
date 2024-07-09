import React, { useEffect } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { GoHome } from 'react-icons/go';
import { CiSearch } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import styles from '../css/topbar.module.css';

const TopBar = ( {centerChange, showBottomSheet} ) => {
    const navigate = useNavigate()
    

    const goBack = () => {
        navigate(-1); // 뒤로가기
      };
    
      const goHome = () => {
        navigate('/api'); // 홈으로 이동
      };

      const renderTopBar = () => {
        switch (centerChange) {
          case "강아지":
          case "고양이":
          case "특수동물":
            return (
              <div className={styles.topbar}>
                  <GoArrowLeft className={styles.icon} onClick={goBack} />
                  
                  <div className={styles.animalSelectBox} onClick={showBottomSheet}>{centerChange}
                  <GoChevronDown className='arrow-bottom' /></div>
                  
                  <CiSearch className={styles.icon} />
              </div>
          );
          case "로고":
          default:
            return (
              <div className={styles.topbar}>
                <GoArrowLeft className={styles.icon} onClick={goBack} />
                <div className={styles.logo}>투펫</div>
                <GoHome className={styles.icon} onClick={goHome} />
              </div>
            );
        }
      };

  return renderTopBar();
}

export default TopBar;
