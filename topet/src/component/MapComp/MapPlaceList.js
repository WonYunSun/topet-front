import React from "react";
import { FaRegSadTear } from "react-icons/fa";
import styles from "../../css/mapPlaceList.module.css";
function MapPlaceList({
  searchResult,
  moveLatLng,
  onClose,
  setSelectedMarker,
  setSelectedPlace,
  isDeskTop,
}) {
  const getLastCategoryName = (categoryName) => {
    const parts = categoryName.split(" > ");
    const lastPart = parts[parts.length - 1];

    if (lastPart.length >= 7) {
      return parts.length > 2 ? parts[2] : null;
    } else {
      return lastPart;
    }
  };

  const formatDistance = (distance) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)} km`;
    }
    return `${distance} m`;
  };

  if (!searchResult || searchResult.length === 0) {
    return (
      <div className={styles.noResultdiv}>
        검색 결과가 없어요 <FaRegSadTear />
      </div>
    );
  }

  return (
    <div className={styles.placeWrapper}>
      {searchResult.map((places) => (
        <div
          key={places.id}
          className={styles.listWrap}
          onClick={() => {
            onClose();
            moveLatLng(places);
            setSelectedMarker(places);
            setSelectedPlace(places);
          }}
        >
          <div className={styles.titleWrap}>
            <div>{places.place_name}</div>
            <div>{getLastCategoryName(places.category_name)}</div>
          </div>
          <div>{places.address_name}</div>
          <div>{places.phone}</div>

          <div className={styles.distanceDiv}>
            {formatDistance(places.distance)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MapPlaceList;
