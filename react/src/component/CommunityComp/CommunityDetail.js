import React from 'react';
import { useParams } from 'react-router-dom';

const CommunityDetail = () => {
  const { comid } = useParams();
  
  return (
    <div>
      <h1>게시물 상세 페이지</h1>
      <p>게시물 ID: {comid}</p>
      
      {/* 게시물 상세 정보를 표시 */}
    </div>
  );
};

export default CommunityDetail;
