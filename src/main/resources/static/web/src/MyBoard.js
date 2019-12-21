import React, { useContext } from "react";
import Hitpoints from "./Hitpoints";
import "./Water.css";
import "./Boards.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InfoContext } from "./InfoContext";
export default function MyBoard(props) {
  const themecon = useContext(InfoContext);

  function createOwnBoard() {
    let board = [];

    // Outer loop to create parent
    for (let i = 100; i < 1001; i += 100) {
      let children = [];

      for (let j = 1; j < 11; j++) {
        let cellKey = j + i;

        if (props.enHits.includes(cellKey)) {
          children.push(
            <Col className="allCells" xs={1}>
              <div class="watergrid">
                <div class="oil1"></div>
                <div class="oil2"></div>
                <div class="oil3"></div>
                <div class="oil4"></div>
                <div class="oil5"></div>
                <div class="oil6"></div>
                <div class="oil7"></div>
                <div class="oil8"></div>
                <div class="oil9"></div>
                <div class="oil10"></div>
                <div class="fire">
                  <div class="fire-left">
                    <div class="main-fire"></div>
                    <div class="particle-fire"></div>
                  </div>
                  <div class="fire-main">
                    <div class="main-fire"></div>
                    <div class="particle-fire"></div>
                  </div>
                  <div class="fire-right">
                    <div class="main-fire"></div>
                    <div class="particle-fire"></div>
                  </div>
                  <div class="fire-bottom">
                    <div class="main-fire"></div>
                  </div>
                </div>
              </div>
            </Col>
          );
        } else if (
          props.myShipLocations.includes(cellKey) ||
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
