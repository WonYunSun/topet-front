import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBarComp/NavBar";

const MapScreen = () => {
  const [position, setPosition] = useState(null);
  let screenH = window.innerHeight;
  let arr = ["동물병원", "반려동물동반", "산책"];

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
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=bdskcjy9wf";
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
    return (
      <div
        style={{
          position: "absolute",
          top: "50px",
          left: 150 * num + num + "px",
          zIndex: 10,
          backgroundColor: "white",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        }}
      >
        #{arr[num]}
      </div>
    );
  };

  const initMap = () => {
    if (!position) return;

    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(
        position.latitude,
        position.longitude
      ),
      zoom: 15,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(
        position.latitude,
        position.longitude
      ),
      map: map,
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: screenH }}>
      <button
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
          backgroundColor: "white",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        }}
      >
        뒤로가기
      </button>
      <input
        style={{
          position: "absolute",
          top: "10px",
          left: "100px",
          zIndex: 10,
          backgroundColor: "white",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        }}
      />

      <CustomButton num={0}></CustomButton>
      <CustomButton num={1}></CustomButton>
      <CustomButton num={2}></CustomButton>

      <div id="map" style={{ width: "100%", height: "100%", zIndex: 0 }}></div>
      <NavBar />
    </div>
  );
};

export default MapScreen;
