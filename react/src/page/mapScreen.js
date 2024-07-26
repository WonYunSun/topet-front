import React, { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../component/BottomSheet";
// import { debounce } from "lodash"; // 특정 작업의 호출 빈도 제한 라이브러리
import { FaSpinner } from "react-icons/fa";
import styles from "../css/mapScreen.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { IoSearch, IoClose } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import useKakaoLoader from "../component/MapComp/UseKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { TbCurrentLocation } from "react-icons/tb";
import { FiRotateCw } from "react-icons/fi";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import CheckModal from "../component/CheckModal";
const MapScreen = () => {
  const isLoaded = useKakaoLoader(); // 카카오맵이 로드되었는지 확인하는 변수

  const KEYWORD_LIST = [
    { id: 1, value: "동물병원" },
    { id: 2, value: "반려동물동반" },
    { id: 3, value: "애견호텔" },
  ];
  // const [isPending, startTransition] = useTransition();
  const [selectedMarker, setSelectedMarker] = useState(null); // 선택된 마커만 남길 수 있도록
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  // 지도 이동 시 바뀔 좌표
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState([]); // 검색 결과를 담는 상태 변수
  const [showClearButton, setShowClearButton] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 정보 저장
  const [isVisible, setIsVisible] = useState(false); // 장소 정보(간략정보) 표시 여부
  const [openMarkerId, setOpenMarkerId] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null); // 선택된 버튼 인덱스 저장
  const [btnIsSelected, setBtnIsSelected] = useState(
    Array(KEYWORD_LIST.length).fill(false)
  ); // 버튼의 선택 상태 저장 (초기값: arr 전체 false)
  const [isSearched, setIsSearched] = useState(false); // 선택된 버튼 인덱스 저장
  const [showModal, setShowModal] = useState(false);
  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };
  // 모달 관련
  const handleShowModalOpen = () => {
    setShowModal(true);
  };
  const handleShowModalClose = () => {
    setShowModal(false);
  };

  // 현재 사용자 위치 받아오기 (geolocation)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
          setPosition((prev) => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));
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
    if (!map || !isLoaded) return;

    const updatePosition = () => {
      const center = map.getCenter();
      setPosition({
        lat: center.getLat(),
        lng: center.getLng(),
      });
    };

    window.kakao.maps.event.addListener(map, "center_changed", updatePosition);

    // Cleanup event listener on unmount
    return () => {
      window.kakao.maps.event.removeListener(
        map,
        "center_changed",
        updatePosition
      );
    };
  }, [map, isLoaded]);

  const searchPlaces = (keyword, location) => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 로드 실패");
      return;
    }
    if (keyword.length > 0) {
      setIsSearched(true);
      //선택된 마커 초기화
      setSelectedMarker(null);
      const ps = new window.kakao.maps.services.Places();
      const options = {
        location:
          location ||
          new window.kakao.maps.LatLng(state.center.lat, state.center.lng),
        radius: 5000,
        sort: window.kakao.maps.services.SortBy.ACCURACY,
        level: 2,
      };

      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            setSearch([]);
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            console.error("검색에 실패하였습니다.");
          }
        },
        options
      );
    } else {
      handleShowModalOpen();
    }
  };

  const displayPlaces = (data) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    data.forEach((item) =>
      bounds.extend(new window.kakao.maps.LatLng(item.y, item.x))
    );
    bounds.extend(
      new window.kakao.maps.LatLng(state.center.lat, state.center.lng)
    );
    map.setBounds(bounds);
    setSearch(data);
  };

  const reSearch = () => {
    const searchKeyword =
      selectedButton !== null ? KEYWORD_LIST[selectedButton].value : keyword;

    searchPlaces(
      searchKeyword,
      new window.kakao.maps.LatLng(position.lat, position.lng)
    );

    // setSelectedButton(null); // 검색 후 선택된 버튼 초기화
  };

  const moveLatLng = (data) => {
    const newLatLng = new window.kakao.maps.LatLng(data.y, data.x);
    map.panTo(newLatLng);
  };

  // 사용자 정의 버튼 컴포넌트
  const CustomButton = ({ num }) => {
    const isSelected = btnIsSelected[num];

    const handleClick = () => {
      const keyword = KEYWORD_LIST[num].value;

      // 검색 창을 비움
      document.getElementById("searchBox").value = "";

      // 클릭 시 모든 버튼의 선택 상태를 초기화하고 현재 버튼을 선택
      const updatedBtnIsSelected = Array(KEYWORD_LIST.length).fill(false);
      updatedBtnIsSelected[num] = !isSelected;
      setBtnIsSelected(updatedBtnIsSelected);

      // 선택된 버튼이 이미 선택된 경우 마커 제거
      if (isSelected) {
        setSearch([]); // 마커 제거
        setSelectedButton(null); // 버튼 해제 시 null로 설정
        setIsSearched(false);
      } else {
        // 마커 제거 후 검색 수행
        setSearch([]); // 기존 마커 제거
        setSelectedButton(num); // 선택된 버튼 인덱스 설정
        setKeyword(keyword); // keyword 상태 설정
        searchPlaces(
          keyword,
          new window.kakao.maps.LatLng(position.lat, position.lng)
        ); // 검색 수행
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`${styles.button} ${
          isSelected ? styles.selectedButton : ""
        }`}
      >
        #{KEYWORD_LIST[num].value}
      </div>
    );
  };

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

  const setCenterToMyPosition = () => {
    if (!map) return;
    map.panTo(new window.kakao.maps.LatLng(state.center.lat, state.center.lng));
  };

  const zoomIn = () => {
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    map.setLevel(map.getLevel() + 1);
  };
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home"); // 홈으로 이동
  };
  const getLastCategoryName = (categoryName) => {
    const parts = categoryName.split(" > ");
    return parts[parts.length - 1];
  };
  if (state.isLoading) {
    return (
      <div className={styles.loading}>
        <FaSpinner className={styles.spinner} />
      </div>
    );
  }

  return (
    <>
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "calc(100vh - 40px)",
        }}
        level={3}
        onCreate={setMap}
        draggable="true"
      >
        {/* 내 위치 */}
        <MapMarker
          position={state.center}
          image={{
            src: require("../asset/icon/mylocation.svg").default,
            size: {
              width: 25,
              height: 25,
            },
          }}
        />
        {/* 검색 결과 마커 */}

        {search
          .filter((data) => !selectedMarker || data.id === selectedMarker.id) // 선택된 마커만 표시
          .map((data) => (
            <React.Fragment key={data.id}>
              <MapMarker
                key={data.id}
                position={{ lat: data.y, lng: data.x }}
                image={{
                  src: "https://cdn-icons-png.flaticon.com/128/2098/2098567.png",
                  size: {
                    width: 35,
                    height: 35,
                  },
                }}
                onClick={() => {
                  if (data.id === openMarkerId) {
                    setOpenMarkerId(null);
                  } else {
                    setSelectedPlace(data);
                    setOpenMarkerId(data.id);
                    moveLatLng(data);
                    setIsVisible(true);
                  }
                }}
              />
            </React.Fragment>
          ))}
        <div className={styles.setCenterBtnDiv}>
          <button
            className={styles.setCenterBtn}
            onClick={setCenterToMyPosition}
          >
            <TbCurrentLocation size={20} />
          </button>
        </div>

        <div className={`${styles.custom_zoomcontrol} ${styles.radius_border}`}>
          <span onClick={zoomIn} className={styles.pBtn}>
            <HiOutlinePlus size={25} />
          </span>
          <span onClick={zoomOut} className={styles.mBtn}>
            <HiOutlineMinus size={25} />
          </span>
        </div>

        <div className={styles.mapTopWrap}>
          <div className={styles.topBtnWrap}>
            <button className={styles.backButton} onClick={goHome}>
              <FiArrowLeft size={24} color="#666" />
            </button>
            <div className={styles.inputWrap}>
              <input
                id="searchBox"
                className={styles.Mapinput}
                placeholder="장소를 검색해보세요"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              {!showClearButton && (
                <IoSearch
                  className={styles.searchbar_icon}
                  onClick={() => {
                    setBtnIsSelected(Array(KEYWORD_LIST.length).fill(false)); // 모든 버튼 선택 해제
                    searchPlaces(keyword);
                    setShowClearButton(true); // x 버튼 표시
                  }}
                />
              )}

              {showClearButton && (
                <IoClose
                  className={styles.searchbar_icon}
                  onClick={() => {
                    setKeyword(""); // input 값 초기화
                    setSearch([]); // 검색 결과 초기화
                    setShowClearButton(false); // x 버튼 숨기기
                    setIsSearched(false); // 검색 상태 초기화
                    document.getElementById("searchBox").value = ""; // input 박스의 값 초기화
                  }}
                />
              )}
            </div>
          </div>
          {!showClearButton && (
            <div className={styles.CutsomBtnWrap}>
              {KEYWORD_LIST.map((item, index) => (
                <CustomButton key={index} num={index} />
              ))}
            </div>
          )}
        </div>
        <div className={styles.mapListWrap}>
          {/* 검색했을때 렌더되어야 함 */}
          {isSearched && (
            <>
              <button
                className={styles.listButton}
                onClick={() => {
                  handleBottomSheetOpen("map");
                }}
              >
                <div className={styles.listinnerDiv}>
                  <IoIosList />
                  목록보기
                </div>
              </button>
              <button className={styles.reSearchBtn} onClick={reSearch}>
                <FiRotateCw size={17} color="#666" />
              </button>
            </>
          )}
          <BottomSheet
            show={showBottomSheet}
            onClose={handleBottomSheetClose}
            type={bottomSheetType}
            searchResult={search}
            moveLatLng={moveLatLng}
            setSelectedMarker={setSelectedMarker}
            setSelectedPlace={setSelectedPlace}
            keyword={keyword}
          />
        </div>
        {selectedPlace && (
          <div
            className={`${styles.placeInfo} ${isVisible ? styles.show : ""}`}
          >
            <div className={styles.placeInfoContent}>
              <div className={styles.nameWrap}>
                <div>{selectedPlace.place_name}</div>
                <div>{getLastCategoryName(selectedPlace.category_name)}</div>
              </div>
              <div className={styles.addDiv}>{selectedPlace.address_name}</div>
              <div className={styles.phoneDiv}>{selectedPlace.phone}</div>
              <div
                className={styles.detailPageDiv}
                onClick={() => (window.location.href = selectedPlace.place_url)}
              >
                상세페이지 이동
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <CheckModal
            onClose={handleShowModalClose}
            Content={"검색어를 입력해주세요"}
            oneBtn={true}
          />
        )}
      </Map>
    </>
  );
};

export default MapScreen;
