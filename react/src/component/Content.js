import React from "react";
import "../css/community_write_content.css";

const Content = ({
  value,
  handleContentTextChange,
  maxLength,
  placeholder,
}) => {
  return (
    <div className="contentwrite">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={handleContentTextChange}
        maxLength={maxLength} // 1500자로 설정하면, 영어는 1500자까지만 쳐지는데, 한글은 1501자까지 쳐짐
      ></textarea>
      <div className="div_line"></div>
      <div className="contentcount">
        {value.length}/{maxLength + 1}
      </div>
    </div>
  );
};

export default Content;
