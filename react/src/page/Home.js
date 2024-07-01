import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const goCommunity = () => {
        navigate('/community/community');
    }
  return (
    <div>
      <button onClick={goCommunity}>커뮤니티 이동</button>
    </div>
  )
}

export default Home
