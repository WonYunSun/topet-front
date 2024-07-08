import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import dogList from '../../data/dogList';
import catList from '../../data/catList';
import exoticPetList from '../../data/exoticPetList';
import styles from '../../css/animal_kind.module.css';

const AnimalKind = ({ selectedType, selectedKind, handleSelectedKindChange }) => {
    const [searchKind, setSearchKind] = useState([]);
    const [searchResult, setSearchResult] = useState(0);
    const [localSelectedKind, setLocalSelectedKind] = useState(selectedKind || '');

    useEffect(() => {
        ShowKindList();
    }, [searchResult, searchKind, selectedType]);

    const onSearch = (e) => {
        const userSearchWord = e.target.value.trim();
        setLocalSelectedKind(userSearchWord);
        if (userSearchWord === '') {
            setSearchResult(0);
            setSearchKind([]);
        } else {
            const list = searchList(selectedType);
            const results = list.filter((kind) => kind.includes(userSearchWord));

            if (results.length === 0) {
                setSearchKind(['기타']);
            } else {
                setSearchKind(results);
            }
            setSearchResult(1);
        }
    };

    const searchList = (value) => {
        if (value == 1) {
            return dogList;
        } else if (value == 2) {
            return catList;
        } else {
            return exoticPetList;
        }
    };

    const showList = () => {
        if (searchResult === 0) {
            return searchList(selectedType);
        } else {
            return searchKind;
        }
    };

    const onClickedKind = (kind) => {
        handleSelectedKindChange(kind);
        setLocalSelectedKind(kind);
        setSearchResult(0); // 검색 결과 목록을 초기화
        setSearchKind([]); // 검색 결과 목록을 초기화
    };

    const ShowKindList = () => {
        const list = showList();
        if (localSelectedKind !== '' && searchResult === 0) {
            return <div className={styles.emptyList}></div>;
        } else if (list.length === 0) {
            return (
                <div className={styles.kindwrapper}>
                    <div onClick={() => onClickedKind('기타')} className={styles.kind}>
                        기타
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.kindwrapper}>
                    {list.map((kind, index) => (
                        <div onClick={() => onClickedKind(kind)} className={styles.kind} key={index}>
                            {kind}
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div>
            <h1 className={styles.title}>품종을 알려주세요</h1>
            <div className="searchBarWrapper">
                <IoSearch className={styles.icon} />
                <input
                    className={styles.searchbar}
                    type="text"
                    value={localSelectedKind}
                    onChange={onSearch}
                    placeholder="검색해보세요!"
                />
            </div>
            <div className={styles.kindListContainer}>
                {localSelectedKind === '' ? <ShowKindList /> : null} {/* 검색어가 비어있을 때만 목록을 보여줌 */}
            </div>
        </div>
    );
};

export default AnimalKind;
