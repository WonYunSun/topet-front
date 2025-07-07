import React, { useState } from "react";
import styles from "../../css/animal_type.module.css";
/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const AnimalType = ({
  handleSelectedTypeChange,
  petData,
  setSelectedType,
  setSelectedKind,
}) => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const SelectPet = ({ petImg, petType, value }) => {
    return (
      <div className={styles.animal_type_wrapper}>
        <div
          className={`${styles.type} ${
            petData.petType === value ? styles.selected : ""
          }`}
          onClick={() => {
            handleSelectedTypeChange(value);
            setSelectedType(value);
            setSelectedKind(""); // 종류 초기화
          }}
        >
          <div className={styles.img_container}>
            <img
              src={petImg}
              className={`${styles.typeimg} `}
              alt={petType}
            ></img>
          </div>
        </div>
        <div className={styles.typename}>{petType}</div>
      </div>
    );
  };

  return (
    <div className={`${styles.wrapper} ${isDeskTop && styles.dtver}`}>
      <SelectPet
        petImg={
          "https://st.depositphotos.com/1007566/52420/v/600/depositphotos_524205590-stock-illustration-brown-dog-animal.jpg"
        }
        petType={"강아지"}
        value={1}
      ></SelectPet>
      <SelectPet
        petImg={
          "https://st.depositphotos.com/2585479/54977/v/600/depositphotos_549774432-stock-illustration-isolated-happy-cute-cat-domestic.jpg"
        }
        petType={"고양이"}
        value={2}
      ></SelectPet>
      <SelectPet
        petImg={
          "https://st4.depositphotos.com/1742172/22214/v/450/depositphotos_222142380-stock-illustration-flat-color-illustration-parrot.jpg"
        }
        petType={"특수동물"}
        value={3}
      ></SelectPet>
    </div>
  );
};

export default AnimalType;
