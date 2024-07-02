import React from 'react';

function PhotoSelectButton({ text, fontSize }) {
  return (
    <div>
      <input
        type='file'
        style={{
          backgroundColor: "tomato",
          color: "white",
          padding: "10px 20px",
          border: 0,
          borderRadius: 10,
          fontSize: fontSize || 10 // fontSize 기본값 설정
        }}
      />
    </div>
  );
}

export default PhotoSelectButton;
