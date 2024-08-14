import React, { useRef, useEffect } from "react";
import "../css/community_write_title.css";

const Title = ({ value, handleTitleTextChange }) => {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className="titlewrite">
      <textarea
        ref={textareaRef}
        placeholder="제목을 입력해주세요"
        value={value}
        onChange={(e) => {
          handleTitleTextChange(e);
          adjustHeight();
        }}
        maxLength="49" // 50자로 설정하면, 영어는 50자까지만 쳐지는데, 한글은 51자까지 쳐짐
        rows="1"
      ></textarea>
      <div className="div_line"></div>
      <div className="titlecount">{value.length}/50</div>
    </div>
  );
};

export default Title;
