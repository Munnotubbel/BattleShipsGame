import React from "react";
import "./Boards.css";

export default function TargetLock() {
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      <div className="targetWrap">
        <div className="innerCircle spin">
          <div className="tinybeam1"></div>
          <div className="tinybeam2"></div>
          <div className="tinybeam3"></div>
          <div className="tinybeam4"></div>
        </div>
        <div className="outerCircle spin">
          <div className="tinybeam5"></div>
          <div className="tinybeam6"></div>
          <div className="tinybeam7"></div>
          <div className="tinybeam8"></div>
        </div>
      </div>
    </div>
  );
}
