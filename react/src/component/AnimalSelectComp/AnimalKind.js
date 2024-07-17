import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import dogList from '../../data/dogList';
import catList from '../../data/catList';
import exoticPetList from '../../data/exoticPetList';
import styles from '../../css/animal_kind.module.css';

const AnimalKind = ({ selectedType, selectedKind, handleSelectedKindChange, setNextPossible, nextPossible }) => {
    const [searchKind, setSearchKind] = useState([]);
    const [searchResult, setSearchResult] = useState(0);
    const [localSelectedKind, setLocalSelectedKind] = useState('');
    const [userSearchWord, setuUserSearchWord] = useState('');
    const [IsKindSelected, setIsKindSelected] = useState(false);

    

    useEffect(() => {
        setLocalSelectedKind(selectedKind || '');
    }, [selectedKind]);

    const onSearch = (e) => {
        
        console.log(selectedKind);
        console.log(localSelectedKind);

        setIsKindSelected(false);

        let TempUserSearchWord = e.target.value;
        if(TempUserSearchWord === undefined ) {
            TempUserSearchWord = "";
        }
        
        

        setLocalSelectedKind(TempUserSearchWord);
        if(TempUserSearchWord != localSelectedKind){
            setNextPossible(false);
            setSearchKind('');
        }


        if (TempUserSearchWord === '') {
            setSearchResult(0);
            setSearchKind([]);
        } else {
            const list = searchList(selectedType);
            const results = list.filter((kind) => kind.includes(TempUserSearchWord));

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
        setSearchResult(1); // 검색 결과 목록을 초기화
        setSearchKind([]); // 검색 결과 목록을 초기화
        setIsKindSelected(true);
    };


    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>품종을 알려주세요</h1>
            {IsKindSelected ? 
            <div onClick={onSearch}>{localSelectedKind}</div> 
            :
            <div className={styles.searchbar_wrapper}>
            <IoSearch className={styles.searchbar_icon} />
                <input
                    className={styles.searchbar}
                    type="text"
                    value={selectedKind}
                    onChange={onSearch}
                    placeholder="검색해보세요!"
                />
            </div> }
            
            <div className={styles.kind_list_container}>
                {searchResult === 0 ? (
                    <div className={styles.kind_wrapper}>
                        {showList().map((kind, index) => (
                            <div onClick={() => onClickedKind(kind)} className={styles.kind} key={index}>
                                {kind}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.kind_wrapper}>
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
