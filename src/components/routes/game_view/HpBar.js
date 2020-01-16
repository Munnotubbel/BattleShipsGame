import React from "react";
import "../../../css/Hitpoints.css";
export default function HpBar(props) {
  return (
    <div className="health-bar">
      <div
        className="health-bar-inner-bar"
        style={{ width: `${props.hp}%` }}
      ></div>
      <div className="health-bar-name">{props.name}</div>
    </div>
  );
}
