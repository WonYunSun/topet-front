import React from "react";
import { useNavigate } from "react-router-dom";

const ChoicePetRegister = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };

  const goPetRegistration = () => {
    navigate("/petregistration");
  };

  return (
    <div>
      <div onClick={goPetRegistration}>반려동물 등록하기</div>
      <div onClick={goHome}>나중에 등록하기</div>
    </div>
  );
};

export default ChoicePetRegister;
