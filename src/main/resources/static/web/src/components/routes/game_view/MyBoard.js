import React, { useContext } from "react";
import Hitpoints from "./Hitpoints";
import "../../../css/Water.css";
import "../../../css/Boards.css";

import Burning from "./Burning";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InfoContext } from "../../../InfoContext";
export default function MyBoard(props) {
  const themecon = useContext(InfoContext);
  function shipImage(cellKey) {
    if (themecon.submarine.location[0] === cellKey) {
      if (themecon.submarine.isHorizontal === true) {
        return (
          <img
            style={{
              zIndex: 3000,
              position: "absolute",
              width: "5.4vw",
              height: "auto",
              left: 0,
              top: "30%"
            }}
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1577626645/javaProject/submarine_hxr5hf.png"
          />
        );
      } else {
        return (
          <img
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "left center ",
              zIndex: 3000,
              position: "absolute",
              width: "5.4vw",
              height: "auto",
              left: "50%",
              top: "-15%"
            }}
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1577626645/javaProject/submarine_hxr5hf.png"
          />
        );
      }
    }

    if (themecon.destroyer.location[0] === cellKey) {
      if (themecon.destroyer.isHorizontal === true) {
        return (
          <img
            style={{
              zIndex: 3000,
              position: "absolute",
              width: "8vw",
              height: "auto",
              left: 0,
              top: "25%"
            }}
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1577626636/javaProject/destroyer_loejgp.png"
          />
        );
      } else {
        return (
          <img
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "left center ",
              zIndex: 3000,
              position: "absolute",
              width: "8vw",
              height: "auto",
              left: "50%",
              top: "-35%"
            }}
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1577626636/javaProject/destroyer_loejgp.png"
          />
        );
      }
    }

    if (themecon.cruiseShip.location[0] === cellKey) {
      if (themecon.cruiseShip.isHorizontal === true) {
        return (
          <img
            style={{
              zIndex: 3000,
              position: "absolute",
              width: "11vw",
              height: "auto",
              left: 0,
              top: "15%"
            }}
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1577626631/javaProject/cruiseShip_vrszgj.png"
          />
        );
      } else {
        return (
          <img
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "left center ",
              zIndex: 3000,
              position: "absolute",
              width: "11vw",
              height: "auto",
              left: "50%",
              top: "-40%"
            }}
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1577626631/javaProject/cruiseShip_vrszgj.png"
          />
        );
      }
    }

    if (themecon.battleship.location[0] === cellKey) {
      if (themecon.battleship.isHorizontal === true) {
        return (
          <img
            style={{
              zIndex: 3000,
              position: "absolute",
              width: "13.5vw",
              height: "auto",
              left: 0,
              top: "5%"
            }}
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1577986664/javaProject/battleship_trans_zg385u.png"
          />
        );
      } else {
        return (
          <img
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "left center ",
              zIndex: 3000,
              position: "absolute",
              width: "13.5vw",
              height: "auto",
              left: "50%",
              top: "-50%"
            }}
            src="https://res.cloudinary.com/munnotubbel/image/upload/v1577626627/javaProject/battleship_trans_k2u0t5.png"
          />
        );
      }
    }
  }
  function createOwnBoard() {
    let board = [];

    // Outer loop to create parent
    for (let i = 100; i < 1001; i += 100) {
      let children = [];

      for (let j = 1; j < 11; j++) {
        let cellKey = j + i;

        if (
          themecon.shipsPlaced === true &&
          (themecon.destroyer.location[0] == cellKey ||
            themecon.submarine.location[0] == cellKey ||
            themecon.cruiseShip.location[0] == cellKey ||
            themecon.battleship.location[0] == cellKey)
        ) {
          children.push(
            <Col className="allCells" xs={1}>
              {shipImage(cellKey)}
              {props.enHits.includes(cellKey) && <Burning />}
            </Col>
          );
        } else if (props.enHits.includes(cellKey)) {
          children.push(
            <Col className="allCells" xs={1}>
              <Burning />
            </Col>
          );
        } else if (
          // props.myShipLocations.includes(cellKey) ||
          props.placedShips.includes(cellKey) ||
          props.placedShipsTemp.includes(cellKey)
        ) {
          children.push(
            <Col
              className="allCells"
              value={cellKey}
              style={{ backgroundColor: "yellow" }}
              xs={1}
            ></Col>
          );
        } else if (
          themecon.shipsPlaced === true &&
          (themecon.destroyer.location.includes(cellKey) ||
            themecon.submarine.location.includes(cellKey) ||
            themecon.cruiseShip.location.includes(cellKey) ||
            themecon.battleship.location.includes(cellKey))
        ) {
          children.push(
            <Col className="allCells" value={cellKey} xs={1}></Col>
          );
        } else if (props.enShots.includes(cellKey)) {
          children.push(
            <Col className="allCells" value={cellKey} xs={1}>
              <img
                style={{
                  animationDelay: `${Math.floor(Math.random() * -30) + "s"}`
                }}
                className="bojeRed wiggle"
                alt="boje"
                src="https://res.cloudinary.com/munnotubbel/image/upload/v1576514944/javaProject/boje-removebg-preview-removebg-preview_acxmc4.png"
              ></img>
            </Col>
          );
        } else {
          children.push(
            <Col
              className="allCells"
              value={cellKey}
              align="center"
              style={{ paddingTop: "1px" }}
              xs={1}
              onClick={() => props.putShip(cellKey)}
            ></Col>
          );
        }
      }
      //Create the parent and add the children
      board.push(
        <Row>
          {children}
          <Col xs={2} className="w-100"></Col>
        </Row>
      );
    }
    return board;
  }

  return (
    <Container>
      <Row>
        <Col>
          {" "}
          {props.enHits && (
            <Hitpoints
              name={themecon.logged + " (you)"}
              dmg={props.enHits.length}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="boardContainer">{createOwnBoard()}</Container>
        </Col>
      </Row>
    </Container>
  );
}
