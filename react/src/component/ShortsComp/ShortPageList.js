import React from "react";
import styles from "../../css/shortsscreen.module.css";
import ShortItem from "./ShortItem";

const ShortsPageList = ({ shorts }) => {
  return (
    <div className={styles.shortsGridContainer}>
      {shorts.map((short) => (
        <ShortItem
          key={short.id}
          id={short.id}
          thumbnailUrl={short.thumbnailUrl}
          title={short.title}
          author={short.author}
          widthAdjust="100%" // 그리드 내에서 너비를 조정
          heightAdjust="250px" // 필요 시 높이를 조정
        />
      ))}
    </div>
  );
};

export default ShortsPageList;
