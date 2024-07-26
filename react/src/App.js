import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Community from "./page/Community";
import CommunityWrite from "./page/CommunityWrite";
import  Calendarscreen  from "./page/Calendarscreen";
import PetRegistration from "./page/PetRegistration";

import MapScreen from "./page/MapScreen";
import CommunityDetail from "./page/CommunityDetail";
import MyPage from "./page/MyPage/MyPage";
import EditProfile from "./page/MyPage/EditProfile";
import ManageMyPets from "./page/MyPage/ManageMyPets";
import PetProfileDetail from "./page/MyPage/PetProfileDetail";
import SeeMyPosts from "./page/MyPage/SeeMyPosts";
import SeeMyComments from "./page/MyPage/SeeMyComments";
import SeeLikedPosts from "./page/MyPage/SeeLikedPosts";
import SeeMyShorts from "./page/MyPage/SeeMyShorts";
import SeeLikedShorts from "./page/MyPage/SeeLikedShorts";
import ChoicePetRegister from "./page/ChoicePetRegister";
//navbar.js
import NavBar from "./component/NavBarComp/NavBar";
//네비게이션바 띄울 화면 import 필요
import Home from "./page/Home";
import CommunitySearch from "./page/CommunitySearch";
import LoginPage from "./page/LoginPage";
// import Schedule from "./page/Calendarscreen";
// import Map from "./page/MapScreen";

function App() {
  const location = useLocation();
  const showNavbarPaths = [
    "/home",
    "/schedule",
    "/map",
    "/mypage",
  ];
  return (
    <div className="App">
      {showNavbarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<MapScreen />} />
        <Route
          path="/community/preview/:animalType/:category"
          element={<Community />}
        />
        <Route path="/community/search" element={<CommunitySearch />}/>
        <Route
          path="/community/detail/:comid"
          element={<CommunityDetail />}
        />
        <Route
          path="/community/communitywrite"
          element={<CommunityWrite />}
        />
        <Route path="/schedule" element={<Calendarscreen />} />
        <Route path="/petregistration" element={<PetRegistration />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/managemypets" element={<ManageMyPets />} />
        <Route path="/petprofiledetail" element={<PetProfileDetail />} />
        <Route path="/myposts" element={<SeeMyPosts />} />
        <Route path="/mycomments" element={<SeeMyComments />} />
        <Route path="/likedposts" element={<SeeLikedPosts />} />
        <Route path="/myshorts" element={<SeeMyShorts />} />
        <Route path="/likedshorts" element={<SeeLikedShorts />} />
        <Route path="/choicepetregister" element={<ChoicePetRegister />} />
        {/* <Route path='/api/kakaoLogin' element={<KakaoLogin/>} /> */}
        <Route path="/" element={<LoginPage/>}/>
        <Route path="https://kauth.kakao.com/oauth/authorize?client_id=${3494afad7131fc9645ae9b08ed0dfda6}&redirect_uri=${localhost:8081/api/kakaoLogin}&response_type=code"></Route>
      </Routes>
    </div>
  );
}

export default App;
