import React from 'react'
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
    

   const navigate = useNavigate();
//     const goCommunity = () => {
//         navigate('/community/community');
//     }
//   return (
//     <div>
//       <button onClick={goCommunity}>커뮤니티 이동</button>
//     </div>
//   )
    return(
        <div>
            <h1>카카오로그인</h1>
        </div>
        
    )
}

export default KakaoLogin
