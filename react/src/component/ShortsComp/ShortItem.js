import React from "react";
import styles from "../../css/shorts.module.css";

import { useNavigate } from "react-router-dom";

const ShortItem = ({
  thumbnailUrl,
  content,
  author,
  widthAdjust,
  heightAdjust,
  id,
}) => {
  const navigate = useNavigate();

  const customStyle = {};

  if (widthAdjust) {
    customStyle.width = widthAdjust;
  }

  if (heightAdjust) {
    customStyle.height = heightAdjust;
  }
  const goDetail = (id) => {
    navigate(`/shortsDetail/${id}`);
  };

  return (
    <div
      className={`${styles.shortItem}`}
      style={customStyle}
      onClick={() => {
        goDetail(id);
      }}
    >
      <img src={thumbnailUrl} alt={content} className={styles.thumbnail} />
      <div className={styles.info}>
        <div className={styles.title}>{content}</div>
        {/* <div className={styles.author}>{author}</div> */}
      </div>
    </div>
  );
};

export default ShortItem;
