// import React, { useEffect, useState } from "react";
// import BottomSheet from "../component/BottomSheet";
// import styles from "../css/mapScreen.module.css";
// import axios from "axios";

// const MapScreen = () => {
//   let screenH = window.innerHeight;
//   let arr = ["동물병원", "반려동물동반", "반려동물산책"];
//   const apiKey = "b09ec8730de391ab294f4a9848831c2c";

//   const [position, setPosition] = useState({ latitude: null, longitude: null });

//   const [showBottomSheet, setShowBottomSheet] = useState(false);
//   const [bottomSheetType, setBottomSheetType] = useState(null);
//   const [selectedButton, setSelectedButton] = useState(null);
//   const [thisNum, setThisNum] = useState();

//   const [map, setMap] = useState();
//   const [infowindow, setInfoWindow] = useState();

//   const handleBottomSheetOpen = (type) => {
//     setBottomSheetType(type);
//     setShowBottomSheet(true);
//   };

//   const handleBottomSheetClose = () => {
//     setShowBottomSheet(false);
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position1) => {
//       setPosition({
//         latitude: position1.coords.latitude,
//         longitude: position1.coords.longitude,
//       });
//     });
//   }, []);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.async = true;
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0a5f90aad179112a10005dc19a414e8a&autoload=false&libraries=services`; //,clusterer,drawing
//     document.head.appendChild(script);
//     script.addEventListener("load", () => {
//       window.kakao.maps.load(() => {
//         const container = document.getElementById("map");
//         navigator.geolocation.getCurrentPosition((position1) => {
//           setPosition({
//             latitude: position1.coords.latitude,
//             longitude: position1.coords.longitude,
//           });
//         });
//         const options = {
//           center: new window.kakao.maps.LatLng(
//             position.latitude,
//             position.longitude
//           ),
//           level: 4,
//         };
//         setMap(new window.kakao.maps.Map(container, options));
//         setInfoWindow(new window.kakao.maps.InfoWindow({ zIndex: 2 }));
//       });
//     });
//   }, []);

//   function searchPlace(num) {
//     var ps = new window.kakao.maps.services.Places();
//     ps.keywordSearch(arr[num], placesSearchCB);
//   }
//   function placesSearchCB(data, status, pagination) {
//     if (status === window.kakao.maps.services.Status.OK) {
//       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//       // LatLngBounds 객체에 좌표를 추가합니다

//       var bounds = new window.kakao.maps.LatLngBounds();
//       console.log(bounds);
//       for (var i = 0; i < data.length; i++) {
//         displayMarker(data[i]);
//         bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
//       }
//       map.setBounds(bounds);
//       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     }
//   }
//   function displayMarker(place) {
//     // 마커를 생성하고 지도에 표시합니다
//     var marker = new window.kakao.maps.Marker({
//       map: map,
//       position: new window.kakao.maps.LatLng(place.y, place.x),
//     });

//     // 마커에 클릭이벤트를 등록합니다
//     window.kakao.maps.event.addListener(marker, "click", function () {
//       // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//       infowindow.setContent(
//         '<div style="padding:5px;font-size:12px;">' +
//           place.place_name +
//           "</div>"
//       );
//       infowindow.open(map, marker);
//     });
//   }
//   // const CustomButton = ({ num }) => {
//   //   const isSelected = selectedButton === num;
//   //   useEffect(() => {
//   //     if (isSelected) {
//   //       setThisNum(num);
//   //       console.log(thisNum);
//   //     }
//   //   }, [isSelected, num]);

//   //   return (
//   //     <div
//   //       onClick={() => {
//   //         setSelectedButton(isSelected ? null : num);
//   //         searchPlace(thisNum);
//   //       }}
//   //       style={{
//   //         ...styles.button,
//   //         left: 150 * num + num + "px",
//   //         backgroundColor: isSelected ? "orange" : "white",
//   //       }}
//   //     >
//   //       #{arr[num]}
//   //     </div>
//   //   );
//   // };
//   const CustomButton = ({ num }) => {
//     const isSelected = selectedButton === num;
//     useEffect(() => {
//       if (isSelected) {
//         setThisNum(num);
//         console.log(thisNum);
//       }
//     }, [isSelected, num]);

//     return (
//       <div
//         onClick={() => {
//           setSelectedButton(isSelected ? null : num);
//           searchPlace(thisNum);
//         }}
//         className={`${styles.button} ${
//           isSelected ? styles.selectedButton : ""
//         }`}
//         style={{ left: 150 * num + num + "px" }}
//       >
//         #{arr[num]}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div id="map" style={styles.map}></div>
//       <div>
//         <button style={styles.backButton}>뒤로가기</button>
//         <input style={styles.input} />
//         {arr.map((item, index) => (
//           <CustomButton key={index} num={index} />
//         ))}
//       </div>
//       <div>
//         {selectedButton !== null && (
//           <button
//             style={styles.listButton}
//             onClick={() => {
//               handleBottomSheetOpen("map");
//               searchPlace();
//             }}
//           >
//             목록보기
//           </button>
//         )}
//         <BottomSheet
//           show={showBottomSheet}
//           onClose={handleBottomSheetClose}
//           type={bottomSheetType}
//         />
//       </div>
//     </div>
//   );
// };

// export default MapScreen;

import React, { useEffect, useState } from "react";
import BottomSheet from "../component/BottomSheet";
import styles from "../css/mapScreen.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import axios from "axios";

const MapScreen = () => {
  let screenH = window.innerHeight;
  let arr = ["동물병원", "반려동물동반", "반려동물산책"];
  const apiKey = "b09ec8730de391ab294f4a9848831c2c";

  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [thisNum, setThisNum] = useState();

  const [map, setMap] = useState();
  const [infowindow, setInfoWindow] = useState();
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 정보를 저장할 상태
  const [isVisible, setIsVisible] = useState(false); // 트랜지션을 위한 상태

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position1) => {
      setPosition({
        latitude: position1.coords.latitude,
        longitude: position1.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0a5f90aad179112a10005dc19a414e8a&autoload=false&libraries=services`; //,clusterer,drawing
    document.head.appendChild(script);
    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        navigator.geolocation.getCurrentPosition((position1) => {
          setPosition({
            latitude: position1.coords.latitude,
            longitude: position1.coords.longitude,
          });
        });
        const options = {
          center: new window.kakao.maps.LatLng(
            position.latitude,
            position.longitude
          ),
          level: 4,
        };
        setMap(new window.kakao.maps.Map(container, options));
        setInfoWindow(new window.kakao.maps.InfoWindow({ zIndex: 2 }));
      });
    });
  }, []);

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

  function searchPlace(num) {
    var ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(arr[num], placesSearchCB);
  }
  function placesSearchCB(data, status, pagination) {
    if (status === window.kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다

      var bounds = new window.kakao.maps.LatLngBounds();
      console.log(bounds);
      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }
      map.setBounds(bounds);
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    }
  }
  function displayMarker(place) {
    var marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, "click", function () {
      setSelectedPlace(place);
      setTimeout(() => {
        setIsVisible(true); // placeInfo를 보이도록 설정
      }, 10); // 약간의 지연을 두어 트랜지션을 시작합니다.
    });
  }
  const CustomButton = ({ num }) => {
    const isSelected = selectedButton === num;
    useEffect(() => {
      if (isSelected) {
        setThisNum(num);
        console.log(thisNum);
      }
    }, [isSelected, num]);

    return (
      <div
        onClick={() => {
          setSelectedButton(isSelected ? null : num);
          searchPlace(thisNum);
        }}
        className={`${styles.button} ${
          isSelected ? styles.selectedButton : ""
        }`}
      >
        #{arr[num]}
      </div>
    );
  };

  return (
    <div className={styles.MapscreenWrap}>
      <div id="map" className={styles.map}></div>
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
              searchPlace();
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
