import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Community from "./page/community";
import CommunityWrite from "./page/communityWrite";
import { Calendarscreen } from "./page/calendar_screen";
import PetRegistration from "./page/PetRegistration";
import KakaoLogin from "./page/kakaoLogin";
import MapScreen from "./page/mapScreen";
import CommunityDetail from "./page/CommunityDetail";
import MyPage from "./page/myPage";
import ChoicePetRegister from "./page/ChoicePetRegister"


function App() {

  return ( 
    <div className="App">
      <Routes>
        <Route path="/api" element={<Home />} />
        <Route path="/api/map" element={<MapScreen />} />
        <Route path="/community/preview/:animalType/:category" element={<Community />} />
        <Route path="/api/community/detail/:comid" element={<CommunityDetail />} />
        <Route path="/api/community/communitywrite" element={<CommunityWrite />}/>
        <Route path="/api/schedule" element={<Calendarscreen />} />
        <Route path="/api/petregistration" element={<PetRegistration />} />
        <Route path="/api/mypage" element={<MyPage />} />
        <Route path="/api/choicepetregister" element={<ChoicePetRegister />} />
        {/* <Route path='/api/kakaoLogin' element={<KakaoLogin/>} /> */}
        <Route path="https://kauth.kakao.com/oauth/authorize?client_id=${3494afad7131fc9645ae9b08ed0dfda6}&redirect_uri=${localhost:8081/api/kakaoLogin}&response_type=code"></Route>
      </Routes>
    </div>
  );
}

export default App;
