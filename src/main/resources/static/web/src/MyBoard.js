import React from "react";
import Grid from "@material-ui/core/Grid";
import Hitpoints from "./Hitpoints";
import "./Water.css";
import "./Boards.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function MyBoard(props) {
  function createOwnBoard() {
    let board = [];

    // Outer loop to create parent
    for (let i = 100; i < 1001; i += 100) {
      let children = [];

      for (let j = 1; j < 11; j++) {
        let cellKey = j + i;

        if (props.enHits.includes(cellKey)) {
          {
            children.push(
              <Col className="allCells" xs={1}>
                <strong>X</strong>
              </Col>
            );
          }
        } else if (
          props.myShipLocations.includes(cellKey) ||
          props.placedShips.includes(cellKey) ||
          props.placedShipsTemp.includes(cellKey)
        ) {
          {
            children.push(
              <Col
                className="allCells"
                value={cellKey}
                style={{ backgroundColor: "yellow" }}
                xs={1}
              ></Col>
            );
          }
        } else if (props.enShots.includes(cellKey)) {
          {
            children.push(
              <Col className="allCells" value={cellKey} xs={1}>
                <img
                  className="bojeRed wiggle"
                  src="https://res.cloudinary.com/munnotubbel/image/upload/v1576514944/javaProject/boje-removebg-preview-removebg-preview_acxmc4.png"
                ></img>
              </Col>
            );
          }
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
          <strong>my Board</strong>
        </Col>
      </Row>
      <Row>
        <Col> {props.enHits && <Hitpoints dmg={props.enHits.length} />}</Col>
      </Row>
      <Row>
        <Col>
          <Container className="boardContainer">{createOwnBoard()}</Container>
        </Col>
      </Row>
    </Container>
  );
}
