import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import ShortItem from "./ShortItem";
import styles from "../../css/shorts.module.css";

const ShortsList = ({ shortsData, seemoreSkip }) => {
  const navigate = useNavigate();
  const goShorts = () => {
    navigate(`/shorts`);
  };
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

      <div className={styles.seeMore} onClick={goShorts}>
        <div>더 보기</div>
        <BsArrowRight size={26} />
      </div>
    </div>
  );
};
export default ShortsList;
