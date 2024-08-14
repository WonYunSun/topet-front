import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/loginpage.module.css";
import { IoIosLogOut } from "react-icons/io";
import { ReactComponent as Logo } from "../asset/icon/TopetLogo_Login.svg";
import { ReactComponent as KakaoLoginBtn } from "../asset/icon/KakaoLoginBtn.svg";
import { ReactComponent as MainImg } from "../asset/icon/MainImg.svg";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { updateMember } from "../redux/reducers/memberReducer";

import memberApi from "../api/memberApi";

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  useEffect(()=>{
    const fetchData =async()=>{
      try{
        await getMember()
      }catch(error){
        
      }finally{
        setIsLoaded(true);
      }
    }
    fetchData();
  },[])
  
  const getMember = async() =>{
    const resp = await memberApi.getHomeDataMember();
    if(resp.status == 200 && resp.data != null){
      dispatch(updateMember(resp.data));
      navigate(`/home`);
    }
  }

  const goKaKaoLogin = async() => {
    const resp = await memberApi.kakaoLogin();
    window.location.href = resp;
    
    
  };

  if(!isLoaded){
    return(<div>Loading...</div>)
  }
  return (
    <>
      <Mobile>
        <div className={`${styles.wrapper} ${styles.mbver} `}>
          <div className={styles.logo_wrapper}>
            <div className={`${styles.subtitle} ${styles.mbver}`}>
              반려동물 라이프스타일 매니저
            </div>
            <div className={styles.logo}>
              <Logo fill={"#fff"} />
            </div>
          </div>
          {/* <IoIosLogOut className={styles.logout_icon} size={20} /> */}
          <MainImg className={`${styles.main_img} ${styles.mbver}`} />
          <div className={`${styles.kakao_button_wrapper} ${styles.mbver}`}>
            <KakaoLoginBtn
              className={`${styles.kakao_button} ${styles.mbver}`}
              onClick={goKaKaoLogin}
              alt="카카오 로그인"
            />
          </div>
          <div className={`${styles.privacy_notice_text} ${styles.mbver}`}>
            시작과 동시에 투펫의
            <span className={styles.privacy_notice_text_bold}>
              서비스 약관, 개인정보 취급방침
            </span>
            에 동의하게 됩니다.
          </div>
        </div>
      </Mobile>
      <DeskTop>
        <div className={`${styles.wrapper} ${styles.dtver} `}>
          <div className={styles.leftside_wrapper}>
            <MainImg className={`${styles.main_img} ${styles.dtver}`} />
          </div>
          <div className={styles.rightside_wrapper}>
            <div className={styles.rightside_container}>
              {/* <div className={styles.welcome_text}>환영합니다!</div> */}
              <div className={`${styles.logo_wrapper} ${styles.dtver}`}>
                <div className={styles.logo}>
                  <Logo fill={"#ffa62f"} />
                </div>
                <div className={`${styles.subtitle} ${styles.dtver}`}>
                  반려동물 라이프스타일 매니저
                </div>
              </div>
              <div className={styles.login_wrapper}>
                {/* <div className={styles.background_circle}></div> */}
                <div className={styles.usesns_text}>
                  sns계정으로 투펫을 이용해 보세요
                </div>
                <div className={styles.divider}></div>
                <div
                  className={`${styles.kakao_button_wrapper} ${styles.dtver}`}
                >
                  <KakaoLoginBtn
                    className={`${styles.kakao_button} ${styles.dtver}`}
                    onClick={goKaKaoLogin}
                    alt="카카오 로그인"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.privacy_notice_text}>
            시작과 동시에 투펫의{" "}
            <span className={styles.privacy_notice_text_bold}>
              {" "}
              서비스 약관, 개인정보 취급방침
            </span>
            에 동의하게 됩니다.
          </div>
        </div>
      </DeskTop>
    </>
  );
};

export default LoginPage;
