import React, { useEffect, useState, useRef } from "react";
import BottomSheet from "../component/BottomSheet";
import { debounce } from "lodash";
import { FaSpinner } from "react-icons/fa";
import styles from "../css/mapScreen.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import useKakaoLoader from "../component/MapComp/UseKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { TbCurrentLocation } from "react-icons/tb";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

const MapScreen = () => {
  const isLoaded = useKakaoLoader();
  const mapRef = useRef(null);

  const arr = ["동물병원", "반려동물동반", "반려동물산책"];

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [markers, setMarkers] = useState([]); // 마커 상태 추가

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

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
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });

    navigator.geolocation.watchPosition((pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  const setCenterToMyPosition = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setCenter(
        new window.kakao.maps.LatLng(position.latitude, position.longitude)
      );
      map.setLevel(1);
    }
  };

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
      {
        location,
        radius: 5000,
        sort: window.kakao.maps.services.SortBy.accuracy,
      }
    );
  }, 300);

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
          if (selectedButton !== null) {
            searchPlace(arr[selectedButton], center); // 변경된 중심 좌표로 검색 수행
          }
        });
      }
    }
  }, [isLoaded, state.isLoading]);

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

  const removeMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  useEffect(() => {
    if (map && places.length > 0) {
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

        window.kakao.maps.event.addListener(marker, "click", () => {
          console.log("Marker clicked:", place);
          setSelectedPlace(place);
          setIsVisible(true);
          console.log("isVisible set to true");
        });

        marker.setMap(map);
        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [places, map]);

  useEffect(() => {
    console.log("useEffect triggered:", selectedPlace);
    if (selectedPlace) {
      console.log("Selected place:", selectedPlace);
      console.log(isVisible);
    }
  }, [selectedPlace]);

  useEffect(() => {
    console.log("isVisible state changed:", isVisible);
  }, [isVisible]);

  const CustomButton = ({ num }) => {
    const isSelected = selectedButton === num;

    const handleClick = () => {
      const newSelectedButton = isSelected ? null : num;
      setSelectedButton(newSelectedButton);
      if (!isSelected) {
        removeMarkers();
      }
      if (newSelectedButton !== null) {
        searchPlace(
          arr[newSelectedButton],
          new window.kakao.maps.LatLng(state.center.lat, state.center.lng)
        );
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
          position={state.center}
          image={{
            src: require("../asset/icon/mylocation.svg").default,
            size: {
              width: 25,
              height: 25,
            },
            options: {
              zIndex: 9999,
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
          <button
            className={styles.listButton}
            onClick={() => {
              handleBottomSheetOpen("map");
              searchPlace(
                arr[selectedButton],
                new window.kakao.maps.LatLng(state.center.lat, state.center.lng)
              );
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
