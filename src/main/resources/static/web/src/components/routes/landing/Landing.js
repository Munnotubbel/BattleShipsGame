import React from "react";
import { NavLink } from "react-router-dom";
import Vimeo from "react-vimeo";
export default function Landing() {
  return (
    <div>
      <div class="video-background">
        <div class="video-foreground">
          <iframe
            src="https://streamable.com/s/0uamq/scuzcf"
            frameborder="0"
            width="100%"
            height="100%"
            allowfullscreen
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: "0px",
              top: "0px",
              overflow: "hidden"
            }}
          ></iframe>
        </div>
      </div>
      <div className="landingLink">
        <div className="landingHeadline">Battleships</div>
        <div className="logo">
          <img
            s
            alt="bshioLogo"
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1576591169/javaProject/bShip_u50r62.png"
          ></img>
        </div>
        <div className="landingStripe"></div>
      </div>
      <div
        className="intoBattle"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <div>
          <div align="center">
            <NavLink to="web/games">
              <button>INTO BATTLE</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
