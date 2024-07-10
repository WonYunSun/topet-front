import React, { useEffect, useState } from "react";
import BottomSheet from "../component/BottomSheet";
import axios from "axios";


const MapScreen = () => {
  let screenH = window.innerHeight;
  let arr = ["동물병원", "반려동물동반", "산책"];
  const apiKey = "b09ec8730de391ab294f4a9848831c2c";

  const [position, setPosition] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null); // 현재 선택된 버튼의 인덱스를 저장합니다.
  const [selected, setSeleceted] = useState(null);
  
  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };


  useEffect(() => {

  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0a5f90aad179112a10005dc19a414e8a&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {

      navigator.geolocation.getCurrentPosition((nowPosition) => {
        setPosition({
          latitude: nowPosition.coords.latitude,
          longitude: nowPosition.coords.longitude,
          accuracy: nowPosition.coords.accuracy,
        });
      });

      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(position.latitude, position.longitude), // 초기 중심 좌표 (위도, 경도)
          level: 3, // 지도 확대 레벨
        };
        new window.kakao.maps.Map(container, options);
      });
    });
  }, []);

  const CustomButton = ({ num }) => {
    const isSelected = selectedButton === num; // 현재 버튼이 선택된 버튼인지 확인합니다.
    
    return (
      <div
        onClick={() => {setSelectedButton(isSelected ? null : num); setSeleceted(isSelected);}}  // 동일한 버튼 클릭 시 선택 해제합니다.
        style={{
          position: 'absolute',
          top: '50px',
          left: (150 * num) + num + 'px',
          zIndex: 10,
          backgroundColor: isSelected ? 'orange' : 'white',  // 선택된 버튼만 색깔을 바꿉니다.
          padding: '5px',
          borderRadius: '5px',
          boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
          cursor: 'pointer'  // 버튼처럼 보이게 커서를 포인터로 변경합니다.
        }} // 이거 누가 스타일좀 빼줘 + 근데 저거 left가 num 받아오는거라, 인라인으로 해야할지도.
      >
        #{arr[num]}
      </div>
    );
  };


  const getQueryMap = async () => {
    try {
      const response = await axios.get("/api/getMapInfo");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  // const initMap = () => {
  //   if (!position) return;

  //   var container = document.getElementById('map');
	// 	var options = {
	// 		center: new kakao.maps.LatLng(33.450701, 126.570667),
	// 		level: 3
	// 	};

	// 	var map = new kakao.maps.Map(container, options);
  // };
// style={{ position: 'relative', width: '100%', height: screenH }}
  return (
    
    <div>
        <div id="map" style={{ width: '100%', height: screenH, zIndex: 0 }}></div>
        {/* 여기도 누가 스타일좀 뺴주셈  + height가 js로 받아온거라 얘도 잘 모르겠음*/}
        <div>
          <button 
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 10,
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '5px',
              boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
            }}
          >
            뒤로가기
          </button>
          <input style={{
              position: 'absolute',
              top: '10px',
              left: '100px',
              zIndex: 10,
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '5px',
              boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
            }}/>
      {/* 여기도 누가 스타일좀 뺴주셈 */}

      

          {arr.map((item, index) => (
          <CustomButton key={index} num={index} />
          ))}
      </div>
      <div>
      {selected? '' :  <button style={{
          position: 'absolute',
          bottom: '10px',
          zIndex: 10,
          backgroundColor: 'white',
          padding: '5px',
          borderRadius: '5px',
          boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
          
        }}
        onClick={()=>{handleBottomSheetOpen("map"); getQueryMap("")}}>목록보기</button> }

        <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
      />
      </div>
    </div>
  );
};

export default MapScreen;
