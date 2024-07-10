import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import dogList from '../../data/dogList';
import catList from '../../data/catList';
import exoticPetList from '../../data/exoticPetList';
import styles from '../../css/animal_kind.module.css';

const AnimalKind = ({ selectedType, selectedKind, handleSelectedKindChange, setNextPossible }) => {
    const [searchKind, setSearchKind] = useState([]);
    const [searchResult, setSearchResult] = useState(0);
    const [localSelectedKind, setLocalSelectedKind] = useState('');

    useEffect(() => {
        setLocalSelectedKind(selectedKind || '');
    }, [selectedKind]);

    const onSearch = (e) => {
        const userSearchWord = e.target.value.trim();
        setLocalSelectedKind(userSearchWord);
        
        if(userSearchWord != localSelectedKind){
            setNextPossible(false);
            setSearchKind('');
        }


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
        console.log(kind);
        handleSelectedKindChange(kind);
        
        setLocalSelectedKind(kind);
        setSearchResult(1); // 검색 결과 목록을 초기화
        setSearchKind([]); // 검색 결과 목록을 초기화
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
                {searchResult === 0 ? (
                    <div className={styles.kindwrapper}>
                        {showList().map((kind, index) => (
                            <div onClick={() => onClickedKind(kind)} className={styles.kind} key={index}>
                                {kind}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.kindwrapper}>
                        {searchKind.map((kind, index) => (
                            <div onClick={() => onClickedKind(kind)} className={styles.kind} key={index}>
                                {kind}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalKind;
