// ShortsDetail.js
import React from "react";

function ShortsDetail({ videoSrc, id }) {
  const screenX = window.outerWidth;
  const screenY = window.outerHeight;

  return (
    <div style={{ margin: "0px", overflow: "hidden" }}>
      <h1 style={{ zIndex: 1, position: "absolute" }}>ShortsDetail</h1>
      <div></div>
      <h2>{id}</h2>
      <video
        src={videoSrc}
        autoPlay
        loop
        style={{ width: screenX, height: screenY * 0.6 }}
      ></video>
      <div>하단여백</div>
    </div>
  );
}

export default ShortsDetail;
