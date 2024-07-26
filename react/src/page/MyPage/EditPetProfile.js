import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import styles from "../../css/mypage_editpetprofile.module.css";
import { TbPhoto, TbTriangleInvertedFilled } from "react-icons/tb";

const petData1 = {
  type: "1",
  photo:
    "https://i.pinimg.com/236x/b8/50/10/b850101663c7da6734b03f83fc8c57f9.jpg",
  name: "단추",
  kind: "비숑 프리제",
  gender: "남아",
  neutered: "중성화",
  birth: "2020/04/13",
  weight: "7kg",
  allergy: "단백질류",
  health: "비만 꿈나무",
};

const petData = {
  type: "3",
  photo:
    "https://i.pinimg.com/236x/5a/44/b1/5a44b1276b31fb751ddbcf9652447a7b.jpg",
  name: "민톨이",
  kind: "햄스터",
  gender: "성별모름",
  birth: "생일모름",
  weight: "",
  allergy: "단백질류",
  health: "비만 꿈나무",
};

const EditPetProfile = () => {
  const fileInputRef = useRef(null);
  const defaultProfileImage =
    "https://i.pinimg.com/564x/b5/b0/c0/b5b0c0313bfeb3cd262e16b546499a8c.jpg";

  const [profilePhoto, setProfilePhoto] = useState(petData1.photo);
  const [gender, setGender] = useState(petData1.gender);
  const [neutered, setNeutered] = useState(petData1.neutered);
  const [weight, setWeight] = useState(petData1.weight); // 체중 단위포함
  const [weightNum, setWeightNum] = useState(
    weight == "" ? "" : parseFloat(petData1.weight)
  ); // 체중 숫자만
  const [weightUnit, setWeightUnit] = useState(
    weight == "" ? "" : petData1.weight.replace(/[0-9]/g, "").trim()
  ); // 체중 단위만
  const [dontKnowWeight, setDontKnowWeight] = useState(
    weight == "" ? true : false
  );
  const [allergy, setAllergy] = useState(petData1.allergy);
  const [health, setHealth] = useState(petData1.health);
  const [dropdown, setDropdown] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const currentProfilePhoto = petData1.photo;
  const currentNeutered = petData1.neutered;
  const currentWeight = petData1.weight;
  const currentGender = petData1.gender;
  const currentAllergy = petData1.allergy;
  const currenthealth = petData1.health;

  useEffect(() => {
    if (profilePhoto == undefined) {
      setProfilePhoto(currentProfilePhoto);
    }
    if (
      (weight == "" && dontKnowWeight == false) ||
      (weight == currentWeight &&
        allergy == currentAllergy &&
        health == currenthealth &&
        profilePhoto == currentProfilePhoto &&
        gender == currentGender &&
        neutered == currentNeutered)
    ) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
  }, [
    profilePhoto,
    canSave,
    weight,
    dontKnowWeight,
    gender,
    allergy,
    health,
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
    const tempWeightNum = e.target.value;
    if (/^\d*\.?\d*$/.test(tempWeightNum)) {
      setWeightNum(tempWeightNum);
      setWeight(`${tempWeightNum}${weightUnit}`);
    }
  };

  const handleWeightUnitChange = (unit) => {
    if (dontKnowWeight == false) {
      setWeightUnit(unit);
      setWeight(`${weightNum}${weightUnit}`);
      setDropdown(false);
    }
  };

  const handleDontKnowWeight = () => {
    setDontKnowWeight((prev) => !prev);
    if (!dontKnowWeight) {
      setWeight("");
      setWeightNum("");
    }
  };

  const handleAllergyChange = (e) => {
    const tempAllergy = e.target.value;
    setAllergy(tempAllergy);
  };

  const handleHealthChange = (e) => {
    const tempHealth = e.target.value;
    setHealth(tempHealth);
  };

  const SaveProfile = () => {
    console.log("저장");
  };

  console.log("canSave: ", canSave);

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
            <img
              src={profilePhoto}
              className={styles.selected_profile_photo}
              alt="Profile"
            />
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
      <div className={styles.checkboxContainer}>
        {options.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="radio"
              value={option}
              checked={gender === option}
              onChange={() => setGender(option)}
              className={styles.checkbox}
            />
            {option == "성별모름" ? "성별을 몰라요" : option}
          </label>
        ))}
      </div>
    );
  };

  // 중성화 체크박스
  const NeutertedCheckbox = ({ neutered, setNeutered }) => {
    const options = ["중성화", ""];

    return (
      <div className={styles.checkboxContainer}>
        {options.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="radio"
              value={option}
              checked={neutered === option}
              onChange={() => setNeutered(option)}
              className={styles.checkbox}
            />
            {option == "중성화" ? "했어요" : "안했어요"}
          </label>
        ))}
      </div>
    );
  };

  console.log("neutered: ", neutered);

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
        <div className={styles.editable_title}>{title}</div>
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

  console.log(weight);
  console.log(weightNum);
  console.log(weightUnit);
  console.log(dontKnowWeight);

  return (
    <div className={styles.wrapper}>
      <MyPageCommonTopBar />
      <div className={styles.editpart_wrapper}>
        <div className={styles.photo_wrapper}>
          {ProfilePhoto}
          {SelectingPhoto}
        </div>
        <div className={styles.textpart_container}>
          <CantEdit title={"이름"} content={petData1.name} />
          <CantEdit title={"품종"} content={petData1.kind} />
          {petData1.type == "3" ? (
            <CanEdit title={"성별"} />
          ) : (
            <CantEdit title={"성별"} content={petData1.gender} />
          )}
          {petData1.type != "3" ? <CanEdit title={"중성화 여부"} /> : ""}
          <div className={styles.editable_wrapper}>
            <div className={styles.editable_title}>체중</div>
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
                  dontKnowWeight ? styles.disabled_unit_box : styles
                }`}
                onClick={() => {
                  setDropdown((prev) => !prev);
                }}
              >
                <div
                  className={`${
                    dontKnowWeight
                      ? styles.disabled_unit_text
                      : styles.unit_text
                  }`}
                >
                  {weightUnit == "" ? "kg" : weightUnit}
                  <TbTriangleInvertedFilled className={styles.dropdown_icon} />
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
            <div className={styles.dontknowweight_text}>
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
          <div className={styles.editable_wrapper}>
            <div className={styles.editable_title}>알러지</div>
            <div className={styles.editable_input_wrapper}>
              <input
                value={allergy}
                onChange={handleAllergyChange}
                placeholder={"반려동물의 알러지를 입력해주세요"}
                className={styles.editable_input}
              />
            </div>
          </div>
          <div className={styles.editable_wrapper}>
            <div className={styles.editable_title}>건강상태</div>
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
      <div className={styles.save_button_wrapper}>
        <button
          className={`${
            !canSave ? styles.disabled_save_button : styles.save_button
          }`}
          onClick={SaveProfile}
        >
          {"저장"}
        </button>
      </div>
    </div>
  );
};

export default EditPetProfile;
