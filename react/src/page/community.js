import React from 'react'
import { useNavigate } from 'react-router-dom';

const Community = () => {
    const navigate = useNavigate();
    const goCommunityWrite = () => {
        navigate('/community/communityWrite');
    }
  return (
    <div>
      <button onClick={goCommunityWrite}>글 작성 이동</button>
    </div>
  )
}

export default Community
