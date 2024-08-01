import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import styles from "../../css/mypage_editpetprofile.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { TbPhoto, TbTriangleInvertedFilled } from "react-icons/tb";
import petApi from "../../api/petApi";




const EditPetProfile = () => {
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
  const { id } = useParams();
  const [myPet, setMyPet] = useState(petData1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await petApi.getMyPet(id);
        const temp = {
          type: response.type,
          photo: response.profileSrc,
          name: response.name,
          kind: response.kind,
          gender: response.gender,
          neutered: response.neutered,
          birth: response.birth,
          weight: response.weight,
          allergy: response.allergy,
          health: response.health,
        };



        setMyPet(temp);
        console.log(response);
        } catch (error) {
        
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [
    
  ]);

 


  // const petData1 = 
  // {
  //   type: "1",
  //   photo:
  //     "https://i.pinimg.com/236x/b8/50/10/b850101663c7da6734b03f83fc8c57f9.jpg",
  //   name: "단추",
  //   kind: "비숑 프리제",
  //   gender: "남아",
  //   neutered: "중성화",
  //   birth: "2020/04/13",
  //   weight: "7kg",
  //   allergy: "단백질류",
  //   health: "비만 꿈나무",
  // };
  // {
  //   type: myPet.type,
  //   photo:
  //     myPet.profileSrc,
  //   name: myPet.name,
  //   kind: myPet.kind,
  //   gender: myPet.gender,
  //   neutered: "중성화",
  //   birth: myPet.birth,
  //   weight: myPet.weight,
  //   allergy: "단백질류",
  //   health: "비만 꿈나무",
  // };


  const fileInputRef = useRef(null);
  const defaultProfileImage =
    "https://i.pinimg.com/564x/b5/b0/c0/b5b0c0313bfeb3cd262e16b546499a8c.jpg";

  const [profilePhoto, setProfilePhoto] = useState(myPet.photo);
  const [gender, setGender] = useState(myPet.gender);
  const [neutered, setNeutered] = useState(myPet.neutered);
  const [weight, setWeight] = useState(myPet.weight); // 체중 단위포함
  const [weightNum, setWeightNum] = useState(
    weight == "" ? "" : parseFloat(myPet.weight)
  ); // 체중 숫자만
  const [weightUnit, setWeightUnit] = useState(
    weight == "" ? "" : myPet.weight.replace(/[0-9]/g, "").trim()
  ); // 체중 단위만
  const [dontKnowWeight, setDontKnowWeight] = useState(
    weight == "" ? true : false
  );
  const [allergy, setAllergy] = useState(myPet.allergy);
  const [health, setHealth] = useState(myPet.health);
  const [dropdown, setDropdown] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const currentProfilePhoto = myPet.photo;
  const currentNeutered = myPet.neutered;
  const currentWeight = myPet.weight;
  const currentGender = myPet.gender;
  const currentAllergy = myPet.allergy;
  const currenthealth = myPet.health;

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
      <div className={styles.checkbox_wrapper}>
        {options.map((option) => (
          <label key={option} className={styles.checkbox_label}>
            {option == "성별모름" ? "성별을 몰라요" : option}
            <input
              type="radio"
              value={option}
              checked={gender === option}
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

  console.log(weight);
  console.log(weightNum);
  console.log(weightUnit);
  console.log(dontKnowWeight);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.wrapper}>
      <MyPageCommonTopBar />
      <div className={styles.editpart_wrapper}>
        <div className={styles.photo_wrapper}>
          {ProfilePhoto}
          {SelectingPhoto}
        </div>
        <div className={styles.textpart_container}>
          <CantEdit title={"이름"} content={myPet.name} />
          <CantEdit title={"품종"} content={myPet.kind} />
          {myPet.type == "3" ? <div className={styles.divider} /> : ""}
          {myPet.type == "3" ? (
            <CanEdit title={"성별"} />
          ) : (
            <CantEdit title={"성별"} content={myPet.gender} />
          )}
          {myPet.type != "3" ? <div className={styles.divider} /> : ""}
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
                    dontKnowWeight ? styles.disabled_unit_box : styles.unit_box
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
