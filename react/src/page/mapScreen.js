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
  const [selectedButton, setSelectedButton] = useState(null);
  
  const [map, setMap] = useState();
  const [infowindow, setInfoWindow] = useState();

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
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0a5f90aad179112a10005dc19a414e8a&autoload=false&libraries=services`;//,clusterer,drawing
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37, 122),
          level: 3,
        };
        setMap(new window.kakao.maps.Map(container, options));
        setInfoWindow(new window.kakao.maps.InfoWindow({zIndex:2}));
      });
    });
  }, []);

  const CustomButton = ({ num }) => {
    const isSelected = selectedButton === num;
    
    return (
      <div
        onClick={() => setSelectedButton(isSelected ? null : num)}
        style={{
          ...styles.button,
          left: (150 * num) + num + 'px',
          backgroundColor: isSelected ? 'orange' : 'white',
        }}
      >
        #{arr[num]}
      </div>
    );
  };
  /*
  const getQueryMap = async () => {
    try {
      const response = await axios.get("/api/getMapInfo");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
*/
  function searchPlace(){
    var ps = new window.kakao.maps.services.Places(); 
    ps.keywordSearch('이태원 맛집', placesSearchCB); 
  }
  function placesSearchCB (data, status, pagination) {
    if (status === window.kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new window.kakao.maps.LatLngBounds();
        console.log(bounds);
        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }       
        map.setBounds(bounds);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    } 
  }
  function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}
  



  return (
    <div>
      <div id="map" style={styles.map}></div>
      <div>
        <button style={styles.backButton}>뒤로가기</button>
        <input style={styles.input}/>
        {arr.map((item, index) => (
          <CustomButton key={index} num={index} />
        ))}
      </div>
      <div>
        {selectedButton !== null && (
          <button
            style={styles.listButton}
            onClick={() => { 
              handleBottomSheetOpen("map"); 
              //getQueryMap(); 
              searchPlace();
            }}
          >
            목록보기
          </button>
        )}
        <BottomSheet
          show={showBottomSheet}
          onClose={handleBottomSheetClose}
          type={bottomSheetType}
        />
      </div>
    </div>
  );
};

const styles = {
  map: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
  },
  input: {
    position: 'absolute',
    top: '10px',
    left: '100px',
    zIndex: 10,
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
  },
  button: {
    position: 'absolute',
    top: '50px',
    zIndex: 10,
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
    cursor: 'pointer',
  },
  listButton: {
    position: 'absolute',
    bottom: '10px',
    zIndex: 10,
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
  },
};

export default MapScreen;
