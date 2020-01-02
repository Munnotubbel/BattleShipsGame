import React, { useContext } from "react";
import "../../../css/TurnCounter.css";
import { InfoContext } from "../../../InfoContext";
export default function TurnCounter(props) {
  const infoCon = useContext(InfoContext);

  return (
    <div className="counterBorder">
      {infoCon.selfCanFire ? (
        <div>
          {infoCon.round < 10 ? (
            <div className="counterCenter">{props.round}</div>
          ) : (
            <div className="counterCenter2">{props.round}</div>
          )}

          <div className="counterCenterText">turn</div>
        </div>
      ) : (
        <div class="circle">
          <div class="up">
            <div class="innera"></div>
          </div>
          <div class="down">
            <div class="innerb"></div>
          </div>
        </div>
      )}
    </div>
  );
}
