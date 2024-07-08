import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import { GoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google';

const Home = () => {
    const navigate = useNavigate();
    const link =
        'https://kauth.kakao.com/oauth/authorize?client_id=3494afad7131fc9645ae9b08ed0dfda6&redirect_uri=http://localhost:8081/api/kakaoLogin/OAuth&response_type=code';

    const goCommunity = () => {
        navigate('/api/community/community');
    };
    const goKaKaoLogin = () => {
        window.location.href = link;
    };
    const goCalendar = () => {
        navigate('/api/schedule');
    };
    const goPetRegistration = () => {
        navigate('/api/petregistration');
    };
  
  const goMap =() =>{
    navigate("/api/map");
  }
  return (
        <div>
            <img src="/img/kakao_login_large_narrow.png" onClick={goKaKaoLogin} />
            {/* <GoogleLogin
onSuccess={credentialResponse => {
  console.log(credentialResponse);
}}
onError={() => {
  console.log('Login Failed');
}}
/>; */}
            <button onClick={goCommunity}>커뮤니티 이동</button>
            <button onClick={goPetRegistration}>반려동물 등록</button>
            <button onClick={goKaKaoLogin}>카카오로그인 이동</button>
            <button onClick={goCalendar}>캘린더 이동</button>
        </div>
    );
};
//<Route path='https://kauth.kakao.com/oauth/authorize?client_id=${3494afad7131fc9645ae9b08ed0dfda6}&redirect_uri=${localhost:8081/api/kakaoLogin}&response_type=code'></Route>
export default Home;
