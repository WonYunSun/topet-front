import React from "react";
import ShortItem from "./ShortItem";
import styles from "../../css/shorts.module.css";

const ShortsList = ({ shortsData }) => {
  return (
    <div className={styles.shortsList}>
      {shortsData.map((short) => (
        <ShortItem
          key={short.id}
          thumbnailUrl={short.thumbnailUrl}
          title={short.title}
          author={short.author}
        />
      ))}
      <div className={styles.seeMore}>쇼츠 더보기</div>
    </div>
  );
};
export default ShortsList;
