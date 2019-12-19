import React from "react";
import Hitpoints from "./Hitpoints";
import "./Boards.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function EnemyBoard(props) {
  function createEnemyBoard() {
    let enemyBoard = [];

    for (let i = 100; i < 1001; i += 100) {
      let enemyChildren = [];

      for (let j = 1; j < 11; j++) {
        let cellKey = i + j;
        if (props.myHits.includes(cellKey)) {
          {
            enemyChildren.push(
              <Col className="allCells" value={cellKey} xs={1}>
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
          }
        } else if (props.myShots.includes(cellKey)) {
          {
            enemyChildren.push(
              <Col className="allCells" value={cellKey} xs={1}>
                <img
                  className="bojeRed rotate"
                  src="https://res.cloudinary.com/munnotubbel/image/upload/v1576577419/javaProject/crosshair.svg"
                ></img>
              </Col>
            );
          }
        } else if (props.myMiss.includes(cellKey)) {
          {
            enemyChildren.push(
              <Col className="allCells" value={cellKey} xs={1}>
                <img
                  className="bojeRed wiggle"
                  src="https://res.cloudinary.com/munnotubbel/image/upload/v1576514944/javaProject/boje-removebg-preview-removebg-preview_acxmc4.png"
                ></img>
              </Col>
            );
          }
        } else {
          enemyChildren.push(
            <Col
              className="allCells"
              onClick={() => props.fireInTheHole(cellKey)}
              xs={1}
            ></Col>
          );
        }
      }

      enemyBoard.push(
        <Row>
          {enemyChildren}
          <Col xs={2}></Col>
        </Row>
      );
    }
    return enemyBoard;
  }

  return (
    <Container>
      <Row>
        <Col>
          <strong>{props.enemyName}</strong>
        </Col>
      </Row>
      <Row>
        <Col> {props.myHits && <Hitpoints dmg={props.myHits.length} />}</Col>
      </Row>
      <Row>
        <Col>
          <Container className="boardContainer">{createEnemyBoard()}</Container>
        </Col>
      </Row>
    </Container>
  );
}
