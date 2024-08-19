import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import CheckModal from "../../component/CheckModal";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import styles from "../../css/mypage_editpetprofile.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { TbPhoto, TbTriangleInvertedFilled } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import petApi from "../../api/petApi";

/// responsive
import { useMediaQuery } from "react-responsive";
import { updateMember } from "../../redux/reducers/memberReducer";
import { DeskTop, Mobile } from "../../responsive/responsive";

const EditPetProfile = () => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 뒤로가기
  };
  const location = useLocation();
  const id = location.state?.id;

  const petData1 = {
    type: "",
    photo: "",
    name: "",
    kind: "",
    gender: "",
    neutered: "",
    birth: "",
    weight: "",
    allergy: "",
    health: "",
  };

  const [myPet, setMyPet] = useState(petData1);
  console.log("id : ", id);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await petApi.getMyPet(id);
        console.log("editPetProfile : ", response);
        setMyPet(response);
        // 데이터 로드 후 상태 설정
        setName(response.name);
        setGender(response.gender || "");
        setNeutered(response.neutered || "");
        // setWeight(response.weight || "");
        // setWeightNum(response.weight ? parseFloat(response.weight) : "");
        // setWeightUnit(
        //   response.weight ? response.weight.replace(/[0-9]/g, "").trim() : ""
        // );

      // 체중을 숫자와 단위로 분리
      const weight = response.weight || "";
      const weightMatch = weight.match(/^(\d*\.?\d+)([a-zA-Z]*)$/);
      const weightNum = weightMatch ? weightMatch[1] : "";
      const weightUnit = weightMatch ? weightMatch[2] : "";

      setWeightNum(weightNum);
      setWeightUnit(weightUnit);
      setWeight(`${weightNum}${weightUnit}`);
      setDontKnowWeight(weight ? false : true);

        setDontKnowWeight(response.weight ? false : true);
        setAllergy(response.allergy !== "null" ? response.allergy : "");
        setHealth(response.health !== "null" ? response.health : "");
      } catch (error) {
        console.error("Error fetching pet data:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [id]); // id가 변경될 때마다 fetchData를 호출

  const fileInputRef = useRef(null);

  // 기존 데이터
  const currentName = myPet.name;
  const currentProfilePhoto = myPet.photo;
  const currentNeutered = myPet.neutered;
  const currentWeight = myPet.weight;
  const currentWeightUnit = myPet.weight.replace(/[0-9]/g, "").trim();
  const currentGender = myPet.gender;
  const currentAllergy = myPet.allergy !== "null" ? myPet.allergy : "";
  const currentHealth = myPet.health !== "null" ? myPet.health : "";

  const [name, setName] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [gender, setGender] = useState();
  const [neutered, setNeutered] = useState();
  const [weight, setWeight] = useState(); // 체중 단위포함
  const [weightNum, setWeightNum] = useState(); // 체중 숫자만
  const [weightUnit, setWeightUnit] = useState(); // 체중 단위만
  const [dontKnowWeight, setDontKnowWeight] = useState();
  const [allergy, setAllergy] = useState();
  const [health, setHealth] = useState();

  const [dropdown, setDropdown] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      (weight == "" && dontKnowWeight == false) ||
      (name == currentName &&
        weight == currentWeight &&
        weightUnit == currentWeightUnit &&
        allergy == currentAllergy &&
        health == currentHealth &&
        profilePhoto == currentProfilePhoto &&
        gender == currentGender &&
        neutered == currentNeutered)
    ) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
  }, [
    canSave,
    name,
    weight,
    weightUnit,
    dontKnowWeight,
    gender,
    allergy,
    health,
    profilePhoto,
    neutered,
  ]);

  const photoSelect = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleFileChange = useCallback(
    (event) => {
      const photo = event.target.files[0];
      setProfilePhoto(photo);
    },
    [setProfilePhoto]
  );

  const handleProfilePhotoChange = (value) => {
    setProfilePhoto(value);
  };

  const handleWeightChange = (e) => {
    let tempWeightNum = e.target.value;
    
    if (/^\d*\.?\d*$/.test(tempWeightNum) && tempWeightNum.length <= 7) {
      setWeightNum(tempWeightNum);
      setWeight(`${tempWeightNum}${weightUnit}`);
    }
  };

  const handleWeightBlur = () => {
    if (weightNum.endsWith('.')) {
      const newWeightNum = `${weightNum}0`; // .으로 끝나면 0을 붙임
      setWeightNum(newWeightNum);
      setWeight(`${newWeightNum}${weightUnit}`);
    }
    console.log("in onBlur - weight :", weight);
  };
  
  console.log("weight1 :", weight);

  const handleWeightUnitChange = (unit) => {
    if (dontKnowWeight == false) {
      setWeightUnit(unit);
      setWeight(`${weightNum}${unit}`);
      setDropdown(false);
    }
  };
  
  console.log("weight2 :", weight);

  const handleDontKnowWeight = () => {
    setDontKnowWeight((prev) => !prev);
    if (!dontKnowWeight) {
      setWeight("");
      setWeightNum("");
    }
  };

  const handleNameChange = (e) => {
    const tempName = e.target.value;
    setName(tempName);
  };

  const handleAllergyChange = (e) => {
    const tempAllergy = e.target.value;
    setAllergy(tempAllergy);
  };

  const handleHealthChange = (e) => {
    const tempHealth = e.target.value;
    setHealth(tempHealth);
  };

  const SaveProfile = async () => {
    const formData = new FormData();

    if (profilePhoto != null) {
      formData.append("photo", profilePhoto);
    }

    formData.append("id", id);
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("weight", weight);
    formData.append("allergy", allergy);
    formData.append("health", health);
    formData.append("neutered", neutered);
    formData.append("kind", myPet.kind);
    formData.append("type", myPet.type);
    formData.append("uid", myPet.uid);
    const resp = await petApi.updatePet(formData);

    if (resp.status == 200) {
      console.log(resp.status);
      // 반려동물 수정 성공 modal창
      toggleModal();
    } else {
      alert("반려동물 수정에 실패했습니다.");
    }

  };

  const ProfilePhoto = useMemo(() => {
    return (
      <div
        className={styles.profile_photo_wrapper}
        onChange={handleProfilePhotoChange}
      >
        {profilePhoto && typeof profilePhoto === "object" ? (
          <div className={styles.selected_profile_photo_container}>
            <img
              src={URL.createObjectURL(profilePhoto)}
              className={styles.selected_profile_photo}
              alt="Profile"
            />
          </div>
        ) : (
          <div className={styles.selected_profile_photo_container}>
            {myPet != null ? (
              <img
                src={myPet.profileSrc}
                className={styles.selected_profile_photo}
                alt="Profile"
              />
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    );
  }, [setProfilePhoto, handleProfilePhotoChange]);

  const SelectingPhoto = useMemo(() => {
    return (
      <div className={styles.selecting_photo_button} onClick={photoSelect}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <TbPhoto className={styles.selecting_photo_icon} />
      </div>
    );
  }, [photoSelect, handleFileChange]);

  // 성별 체크박스
  const GenderCheckbox = ({ gender, setGender }) => {
    const options = ["남아", "여아", "성별모름"];

    return (
      <div className={styles.checkbox_wrapper}>
        {options.map((option) => (
          <label key={option} className={styles.checkbox_label}>
            {option == "성별모름" ? "성별을 몰라요" : option}
            <input
              type="radio"
              value={option}
              checked={gender == option}
              onChange={() => setGender(option)}
              className={styles.checkbox}
            />
          </label>
        ))}
      </div>
    );
  };

  // 중성화 체크박스
  const NeutertedCheckbox = ({ neutered, setNeutered }) => {
    const options = ["중성화", ""];

    return (
      <div className={styles.checkbox_wrapper}>
        {options.map((option) => (
          <label key={option} className={styles.checkbox_label}>
            {option == "중성화" ? "했어요" : "안했어요"}
            <input
              type="radio"
              value={option}
              checked={neutered === option}
              onChange={() => setNeutered(option)}
              className={styles.checkbox}
            />
          </label>
        ))}
      </div>
    );
  };

  // 수정 불가능한 요소 (이름, 품종, 성별(강아지, 고양이))
  const CantEdit = ({ title, content }) => {
    return (
      <div className={styles.diseditable_container}>
        <div className={styles.diseditable_title}>{title}</div>
        <div className={styles.diseditable_content}>{content}</div>
      </div>
    );
  };

  // 수정 가능한 요소 (성별(특수동물), 중성화 여부)
  const CanEdit = ({ title }) => {
    return (
      <div className={styles.editable_wrapper}>
        <div
          className={`${
            title == "중성화 여부"
              ? styles.neutered_title
              : styles.editable_title
          }`}
        >
          {title}
        </div>
        <div className={styles.editable_content}>
          {title == "성별" ? (
            <GenderCheckbox gender={gender} setGender={setGender} />
          ) : (
            ""
          )}
          {title == "중성화 여부" ? (
            <NeutertedCheckbox neutered={neutered} setNeutered={setNeutered} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const goManageMyPets = () => {
    navigate(`/managemypets`);
  }

  return (
    <>
      <div className={`${isDeskTop && styles.wrapper_dtver}`}>
        <div className={styles.wrapper}>
          {isMobile && (
            <div className={styles.back_icon_wrapper}>
              <GoArrowLeft className={styles.back_icon} onClick={goBack} />
            </div>
          )}
          <div className={styles.editpart_wrapper}>
            <div className={styles.photo_wrapper}>
              {ProfilePhoto}
              {SelectingPhoto}
            </div>
            <div className={styles.textpart_container}>
              {/* <CantEdit title={"이름"} content={myPet.name} /> */}
              <CantEdit title={"품종"} content={myPet.kind} />
              {myPet.type != "3" && (
                <CantEdit title={"성별"} content={myPet.gender} />
              )}
              {/* {myPet.type == "3" && <div className={styles.divider} />} */}
              {/* {myPet.type != "3" ? <div className={styles.divider} /> : ""} */}
              <div className={styles.divider} />
              <div className={styles.editable_wrapper}>
                <div className={styles.editable_title}>이름</div>
                <div className={styles.editable_content}>
                  <div className={styles.editable_input_wrapper}>
                    <input
                      value={name}
                      onChange={handleNameChange}
                      placeholder={"반려동물의 이름을 입력해주세요"}
                      className={styles.editable_input}
                    />
                  </div>
                </div>
              </div>
              {myPet.type == "3" && <CanEdit title={"성별"} />}
              {myPet.type != "3" ? <CanEdit title={"중성화 여부"} /> : ""}
              <div className={styles.editable_wrapper}>
                <div className={styles.editable_title}>체중</div>
                <div className={styles.editable_content}>
                  <div
                    className={`${
                      dontKnowWeight
                        ? styles.disabled_weight_input_wrapper
                        : styles.weight_input_wrapper
                    }`}
                  >
                    <input
                      type="text"
                      value={weightNum}
                      onChange={handleWeightChange}
                      onBlur={handleWeightBlur}
                      placeholder="체중을 입력해주세요"
                      disabled={dontKnowWeight}
                      className={`${
                        dontKnowWeight
                          ? styles.disabled_weight_input
                          : styles.weight_input
                      }`}
                    />
                    <div
                      className={`${
                        dontKnowWeight
                          ? styles.disabled_unit_box
                          : styles.unit_box
                      }`}
                      onClick={() => {
                        setDropdown((prev) => !prev);
                      }}
                    >
                      <div
                        className={`${
                          dontKnowWeight
                            ? styles.disabled_selecting_unit
                            : styles.selecting_unit
                        }`}
                      >
                        {weightUnit == "" ? "kg" : weightUnit}
                        <TbTriangleInvertedFilled
                          className={styles.dropdown_icon}
                        />
                      </div>
                      {!dontKnowWeight && dropdown && (
                        <div className={styles.options}>
                          <div
                            className={styles.option}
                            onClick={(e) => {
                              handleWeightUnitChange("kg");
                              e.stopPropagation();
                            }}
                          >
                            kg
                          </div>
                          <div
                            className={styles.option}
                            onClick={(e) => {
                              handleWeightUnitChange("g");
                              e.stopPropagation();
                            }}
                          >
                            g
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.dontknowweight}>
                    체중을 몰라요
                    <div className={styles.dontknowweight_checkbox_wrapper}>
                      <input
                        type="checkbox"
                        checked={dontKnowWeight}
                        onChange={handleDontKnowWeight}
                        className={styles.dontknowweight_checkbox}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.editable_wrapper}>
                <div className={styles.editable_title}>알러지</div>
                <div className={styles.editable_content}>
                  <div className={styles.editable_input_wrapper}>
                    <input
                      value={allergy}
                      onChange={handleAllergyChange}
                      placeholder={"반려동물의 알러지를 입력해주세요"}
                      className={styles.editable_input}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.editable_wrapper}>
                <div className={styles.editable_title}>건강상태</div>
                <div className={styles.editable_content}>
                  <div className={styles.editable_input_wrapper}>
                    <input
                      value={health}
                      onChange={handleHealthChange}
                      placeholder={"반려동물의 건강상태를 입력해주세요"}
                      className={styles.editable_input}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.save_button_wrapper} ${
              isDeskTop ? styles.dtver : styles.mbver
            }`}
          >
            <button
              className={`${styles.save_button} ${
                !canSave && styles.disabled
              } ${isDeskTop && styles.dtver}`}
              onClick={SaveProfile}
            >
              {"저장"}
            </button>
          </div>
          {showModal && (
          <CheckModal
            Content={"수정이 완료되었습니다."}
            onClose={goManageMyPets}
            oneBtn={true}
          />
        )}
        </div>
      </div>
    </>
  );
};

export default EditPetProfile;
