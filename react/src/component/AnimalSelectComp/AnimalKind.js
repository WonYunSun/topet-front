import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import dogList from "../../data/dogList";
import catList from "../../data/catList";
import exoticPetList from "../../data/exoticPetList";
import styles from "../../css/animal_kind.module.css";
import { MdEdit } from "react-icons/md";
/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const AnimalKind = ({
  selectedType,
  selectedKind,
  handleSelectedKindChange,
  setNextPossible,
}) => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const [searchKind, setSearchKind] = useState([]);
  const [searchResult, setSearchResult] = useState(0);
  const [localSelectedKind, setLocalSelectedKind] = useState("");
  const [isKindSelected, setIsKindSelected] = useState(!!selectedKind);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalSelectedKind(selectedKind || "");
  }, [selectedKind]);

  const onSearch = (e) => {
    const tempUserSearchWord = e.target.value || "";

    setLocalSelectedKind(tempUserSearchWord);
    if (tempUserSearchWord !== localSelectedKind) {
      setNextPossible(false);
      setSearchKind([]);
    }

    if (tempUserSearchWord === "") {
      setSearchResult(0);
      setSearchKind([]);
    } else {
      const list = searchList(selectedType);
      const results = list.filter((kind) => kind.includes(tempUserSearchWord));
      setSearchKind(results.length === 0 ? ["기타"] : results);
      setSearchResult(1);
    }
  };

  const searchList = (value) => {
    if (value === 1) return dogList;
    else if (value === 2) return catList;
    else return exoticPetList;
  };

  const showList = () => {
    return searchResult === 0 ? searchList(selectedType) : searchKind;
  };

  const onClickedKind = (kind) => {
    handleSelectedKindChange(kind);
    setLocalSelectedKind(kind);
    setSearchResult(1);
    setSearchKind([]);
    setIsKindSelected(true);
    setIsInputFocused(false); // 목록을 숨김
  };

  const handleEditClick = () => {
    setIsKindSelected(false);
    setIsInputFocused(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(
          localSelectedKind.length,
          localSelectedKind.length
        );
        updateSearchKindList();
      }
    }, 0);
  };

  const updateSearchKindList = () => {
    const list = searchList(selectedType);
    const results = list.filter((kind) => kind.includes(localSelectedKind));
    setSearchKind(results.length === 0 ? ["기타"] : results);
    setSearchResult(1);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    updateSearchKindList();
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false); // input에서 포커스가 벗어날 때 목록을 숨김
    }, 100);
  };

  return (
    <div className={`${styles.container} ${isDeskTop && styles.dtver}`}>
      <h1 className={styles.title}>품종을 알려주세요</h1>
      {isKindSelected ? (
        <div
          className={styles.selected_searchbar_wrapper}
          onClick={handleEditClick}
        >
          <div className={styles.searchbar_selected_text}>
            {localSelectedKind}
          </div>
          <MdEdit className={styles.selected_searchbar_edit_icon} />
        </div>
      ) : (
        <div className={styles.searchbar_wrapper}>
          <IoSearch className={styles.searchbar_icon} />
          <input
            className={styles.searchbar}
            type="text"
            value={localSelectedKind}
            onChange={onSearch}
            placeholder="검색해보세요!"
            ref={inputRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
      )}

      {isInputFocused && (
        <div
          className={`${styles.kind_list_container} ${
            isDeskTop && styles.dtver
          }`}
        >
          <div
            className={`${styles.kind_wrapper} ${isDeskTop && styles.dtver}`}
          >
            {showList().map((kind, index) => (
              <div
                onClick={() => onClickedKind(kind)}
                className={styles.kind}
                key={index}
              >
                {kind}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalKind;
