import React, { useEffect, useState, useRef } from "react";
import BottomSheet from "../component/BottomSheet";
import styles from "../css/mapScreen.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import useKakaoLoader from "../component/MapComp/UseKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapScreen = () => {
  const isLoaded = useKakaoLoader();
  const mapRef = useRef(null);

  const arr = ["동물병원", "반려동물동반", "반려동물산책"];

  const [position, setPosition] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [thisNum, setThisNum] = useState();
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 정보를 저장할 상태
  const [isVisible, setIsVisible] = useState(false); // 트랜지션을 위한 상태
  const [places, setPlaces] = useState([]); // 검색된 장소들을 저장할 상태
  const [map, setMap] = useState(null); // Kakao 지도 객체를 저장할 상태

  // 기본 위치 상태
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  // 현재 사용자 위치 받아오기 (geolocation)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            errMsg: null,
            isLoading: false,
          });
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할 수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (isLoaded && !state.isLoading) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          state.center.lat,
          state.center.lng
        ),
        level: 4,
      };
      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map; // mapRef에 지도 객체 저장
      setMap(map);
    }
  }, [isLoaded, state.isLoading, state.center]);

  const searchPlace = (num) => {
    if (!isLoaded || !window.kakao || !map) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(arr[num], (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        displayMarkers(data);
      }
    });
  };

  const displayMarkers = (places) => {
    if (!map) return;

    const markers = places.map((place) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        setSelectedPlace(place);
        setIsVisible(true);
      });

      return marker;
    });

    markers.forEach((marker) => marker.setMap(map));
  };

  const CustomButton = ({ num }) => {
    const isSelected = selectedButton === num;
    useEffect(() => {
      if (isSelected) {
        setThisNum(num);
        searchPlace(num);
      }
    }, [isSelected, num]);

    return (
      <div
        onClick={() => {
          setSelectedButton(isSelected ? null : num);
          searchPlace(num);
        }}
        className={`${styles.button} ${
          isSelected ? styles.selectedButton : ""
        }`}
      >
        #{arr[num]}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(`.${styles.placeInfo}`) !== null) return;
      setIsVisible(false); // 트랜지션 효과를 주기 위해 isVisible을 false로 설정
      setTimeout(() => {
        setSelectedPlace(null); // 트랜지션이 끝난 후에 selectedPlace를 null로 설정
      }, 300); // 트랜지션 시간 (300ms)과 동일하게 설정
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const zoomIn = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() + 1);
  };

  if (state.isLoading) {
    return <div>Loading map...</div>;
  }

  return (
    <div className={styles.MapscreenWrap}>
      <Map
        id="map"
        center={{
          lat: state.center.lat,
          lng: state.center.lng,
        }}
        style={{
          width: "100%",
          height: "calc(100vh - 40px)",
        }}
        level={3}
        ref={mapRef}
      >
        {/* 현재 위치 마커 표시 */}
        <MapMarker
          position={state.center}
          image={{
            src: "https://cdn-icons-png.flaticon.com/128/7124/7124723.png",
            size: {
              width: 50,
              height: 50,
            },
            options: {
              zIndex: 9999, // z-index 설정
            },
          }}
        />
        {places.map((place) => (
          <MapMarker
            key={place.id}
            position={{
              lat: place.y,
              lng: place.x,
            }}
            onClick={() => {
              setSelectedPlace(place);
              setIsVisible(true);
              console.log("Marker clicked: ", place);
            }}
          />
        ))}
      </Map>

      <div className={`${styles.custom_zoomcontrol} ${styles.radius_border}`}>
        <span onClick={zoomIn}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
          />
        </span>
        <span onClick={zoomOut}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
          />
        </span>
      </div>

      <div className={styles.mapTopWrap}>
        <div className={styles.topBtnWrap}>
          <button className={styles.backButton}>
            <FiArrowLeft size={24} color="#666" />
          </button>
          <div className={styles.inputWrap}>
            <input
              className={styles.Mapinput}
              placeholder="장소를 검색해보세요"
            />
            <IoSearch className={styles.searchbar_icon} />
          </div>
        </div>
        <div className={styles.CutsomBtnWrap}>
          {arr.map((item, index) => (
            <CustomButton key={index} num={index} />
          ))}
        </div>
      </div>
      <div className={styles.mapListWrap}>
        {selectedButton !== null && (
          <button
            className={styles.listButton}
            onClick={() => {
              handleBottomSheetOpen("map");
              searchPlace(selectedButton);
            }}
          >
            <div className={styles.listinnerDiv}>
              <IoIosList />
              목록보기
            </div>
          </button>
        )}
        <BottomSheet
          show={showBottomSheet}
          onClose={handleBottomSheetClose}
          type={bottomSheetType}
        />
      </div>
      {selectedPlace && (
        <div className={`${styles.placeInfo} ${isVisible ? styles.show : ""}`}>
          <div className={styles.placeInfoContent}>
            <h3>{selectedPlace.place_name}</h3>
            <p>{selectedPlace.address_name}</p>
            <p>{selectedPlace.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
