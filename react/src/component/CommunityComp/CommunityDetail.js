import React from 'react';
import { useParams } from 'react-router-dom';

const CommunityDetail = () => {
  const { comid } = useParams();

  // 여기서 comid를 사용하여 게시물 데이터를 가져와서 표시합니다.
  // 예시로 간단히 comid를 표시하는 코드를 작성했습니다.
  
  return (
    <div>
      <h1>게시물 상세 페이지</h1>
      <p>게시물 ID: {comid}</p>
      
      {/* 게시물 상세 정보를 표시 */}
    </div>
  );
};

export default CommunityDetail;
