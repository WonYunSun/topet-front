import React from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { GoHome } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import '../css/topbar.css';

const TopBar = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1); // 뒤로가기
      };
    
      const goHome = () => {
        navigate('/'); // 홈으로 이동
      };

  return (
    <div className='topbar'>
        <GoArrowLeft className='icon' onClick={goBack}/>
      <div className='logo'>투펫</div>
        <GoHome className='icon' onClick={goHome}/>
    </div>
  );
}

export default TopBar;
