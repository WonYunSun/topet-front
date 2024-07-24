import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "../css/homescreen.module.css";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";

const LoginPage = () => {

const goKaKaoLogin = () => {
    
    axios.get('http://175.45.202.131:8081/api/kakaoLogin')
        .then((response) => {
            window.location.href = response.data;
        }).catch((error) =>{
            console.log("서버 응답:", error);
            return error;
        });
};


return (
    <div>
        <h1>로그인페이지</h1>
        <div className={styles.tempWrap}>
            <img src="/img/kakao_login_large_narrow.png" onClick={goKaKaoLogin} />
            <IoIosLogOut size={20} />
        </div>
    </div>
);
};

export default LoginPage;
