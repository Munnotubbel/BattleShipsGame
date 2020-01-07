import React, { useContext } from "react";
import Hitpoints from "./Hitpoints";
import "../../../css/Boards.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TargetLock from "./TargetLock";
import { InfoContext } from "../../../InfoContext";
import Countdown from "react-countdown-now";

export default function EnemyBoard(props) {
  const infoCon = useContext(InfoContext);
  const renderer = ({ minutes, seconds }) => {
    return (
      <div>
        {minutes}:{seconds}
      </div>
    );
  };
  function createEnemyBoard() {
    let enemyBoard = [];

    for (let i = 100; i < 1001; i += 100) {
      let enemyChildren = [];

      for (let j = 1; j < 11; j++) {
        let cellKey = i + j;
        if (props.myHits.includes(cellKey)) {
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
        } else if (props.myShots.includes(cellKey)) {
          enemyChildren.push(
            <Col className="allCells" value={cellKey} xs={1}>
              <TargetLock />
            </Col>
          );
        } else if (props.myMiss.includes(cellKey)) {
          enemyChildren.push(
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
      {infoCon.sunk && infoCon.sunk.length > 0 ? (
        <Row>
          <Col>
            {infoCon.sunk[0].Battleship === true ? (
              <div>
                <div class="speechbubble">Battleship sunk</div>
                <div class="pointer"></div>
              </div>
            ) : null}
          </Col>
          <Col>
            {infoCon.sunk[0].CruiseShip === true ? (
              <div>
                <div class="speechbubble">Cruise Ship sunk</div>
                <div class="pointer"></div>
              </div>
            ) : null}
          </Col>
          <Col>
            {infoCon.sunk[0].Destroyer === true ? (
              <div>
                <div class="speechbubble">Destroyer sunk</div>
                <div class="pointer"></div>
              </div>
            ) : null}
          </Col>
          <Col>
            {infoCon.sunk[0].Submarine === true ? (
              <div>
                <div class="speechbubble">Submarine sunk</div>
                <div class="pointer"></div>
              </div>
            ) : null}
          </Col>
          <Col></Col>
        </Row>
      ) : null}
      <Row>
        <Col>
          {" "}
          {props.myHits && (
            <Hitpoints name={props.enemyName} dmg={props.myHits.length} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {infoCon.EnAtmTurn === 0 || infoCon.round === 0 ? (
            <div
              style={{
                border: "1px white",
                borderRadius: "5px",
                backgroundColor: "white",
                position: "absolute",

                top: "40%",
                padding: "10px"
              }}
            >
              {infoCon.round === 0 ? (
                <div>
                  <h6>place your ships and wait for opponent</h6>{" "}
                </div>
              ) : (
                <div>
                  <h6>wait for opponent</h6>{" "}
                </div>
              )}
              <div style={{ margin: "5px auto" }}>
                {infoCon.enemyName && (
                  <Countdown
                    date={infoCon.timeOut + 900000}
                    renderer={renderer}
                  />
                )}
              </div>
            </div>
          ) : (
            <Container className="boardContainer">
              {createEnemyBoard()}
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}
