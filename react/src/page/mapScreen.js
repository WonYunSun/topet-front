import React, { useEffect, useState, useRef, useMemo } from "react";
import BottomSheet from "../component/BottomSheet";
import { debounce } from "lodash"; // 특정 작업의 호출 빈도 제한 라이브러리
import { FaSpinner } from "react-icons/fa";
import styles from "../css/mapScreen.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import useKakaoLoader from "../component/MapComp/UseKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { TbCurrentLocation } from "react-icons/tb";
import { FiRotateCw } from "react-icons/fi";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

const MapScreen = () => {
  const isLoaded = useKakaoLoader(); //카카오맵이 로드되었는지 확인하는 변수
  const mapRef = useRef(null); //useRef훅을 사용하여 mapRef를 생성.(맵 객체 저장에 사용)

  const arr = ["동물병원", "반려동물동반", "반려동물산책"];

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [places, setPlaces] = useState([]); // 검색된 장소 목록 저장
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 정보 저장
  const [selectedButton, setSelectedButton] = useState(null); // 선택된 버튼 인덱스 저장
  const [isVisible, setIsVisible] = useState(false); // 장소 정보(간략정보) 표시 여부
  const [map, setMap] = useState(null); // 맵 객체 저장
  const [searchWord, setSearchWord] = useState(""); // 검색어 저장
  const [markers, setMarkers] = useState([]); // 맵에 표시된 마커들 저장
  const [btnIsSelected, setBtnIsSelected] = useState(
    Array(arr.length).fill(false)
  ); // 버튼의 선택 상태 저장 (초기값: arr 전체 false)

  // 맵의 중심 좌표, 에러 메세지, 로딩 상태 저장 (맵 이동 시 유동적으로 변화함)
  // lat 위도/ lat 경도 임시값으로 초기화(geolocation으로 현재 위치 받아서 넣게 됨)
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  // 현재 좌표 저장(사용자 위치값이여야 함)
  const [position, setPosition] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  // 컴포넌트가 처음 렌더 될 때 실행. 현재 위치 받아와 state.center와 isLoading 상태 업데이트
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prevState) => ({
            ...prevState,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
          setPosition((prevPosition) => ({
            ...prevPosition,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (err) => {
          setState((prevState) => ({
            ...prevState,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prevState) => ({
        ...prevState,
        errMsg: "geolocation을 사용할 수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  // 현재 위치를 가져와서 position 상태를 업데이트
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((pos) => {
    //   setPosition({
    //     latitude: pos.coords.latitude,
    //     longitude: pos.coords.longitude,
    //   });
    // });
    navigator.geolocation.watchPosition((pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  // 맵 초기화 및 중심 좌표(state.center) 변경 시 검색 수행
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

      if (!mapRef.current) {
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;
        setMap(map);

        window.kakao.maps.event.addListener(map, "center_changed", () => {
          const center = map.getCenter();
          setState((prev) => ({
            ...prev,
            center: {
              lat: center.getLat(),
              lng: center.getLng(),
            },
          }));
          console.log("state 위치는 ", state);
        });

        console.log("지도 초기화 완료", map); // 지도 객체 출력
      }
    }
  }, [isLoaded, state.isLoading]);

  // 맵의 중심을 현재 위치로 설정하는 함수(내 위치로 맵 이동)
  const setCenterToMyPosition = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setCenter(
        new window.kakao.maps.LatLng(position.latitude, position.longitude)
      );
      map.setLevel(2);
    }
  };

  // 장소 검색 함수. debounce 사용해 300ms 동안 대기 후 실행
  const searchPlace = debounce((keyword, location) => {
    if (!isLoaded || !window.kakao || !map) return;

    const ps = new window.kakao.maps.services.Places();
    console.log("Searching for:", keyword);
    ps.keywordSearch(
      keyword,
      (data, status) => {
        console.log("Status:", status);
        if (status === window.kakao.maps.services.Status.OK) {
          console.log("Search results:", data);
          setPlaces(data);
          console.log("검색 후 플레이스에 저장된 것은", data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          console.log("No results found.");
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          console.log("An error occurred.");
        }
      },
      // 옵션값 설정, 현재 위치 기준 5000m 검색 결과 찾음. 정렬은 정확도 순
      {
        location,
        radius: 5000,
        sort: window.kakao.maps.services.SortBy.accuracy,
      }
    );
  }, 300);

  // 장소 목록 업데이트 및 마커 설정, palce나 map이 변경될 때 실행.(map이 변경되는 일이 뭐임?)
  useEffect(() => {
    if (!map) return; // map 객체가 초기화되지 않았으면 리턴

    const handlePlacesUpdate = () => {
      // if (places.length === 0) return; // places 배열이 비어있으면 리턴

      // 기존 마커 제거
      removeMarkers();

      // 새로운 마커 추가
      const newMarkers = places.map((place) => {
        const imageSrc =
          "https://cdn-icons-png.flaticon.com/128/2098/2098567.png";
        const imageSize = new window.kakao.maps.Size(35, 35);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });

        marker.setMap(map); // 마커를 맵에 뿌림
        console.log("마커가 지도에 설정됨", marker); // 마커 객체 출력 확인용 콘솔

        window.kakao.maps.event.addListener(marker, "click", () => {
          console.log("Marker clicked:", place);
          setSelectedPlace(place);
          setIsVisible(true);
        });

        return marker;
      });

      setMarkers(newMarkers); // 상태 업데이트 확인
    };

    handlePlacesUpdate();
  }, [places, map]);

  //현재 중심좌표 기준 재검색 함수
  const reSearch = () => {
    const center = mapRef.current.getCenter();
    if (selectedButton !== null) {
      searchPlace(arr[selectedButton], center); // 변경된 중심 좌표로 검색 수행
    }
  };

  // 장소 정보 외부 클릭 시 정보 창 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      const placeInfoElement = document.querySelector(`.${styles.placeInfo}`);
      if (placeInfoElement && placeInfoElement.contains(event.target)) return;
      if (
        event.target.tagName === "IMG" &&
        event.target.src ===
          "https://cdn-icons-png.flaticon.com/128/2098/2098567.png"
      )
        return;
      setIsVisible(false);
      setTimeout(() => {
        setSelectedPlace(null);
      }, 300);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 기존 마커 제거 함수
  const removeMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  // 사용자 정의 버튼 컴포넌트
  const CustomButton = ({ num }) => {
    const isSelected = btnIsSelected[num];

    const handleClick = () => {
      // 클릭 시 모든 버튼의 선택 상태를 초기화하고 현재 버튼을 선택
      const updatedBtnIsSelected = Array(arr.length).fill(false);
      updatedBtnIsSelected[num] = !isSelected;
      setBtnIsSelected(updatedBtnIsSelected);

      // 마커 제거 후 검색 수행
      removeMarkers();

      if (!isSelected) {
        setSelectedButton(num); // 선택된 버튼 인덱스 설정
        searchPlace(
          arr[num],
          new window.kakao.maps.LatLng(state.center.lat, state.center.lng)
        );
      } else {
        setSelectedButton(null); // 버튼 해제 시 null로 설정
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`${styles.button} ${
          isSelected ? styles.selectedButton : ""
        }`}
      >
        #{arr[num]}
      </div>
    );
  };

  // 맵 확대 함수
  const zoomIn = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() - 1);
  };

  // 맵 축소 함수
  const zoomOut = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() + 1);
  };

  // 로딩 중일 때 로딩 스피너 표시
  if (state.isLoading) {
    return (
      <div className={styles.loading}>
        <FaSpinner className={styles.spinner} />
      </div>
    );
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
        <MapMarker
          position={position} // 고정된 현재 위치
          image={{
            src: require("../asset/icon/mylocation.svg").default,
            size: {
              width: 25,
              height: 25,
            },
            options: {
              zIndex: 1,
            },
          }}
        />
      </Map>

      <div className={styles.setCenterBtnDiv}>
        <button className={styles.setCenterBtn} onClick={setCenterToMyPosition}>
          <TbCurrentLocation size={25} />
        </button>
      </div>

      <div className={`${styles.custom_zoomcontrol} ${styles.radius_border}`}>
        <span onClick={zoomIn} className={styles.pBtn}>
          <HiOutlinePlus size={30} />
        </span>
        <span onClick={zoomOut} className={styles.mBtn}>
          <HiOutlineMinus size={30} />
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
              onChange={(e) => {
                setSearchWord(e.target.value);
                console.log(e.target.value);
              }}
            />
            <IoSearch
              className={styles.searchbar_icon}
              onClick={() => searchPlace(searchWord)}
            />
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
          <>
            <button
              className={styles.listButton}
              onClick={() => {
                handleBottomSheetOpen("map");
                searchPlace(
                  arr[selectedButton],
                  new window.kakao.maps.LatLng(
                    state.center.lat,
                    state.center.lng
                  )
                );
              }}
            >
              <div className={styles.listinnerDiv}>
                <IoIosList />
                목록보기
              </div>
            </button>
            <button className={styles.reSearchBtn} onClick={reSearch}>
              <FiRotateCw color="#666" />현 지도에서 검색
            </button>
          </>
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
