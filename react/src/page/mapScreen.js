import React, { useEffect, useState } from "react";
import BottomSheet from "../component/BottomSheet";
import axios from "axios";


const MapScreen = () => {
  let screenH = window.innerHeight;
  let arr = ["동물병원", "반려동물동반", "산책"];


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
    navigator.geolocation.getCurrentPosition((nowPosition) => {
      setPosition({
        latitude: nowPosition.coords.latitude,
        longitude: nowPosition.coords.longitude,
        accuracy: nowPosition.coords.accuracy,
      });
    });
  }, []);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=bdskcjy9wf';
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        initMap();
      } else {
        console.error("네이버 지도 API를 로드할 수 없습니다.");
      }
    };
    document.head.appendChild(script);
  }, [position]);

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


  const initMap = () => {
    if (!position) return;

    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(position.latitude, position.longitude),
      zoom: 15,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(position.latitude, position.longitude),
      map: map,
    });
  };

  return (
    
    <div style={{ position: 'relative', width: '100%', height: screenH }}>





      {/* 여기도 누가 스타일좀 뺴주셈  + height가 js로 받아온거라 얘도 잘 모르겠음*/}
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
      <div id="map" style={{ width: '100%', height: '100%', zIndex: 0 }}></div>
    </div>
  );
};

export default MapScreen;
