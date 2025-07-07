import React, { useEffect, useState } from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import styles from "../../css/mypage_managemypets.module.css";
import MyPetList from "../../component/MyPageComp/MyPetList";
import BottomSheet from "../../component/BottomSheet";
import PetCodeModal from "../../component/MyPageComp/PetCodeModal";
import { useSelector, useDispatch } from "react-redux";
import petApi from "../../api/petApi";
import { addPetToList, updatePetList } from "../../redux/reducers/petListReducer";
import MyPageSideBar from "../../component/MyPageComp/MyPageSideBar";

/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

// 아이콘
import { FaCirclePlus } from "react-icons/fa6";

const ManageMyPets = () => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const dispatch = useDispatch();
  const petList = useSelector((state) => state.petList.petList);
  const reduxMember = useSelector((state) => state.member.member);
  const [isLoaded, setIsLoaded] = useState(false);

  const [pets, setPets] =useState([]);

  useEffect(()=>{
    const fetchData= async()=>{
      try{
        const resp = await petApi.getMyPets(reduxMember.id);
        setPets(pets);
        dispatch(updatePetList(resp));
      }catch(error){
        console.log(error);
      } finally {
        setIsLoaded(true);
      }
      
    }
    fetchData();
  },[]);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [petCode, setPetCode] = useState("");

  const handleOpenBottomSheet = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onRegister = async () => {
    try {
      console.log("반려동물 코드로 등록 : ", petCode);

      const newPet = await petApi.postAddPet(petCode);

      if (newPet) {
        dispatch(addPetToList(newPet));
        setShowModal(false);
        // 페이지를 새로 고침하는 대신 상태를 업데이트하여 리액트의 상태 관리를 활용
      }
    } catch (error) {
      console.error("Error registering pet:", error);
    }
  };

  const handleOpenInputPetCodeModal = () => {
    setShowModal(true);
    setShowBottomSheet(false);
  };
  


  if(!isLoaded){
    return(<div>Loading...</div>);
  }
  return (
    <>
      <div className={`${isDeskTop && styles.wrapper_dtver}`}>
        <div className={`${isDeskTop && styles.inner_wrapper}`}>
          {isDeskTop && <MyPageSideBar option={"내 동물 관리"} />}
          <div className={`${isDeskTop && styles.rightside_wrapper}`}>
            <MyPageCommonTopBar title={"내 동물 관리"} />
            {/* <div className={styles.divider}></div> */}
            {<MyPetList petList={petList} />}{" "}
            <FaCirclePlus
              className={styles.register_icon}
              onClick={() => handleOpenBottomSheet("petRegister")}
            />
            <BottomSheet
              handleOpenInputPetCodeModal={handleOpenInputPetCodeModal}
              show={showBottomSheet}
              onClose={handleCloseBottomSheet}
              type={bottomSheetType}
            />
            {showModal && (
              <PetCodeModal
                type={"코드등록"}
                onClose={handleCloseModal}
                onRegister={onRegister}
                modalTitle={"반려동물 코드 입력"}
                setPetCode={setPetCode}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageMyPets;
