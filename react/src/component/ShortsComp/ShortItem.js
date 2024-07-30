import React from "react";
import styles from "../../css/shorts.module.css";

const ShortItem = ({
  thumbnailUrl,
  title,
  author,
  widthAdjust,
  heightAdjust,
}) => {
  const customStyle = {
    width: widthAdjust || "auto",
    height: heightAdjust || "auto",
  };

  return (
    <div className={styles.shortItem} style={customStyle}>
      <img src={thumbnailUrl} alt={title} className={styles.thumbnail} />
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        {/* <div className={styles.author}>{author}</div> */}
      </div>
    </div>
  );
};

export default ShortItem;
