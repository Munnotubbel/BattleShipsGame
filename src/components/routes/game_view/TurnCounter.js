import React, { useContext } from "react";
import "../../../css/TurnCounter.css";
import { InfoContext } from "../../../InfoContext";
import Countdown from "react-countdown-now";

export default function TurnCounter() {
  const infoCon = useContext(InfoContext);

  const renderer = ({ minutes, seconds }) => {
    return (
      <div>
        {minutes}:{seconds}
      </div>
    );
  };

  return (
    <div className="counterBorder">
      {infoCon.selfCanFire ? (
        <div>
          {infoCon.round < 10 ? (
            <div className="counterCenter">{infoCon.round}</div>
          ) : (
            <div className="counterCenter2">{infoCon.round}</div>
          )}

          <div className="counterCenterText">turn</div>
          {infoCon.turnTimer && (
            <div
              style={{
                position: "absolute",
                left: "40%",
                top: "65%",
                zIndex: 9000
              }}
            >
              <Countdown date={infoCon.turnTimer + 60000} renderer={renderer} />
            </div>
          )}
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
