import React from "react";
import "./FaceDetection.css";

const FaceDetection = ({ imageUrl, box }) => {
  return (
    <div className="center ma2">
      <div className="relative mt2">
        <img id="inputimage" src={imageUrl} alt="" width="450px" height="auto" />
        <div
          className="bounding-box"
          style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
        ></div>
      </div>
    </div>
  );
};

export default FaceDetection;
