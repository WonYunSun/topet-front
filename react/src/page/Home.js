import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google';


const Home = () => {
    const navigate = useNavigate();
    const link = 'https://kauth.kakao.com/oauth/authorize?client_id=3494afad7131fc9645ae9b08ed0dfda6&redirect_uri=http://localhost:8081/api/kakaoLogin/OAuth&response_type=code';


    const goCommunity = () => {
        navigate('/community/community');
    }
    const goKaKaoLogin = () =>{
          window.location.href = link;
    }

    const GoogleOAuthProvider = () =>{
//<GoogleOAuthProvider clientId="987344620103-fkv22grtshvuirpebqkgl48h0d52qvl7.apps.googleusercontent.com">
	
//</GoogleOAuthProvider>

    }

  

  return (
    <div>
      <button onClick={goCommunity}>커뮤니티 이동</button>
      <img src='/img/kakao_login_large_narrow.png' onClick={goKaKaoLogin}/>
      {/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>; */}

    </div>
  )
}
//<Route path='https://kauth.kakao.com/oauth/authorize?client_id=${3494afad7131fc9645ae9b08ed0dfda6}&redirect_uri=${localhost:8081/api/kakaoLogin}&response_type=code'></Route>
export default Home
