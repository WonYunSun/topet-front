import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const link = 'https://kauth.kakao.com/oauth/authorize?client_id=3494afad7131fc9645ae9b08ed0dfda6&redirect_uri=http://localhost:8081/api/kakaoLogin/OAuth&response_type=code';


    const goCommunity = () => {
        navigate('/community/community');
    }
    const goKaKaoLogin = () =>{
          window.location.href = link;
    }

  return (
    <div>
      <button onClick={goCommunity}>커뮤니티 이동</button>
      <button onClick={goKaKaoLogin}>카카오로그인 이동</button>
    </div>
  )
}
//<Route path='https://kauth.kakao.com/oauth/authorize?client_id=${3494afad7131fc9645ae9b08ed0dfda6}&redirect_uri=${localhost:8081/api/kakaoLogin}&response_type=code'></Route>
export default Home
