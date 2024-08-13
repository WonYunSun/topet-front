import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Community from "./page/Community";
import CommunityWrite from "./page/CommunityWrite";
import Calendarscreen from "./page/Calendarscreen";
import PetRegistration from "./page/PetRegistration";

import MapScreen from "./page/MapScreen";
import CommunityDetail from "./page/CommunityDetail";
import MyPage from "./page/MyPage/MyPage";
import EditProfile from "./page/MyPage/EditProfile";
import ManageMyPets from "./page/MyPage/ManageMyPets";
import PetProfileDetail from "./page/MyPage/PetProfileDetail";
import EditPetProfile from "./page/MyPage/EditPetProfile";
import SeeMyPosts from "./page/MyPage/SeeMyPosts";
import SeeMyComments from "./page/MyPage/SeeMyComments";
import SeeLikedPosts from "./page/MyPage/SeeLikedPosts";
import SeeMyShorts from "./page/MyPage/SeeMyShorts";
import SeeLikedShorts from "./page/MyPage/SeeLikedShorts";
import ProfileCompleted from "./page/ProfileCompleted";
import AddShorts from "./page/AddShorts";

//navbar.js
import NavBar from "./component/NavBarComp/NavBar";
//네비게이션바 띄울 화면 import 필요
import Home from "./page/Home";
import CommunitySearch from "./page/CommunitySearch";
import LoginPage from "./page/LoginPage";
import Shorts from "./page/Shorts";
import UserRegister from "./page/UserRegister";
// 반응형
import { Mobile, DeskTop } from "./responsive/responsive";
import { useMediaQuery } from "react-responsive";
import ShortsDetail from "./page/ShortsDetail";
//TopBarWeb
import TopBarWeb from "./component/TopBarWeb";
import ShortsBox from "./page/ShortsBox";

function App() {
  const location = useLocation();
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const showNavbarPaths = ["/home", "/schedule", "/map", "/mypage"];
  const showNavbarWebPaths = [
    "/",
    "/home",
    "/schedule",
    "/mypage",
    "/shorts",
    "/petregistration",
    "/userregister",
  ];

  return (
    <div className="App">
      {(showNavbarWebPaths.includes(location.pathname) ||
        location.pathname.includes("/community")) &&
        isDeskTop && <TopBarWeb />}
      {showNavbarPaths.includes(location.pathname) && isMobile && <NavBar />}
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/map" element={<MapScreen />} />

        <Route
          path="/community/preview/:animalType/:category"
          element={<Community />}
        />
        <Route path="/community/search" element={<CommunitySearch />} />
        <Route path="/community/detail/:comid" element={<CommunityDetail />} />
        <Route path="/community/communitywrite" element={<CommunityWrite />} />

        <Route path="/schedule" element={<Calendarscreen />} />

        <Route path="/petregistration" element={<PetRegistration />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/profilecompleted" element={<ProfileCompleted />} />

        <Route path="/mypage" element={<MyPage />} />

        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editpetprofile/:id" element={<EditPetProfile />} />

        <Route path="/petprofiledetail/:id" element={<PetProfileDetail />} />
        <Route path="/managemypets" element={<ManageMyPets />} />

        <Route path="/myposts" element={<SeeMyPosts />} />
        <Route path="/mycomments" element={<SeeMyComments />} />
        <Route path="/myshorts" element={<SeeMyShorts />} />

        <Route path="/likedposts" element={<SeeLikedPosts />} />
        <Route path="/likedshorts" element={<SeeLikedShorts />} />

        <Route path="/shorts" element={<Shorts />} />
        <Route path="/addshorts" element={<AddShorts />} />
        <Route path="/shortsDetail/:id" element={<ShortsBox />} />

        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
