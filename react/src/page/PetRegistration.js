import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/pet_registration.module.css";
import RegisterTopBar from "../component/RegisterTopBar";
import AnimalType from "../component/AnimalSelectComp/AnimalType";
import AnimalKind from "../component/AnimalSelectComp/AnimalKind";
import AnimalGender from "../component/AnimalSelectComp/AnimalGender";
import AnimalBirth from "../component/AnimalSelectComp/AnimalBirth";
import AnimalPhotoandName from "../component/AnimalSelectComp/AnimalPhotoandName";
import AnimalWeightandHealth from "../component/AnimalSelectComp/AnimalWeightandHealth";
import CheckModal from "../component/CheckModal";
import { useSelector, useDispatch } from "react-redux";

import petApi from "../api/petApi";

/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const PetRegistration = () => {
  const reduxMember = useSelector((state) => state.member.member);

  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const defaultImage =
    "https://i.pinimg.com/564x/b5/b0/c0/b5b0c0313bfeb3cd262e16b546499a8c.jpg";

  const [stepNum, setStepNum] = useState(1);
  const [selectedType, setSelectedType] = useState(""); //강아지, 고양이, 특수반려동물

  const [selectedKind, setSelectedKind] = useState(""); //종 고르기

  const [selectedGender, setSelectedGender] = useState(); //남or여
  const [selectedNeutered, setSelectedNeuterd] = useState(""); //중성화
  const [checkedGender, setCheckedGender] = useState(false); //몰라요

  const [name, setName] = useState(); //이름
  const [selectedPhoto, setSelectedPhoto] = useState(defaultImage); //사진

  const [year, setYear] = useState(""); //생일
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [selectedBirth, setSelectedBirth] = useState("");
  const [birthDontKnow, setBirthDontKnow] = useState(false); //생일을몰라요

  const [weight, setWeight] = useState(); //건강정보
  const [allergy, setAllergy] = useState();
  const [health, setHealth] = useState();
  const [weightDontKnow, setWeightDontKnow] = useState(false); //무게를 몰라요

  const [nextPossible, setNextPossible] = useState(false); //다음단계 가능한가?

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // 동물 등록 정보
  const [petData, setPetData] = useState({
    type: "", // 동물 타입(강아지, 고양이, 특수동물)
    kind: "", // 동물 품종
    gender: "", // 동물 성별
    genderDontKnow: "", // 성별을 몰라요
    neutered: "", // 동물 중성화 여부
    name: "", // 동물 이름
    petProfilePhoto: "", // 동물 프로필 사진
    birth: "", // 동물 생일
    weight: "", // 동물 체중
    allergy: "", // 동물 알레르기
    health: "", // 동물 건강상태
  });

  useEffect(() => {
    //setCheckedGender(!checkedGender);
  }, [selectedType, selectedKind, selectedBirth]);

  useEffect(() => {
    showStepNum();
    consoleLog();
    nextPossibleFunction(stepNum);
  }, [stepNum]);

  useEffect(() => {
    NextPossibleComp();
  }, [nextPossible]);
  const navigate = useNavigate();
  const goHome = () => {
    navigate(`/home`);
  };

  const handleSelectedTypeChange = (value) => {
    if (selectedType != "" && selectedType != value) {
      ResetForm();
      setSelectedType(value);
      setNextPossible((selectedType >= 1 && selectedType <= 3) || value != "");
      setPetData({
        ...petData,
        petType: value,
        petKind: "",
      });
    } else {
      setSelectedType(value);
      setNextPossible((selectedType >= 1 && selectedType <= 3) || value != ""); // 선택된 타입이 있을 때만 다음 단계로 진행 가능하도록 설정
      setPetData({
        ...petData,
        petType: value,
        petKind: "",
      });
    }
  };

  const handleSelectedKindChange = (value) => {
    setSelectedKind(value);
    if (value != "") {
      setNextPossible(true); // 선택된 종류가 있을 때만 다음 단계로 진행 가능하도록 설정
    } else {
      setNextPossible(false);
    }
  };

  const handleSelectedGenderChange = (value) => {
    if (value == "중성화") {
      setSelectedNeuterd("중성화");
      setNextPossible(true);
    } else if (value == "성별모름") {
      setCheckedGender(true);
      setNextPossible(true);
    } else if (value == "") {
      setNextPossible(false);
    } else {
      //암컷수컷
      setSelectedGender(value);
      setNextPossible(true);
    }
  };

  const handleNameChange = (e) => {
    const tempName = e.target.value;
    if (tempName.length <= 25) {
      setName(tempName);
    }
    setNextPossible(tempName != ""); // change가 일어날때마다 하지말고, 값을 저장하고, 저장된값을 검증해서, 유효하면 nextPossible이 바뀌게 하면 되겠다.
  };

  const handleSelectedProfilePhotoChange = (value) => {
    setSelectedPhoto(value);
  };

  const handleSelectedBirthChange = (value) => {
    setSelectedBirth(value);
    setNextPossible(value != ""); // 선택된 종류가 있을 때만 다음 단계로 진행 가능하도록 설정
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleAllergyChange = (value) => {
    setAllergy(value);
  };

  const handleHealthChange = (value) => {
    setHealth(value);
  };

  const nextStep = () => {
    if (stepNum < 6) {
      setStepNum(stepNum + 1);
    } else {
      setStepNum(6);
    }
    setNextPossible(false);
  };

  const prevStep = () => {
    if (stepNum == 1) {
      //아니면 continue를 해야함
    }
    if (stepNum > 1) {
      setStepNum(stepNum - 1);
    } else {
      setStepNum(1);
    }
  };

  const ResetForm = () => {
    console.log("resetForm 작동됐음");
    setSelectedType("");
    setSelectedKind("");

    setSelectedGender("");
    setBirthDontKnow(false);

    setWeightDontKnow(false);
    setSelectedNeuterd(false);
    setCheckedGender(false);
    setSelectedBirth("");
    setYear("");
    setMonth("");
    setDay("");
    setName("");
    setWeight("");
    setAllergy("");
    setHealth("");
    setSelectedPhoto(null);
    consoleLog();
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("type", selectedType);
    formData.append("kind", selectedKind);
    formData.append("gender", selectedGender);
    formData.append("name", name);
    formData.append("neutered", selectedNeutered);
    formData.append("birth", selectedBirth);
    formData.append("weight", weight);
    formData.append("allergy", allergy ?? null); // undefined이면 null로 설정
    formData.append("health", health ?? null); // undefined이면 null로 설정

    formData.append("member", reduxMember.id);

    if (selectedPhoto != null) {
      formData.append("photo", selectedPhoto);
    }
    console.log(formData.get("type"));
    console.log(formData.get("kind"));
    console.log(formData.get("gender"));
    console.log(formData.get("name"));
    console.log(formData.get("birth"));
    console.log(formData.get("weight"));
    console.log(formData.get("health"));
    const resp = await petApi.postPetData(formData);

    if (resp.status == 200) {
      console.log(resp.status);
      // 반려동물 등록 성공 modal창
      toggleModal();
    } else {
      alert("펫 등록에 실패했습니다.");
    }
  };

  function nextPossibleFunction(stepNum) {
    switch (stepNum) {
      case 1:
        selectedType >= 1 && selectedType <= 3
          ? setNextPossible(true)
          : setNextPossible(false);
        return;
      case 2:
        selectedKind == "" ? setNextPossible(false) : setNextPossible(true);
        return;
      case 3:
        selectedGender == "" ? setNextPossible(false) : setNextPossible(true);
        return;
      case 4:
        name == "" ? setNextPossible(false) : setNextPossible(true);
        return;
      case 5:
        selectedBirth == "" && birthDontKnow == false
          ? setNextPossible(false)
          : setNextPossible(true);
        return;
      default:
        return 0;
    }
  }

  if (stepNum == 5) {
    console.log("4번째 다음버튼 상태: ", nextPossible);
  }
  const handleRegistFin = () => {
    submitForm();
  };

  const NextPossibleComp = () => {
    return (
      <div
        className={`${styles.stepbutton_wrapper} ${
          isDeskTop ? styles.dtver : styles.mbver
        }`}
      >
        {stepNum == 1 ? (
          ""
        ) : (
          <button
            className={`${styles.prevstep_button} ${
              isDeskTop ? styles.dtver : styles.mbver
            }`}
            onClick={prevStep}
          >
            이전
          </button>
        )}
        {nextPossible ? (
          stepNum == 6 ? (
            <button
              className={styles.nextstep_button}
              onClick={handleRegistFin}
            >
              {"완료"}
            </button>
          ) : (
            <button
              className={`${
                stepNum == 1
                  ? styles.first_nextstep_button
                  : styles.nextstep_button
              } ${isDeskTop ? styles.dtver : styles.mbver}`}
              onClick={nextStep}
            >
              {"다음"}
            </button>
          )
        ) : (
          <button
            className={`${
              stepNum == 1
                ? styles.disabled_first_nextstep_button
                : styles.disabled_nextstep_button
            } ${isDeskTop ? styles.dtver : styles.mbver}`}
            // onClick={stepNum == 6 ? goHome() : ""}
          >
            {stepNum < 6 ? "다음" : "완료"}
          </button>
        )}
      </div>
    );
  };

  function consoleLog() {
    console.log("-------------------------------------------------");
    console.log("Type: ", selectedType);
    console.log("Kind: ", selectedKind);
    console.log("Gender: ", selectedGender);
    console.log("name: ", name);
    console.log("birth: ", selectedBirth);
    console.log("weight: ", weight);
    console.log("allergy: ", allergy);
    console.log("health: ", health);
    console.log("setSelectedNeuterd :", selectedNeutered);
    console.log("checkedGender :", checkedGender);
    console.log("nextPossible", nextPossible);
    console.log("-------------------------------------------------");
  }
  const showStepNum = () => {
    switch (stepNum) {
      case 1:
        return (
          <div
            className={`${styles.component_wrapper} ${
              isDeskTop && styles.dtver
            }`}
          >
            <AnimalType
              setSelectedType={setSelectedType}
              handleSelectedTypeChange={handleSelectedTypeChange}
              setSelectedKind={setSelectedKind}
              petData={petData}
            />
            <NextPossibleComp />
          </div>
        );
      case 2:
        return (
          <div
            className={`${styles.component_wrapper} ${
              isDeskTop && styles.dtver
            }`}
          >
            <AnimalKind
              handleSelectedKindChange={handleSelectedKindChange}
              selectedType={selectedType}
              selectedKind={selectedKind}
              nextPossible={nextPossible}
              setNextPossible={setNextPossible}
            />
            <NextPossibleComp />
          </div>
        );
      case 3:
        return (
          <div
            className={`${styles.component_wrapper} ${
              isDeskTop && styles.dtver
            }`}
          >
            <AnimalGender
              handleSelectedGenderChange={handleSelectedGenderChange}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              selectedNeutered={selectedNeutered}
              setSelectedNeuterd={setSelectedNeuterd}
              selectedType={selectedType}
              checkedGender={checkedGender}
              setCheckedGender={setCheckedGender}
              setNextPossible={setNextPossible}
            />
            <NextPossibleComp />
          </div>
        );
      case 4:
        return (
          <div
            className={`${styles.component_wrapper} ${
              isDeskTop && styles.dtver
            }`}
          >
            <AnimalPhotoandName
              defaultImage={defaultImage}
              selectedPhoto={selectedPhoto}
              setSelectedPhoto={setSelectedPhoto}
              handleSelectedProfilePhotoChange={
                handleSelectedProfilePhotoChange
              }
              name={name}
              setName={setName}
              handleNameChange={handleNameChange}
              nextPossible={nextPossible}
              setNextPossible={setNextPossible}
            />
            <NextPossibleComp />
          </div>
        );
      case 5:
        return (
          <div
            className={`${styles.component_wrapper} ${
              isDeskTop && styles.dtver
            }`}
          >
            <AnimalBirth
              selectedBirth={selectedBirth}
              setSelectedBirth={setSelectedBirth}
              setNextPossible={setNextPossible}
              year={year}
              month={month}
              day={day}
              setYear={setYear}
              setMonth={setMonth}
              setDay={setDay}
              birthDontKnow={birthDontKnow}
              setBirthDontKnow={setBirthDontKnow}
            />
            <NextPossibleComp />
          </div>
        );
      case 6:
        return (
          <div
            className={`${styles.component_wrapper} ${
              isDeskTop && styles.dtver
            }`}
          >
            <AnimalWeightandHealth
              weight={weight}
              allergy={allergy}
              health={health}
              setWeight={setWeight}
              handleWeightChange={handleWeightChange}
              handleAllergyChange={handleAllergyChange}
              handleHealthChange={handleHealthChange}
              nextPossible={nextPossible}
              setNextPossible={setNextPossible}
              weightDontKnow={weightDontKnow}
              setWeightDontKnow={setWeightDontKnow}
            />
            <NextPossibleComp />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.container} ${isDeskTop && styles.dtver}`}>
      <div
        className={`${styles.wrapper} ${
          isDeskTop ? styles.dtver : styles.mdver
        }`}
      >
        <RegisterTopBar stepNum={stepNum} />
        {showStepNum(stepNum)}
        {showModal && (
          <CheckModal
            Content={"반려동물이 등록되었습니다."}
            onClose={goHome}
            oneBtn={true}
          />
        )}
      </div>
    </div>
  );
};

export default PetRegistration;
