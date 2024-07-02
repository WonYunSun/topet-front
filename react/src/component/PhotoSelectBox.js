import React, { useEffect, useState } from 'react';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import PhotoSelectButton from './PhotoSelectButton';
import '../css/photo_select.css'

const gettingImageData = () => {
  if (window.flutterGetImage && window.flutterGetImage.postMessage) {
    window.flutterGetImage.postMessage('getImageData');
  } else {
    console.error('flutterGetImage is not defined');
  }
};

// onMounted 함수
const onMounted = (setPickedImg) => {
  window.getImageData = function (base64Data) {
    const binaryString = atob(base64Data);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    const objectURL = URL.createObjectURL(blob);
    setPickedImg(objectURL);
  };
};

function PhotoSelectBox() {
  const [pickedImg, setPickedImg] = useState(null);

  useEffect(() => {
    onMounted(setPickedImg);
  }, []);

  useEffect(() => {
    console.log('isMobile:', isMobile);
  }, []);

  return (
    <div>
      {isMobile ? (
        <MobileView>
          <button onClick={gettingImageData}>사진 선택</button>
        </MobileView>
      ) : (
        <BrowserView>
          <PhotoSelectButton text="Button2" fontSize={20} />
        </BrowserView>
      )}
      {pickedImg && <img src={pickedImg} alt="Picked" />}
    </div>
  );
}

export default PhotoSelectBox;