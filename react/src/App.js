import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Community from "./page/Community";
import CommunityWrite from "./page/CommunityWrite";
import { Calendarscreen } from "./page/Calendarscreen";
import PetRegistration from "./page/PetRegistration";
import KakaoLogin from "./page/KakaoLogin";
import MapScreen from "./page/MapScreen";
import CommunityDetail from "./page/CommunityDetail";
import MyPage from "./page/MyPage";
import ChoicePetRegister from "./page/ChoicePetRegister";
//navbar.js
import NavBar from "./component/NavBarComp/NavBar";
//네비게이션바 띄울 화면 import 필요
import Home from "./page/Home";
import LoginPage from "./page/LoginPage";
// import Schedule from "./page/Calendarscreen";
// import Map from "./page/MapScreen";

function App() {
  const location = useLocation();
  const showNavbarPaths = [
    "/api/home",
    "/api/schedule",
    "/api/map",
    "/api/mypage",
  ];
  return (
    <div className="App">
      {showNavbarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/api/home" element={<Home />} />
        <Route path="/api/map" element={<MapScreen />} />
        <Route
          path="/community/preview/:animalType/:category"
          element={<Community />}
        />
        <Route
          path="/api/community/detail/:comid"
          element={<CommunityDetail />}
        />
        <Route
          path="/api/community/communitywrite"
          element={<CommunityWrite />}
        />
        <Route path="/api/schedule" element={<Calendarscreen />} />
        <Route path="/api/petregistration" element={<PetRegistration />} />
        <Route path="/api/mypage" element={<MyPage />} />
        <Route path="/api/choicepetregister" element={<ChoicePetRegister />} />
        <Route path="/api" element={<LoginPage/>}/>
        {/* <Route path='/api/kakaoLogin' element={<KakaoLogin/>} /> */}
        <Route path="https://kauth.kakao.com/oauth/authorize?client_id=${3494afad7131fc9645ae9b08ed0dfda6}&redirect_uri=${localhost:8081/api/kakaoLogin}&response_type=code"></Route>
      </Routes>
    </div>
  );
}

export default App;
