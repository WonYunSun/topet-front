import React, { useEffect, useState } from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar"
import styles from '../../css/mypage_managemypets.module.css';
import MyPetList from "../../component/MyPageComp/MyPetList";
import BottomSheet from "../../component/BottomSheet";
import PetCodeModal from "../../component/MyPageComp/PetCodeModal";
import { useSelector, useDispatch } from "react-redux";

const ManageMyPets = () => {

    const reduxMember = useSelector((state)=>state.member.member);
    //Redux에서 받아온 현재 로그인한 유저의 정보
    const myPets = reduxMember.pets
    

    console.log("reduxMember : ", reduxMember);
    //콘솔에, 
    /*
    {
        id: 1, 
        socialId: '3604958249', 
        name: '이정현', 
        email: 'andre1130@nate.com', 
        pets: Array(7)
    }
    라는 객체가 담겨서 오는데,
    여기서 pets 는 배열 안에 객체가 있음
    */

    console.log(myPets);
/*
위에 콘솔 실행하면 밑에처럼 데이터 나올텐데, 그 데이터들을 내 동물 관리 페이지에 집어넣어야함
0
: 
{id: 3, type: '1', kind: '그레이트 덴', gender: '남아', name: '3', …}
1
: 
{id: 4, type: '2', kind: '래그돌', gender: '남아', name: '33', …}
2
: 
{id: 5, type: '2', kind: '노르웨이 숲 고양이', gender: '남아', name: '세션refresh', …}

*/
    const dummyPetsData = myPets;
    
    // [
    //     {
    //         id: 1,
    //         photoUrl: "https://i.pinimg.com/564x/10/ae/6a/10ae6ade71b4d40c2af9a8bde4bd2002.jpg",
    //         name: "아기",
    //         type: '강아지',
    //         neutered: 'false',
    //         weight: '3.5kg',
    //         allergy: '닭 포함 단백질',
    //         health: '',
    //     }
    //    ]

    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [bottomSheetType, setBottomSheetType] = useState("");

    const handleOpenBottomSheet = (type) => {
        setBottomSheetType(type);
        setShowBottomSheet(true);
    };
    
    const handleCloseBottomSheet = () => {
        setShowBottomSheet(false);
    };

    return (
        <div>
            <MyPageCommonTopBar title={'내 동물 관리'} />
            <div>
                <MyPetList petProfileData={dummyPetsData} />
            </div>
            <div>
                <button onClick={() => handleOpenBottomSheet("petRegister")}>등록</button>
            </div>
            <BottomSheet show={showBottomSheet} onClose={handleCloseBottomSheet} type={bottomSheetType} />
        </div>
    )
}

export default ManageMyPets;