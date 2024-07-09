import React from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar';

const Community = () => {
    const navigate = useNavigate();
    const goCommunityWrite = () => {
        navigate('/api/community/communityWrite');
    }
  return (
    <div>
      <TopBar />
      <button onClick={goCommunityWrite}>글 작성 이동</button>
    </div>
  )
}

export default Community
