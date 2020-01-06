import React, { useContext, useEffect } from "react";
import "../../../css/Hitpoints.css";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import EnemyBoard from "./EnemyBoard";
import MyBoard from "./MyBoard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InfoContext } from "../../../InfoContext";
import TurnCounter from "./TurnCounter";

function GameView() {
  const infocon = useContext(InfoContext);

  useEffect(() => {
    infocon.fetchGameView();

    infocon.updateValue("pull", true);
  }, []);

  useEffect(() => {
    return () => {
      infocon.updateValue("pull", false);
    };
  }, []);

  if (infocon.responstStatus === 401) {
    this.props.history.goBack();
  } else {
    if (
      infocon.locations &&
      infocon.attacks &&
      infocon.myHits &&
      infocon.hits
    ) {
      return (
        <Container>
          {infocon.gameOver === true ? (
            <Row>
              <Col
                style={{
                  position: "absolute",
                  left: "30%",
                  top: "40%",
                  width: "40%",
                  height: "30%",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  zIndex: "10000"
                }}
              >
                <h2 style={{ position: "absolute", top: "35%", left: "40%" }}>
                  {infocon.gameResult}
                </h2>
              </Col>{" "}
            </Row>
          ) : null}

          <Row className="justify-content-md-center">
            <Col xs="2"></Col>
            <Col xs="auto">
              <TurnCounter></TurnCounter>
            </Col>
            <Col xs="2"></Col>
          </Row>

          <Row>
            <Col xs={12} lg={6}>
              {" "}
              <MyBoard
                enShots={infocon.hits}
                enHits={infocon.hitMyShip}
                myShipLocations={infocon.locations}
                placedShips={infocon.shipLog}
                placedShipsTemp={infocon.shipLogTemp}
                putShip={infocon.putShip}
              ></MyBoard>
            </Col>

            <Col xs={12} lg={6}>
              <EnemyBoard
                enemyName={infocon.enemyName}
                myHits={infocon.myHits}
                myShots={infocon.shots}
                myMiss={infocon.attacks}
                fireInTheHole={infocon.handleShot}
              ></EnemyBoard>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col xs={2}>
              {" "}
              {infocon.fleetInPosition === true &&
              infocon.shipsPlaced === false ? (
                <Grid item>
                  <button
                    className="actionButton"
                    onClick={() => infocon.postShips()}
                  >
                    post ships
                  </button>
                </Grid>
              ) : null}
              {infocon.shipsToPlace.ship1 === true ? (
                <Grid item>
                  <button
                    className="actionButton"
                    onClick={() => infocon.placeShip(1, 2)}
                  >
                    Place First Ship
                  </button>
                </Grid>
              ) : null}
              {infocon.shipsToPlace.ship2 === true ? (
                <Grid item>
                  <button
                    className="actionButton"
                    onClick={() => infocon.placeShip(2, 3)}
                  >
                    Place Second Ship
                  </button>
                </Grid>
              ) : null}
              {infocon.shipsToPlace.ship3 === true ? (
                <Grid item>
                  <button
                    className="actionButton"
                    onClick={() => infocon.placeShip(3, 4)}
                  >
                    Place Third Ship
                  </button>
                </Grid>
              ) : null}
              {infocon.shipsToPlace.ship4 === true ? (
                <Grid item>
                  <button
                    className="actionButton"
                    onClick={() => infocon.placeShip(4, null)}
                  >
                    Place Fourth Ship
                  </button>
                </Grid>
              ) : null}
            </Col>
            <Col xs={1}>
              {" "}
              {infocon.shipsPlaced === false ? (
                <Grid item>
                  <button
                    className="actionButton"
                    onClick={() => infocon.placeAgain()}
                  >
                    again
                  </button>
                </Grid>
              ) : null}
            </Col>
            <Col xs={1}>
              {infocon.fleetInPosition === false &&
              infocon.shipsPlaced === false ? (
                <Grid item>
                  {infocon.rotate === "horizontal" ? (
                    <button
                      className="actionButton"
                      onClick={() => infocon.rotateShip(null)}
                    >
                      to vertical
                    </button>
                  ) : (
                    <button
                      className="actionButton"
                      onClick={() => infocon.rotateShip("horizontal")}
                    >
                      to horizontal
                    </button>
                  )}
                </Grid>
              ) : null}
            </Col>
            {/* <Col xs={1}>
                {infocon.fleetInPosition === false &&
                infocon.shipsPlaced === false ? (
                  <Grid item>
                    <button className="actionButton" onClick={() => infocon.rotate(null)}>
                      vertical
                    </button>
                  </Grid>
                ) : null}
              </Col> */}
            <Col xs={3}></Col>
            <Col xs={1}>
              {infocon.shipsPlaced === true &&
              infocon.selfCanFire === true &&
              infocon.shots.length > 0 ? (
                <Grid item>
                  <button
                    className="actionButton"
                    onClick={() => infocon.resetShot()}
                  >
                    reset shot
                  </button>
                </Grid>
              ) : null}
            </Col>
            <Col xs={1}>
              {infocon.shotsPlaced === true ? (
                <Grid item>
                  <button
                    className="actionButton"
                    onClick={() => infocon.postShots()}
                  >
                    post Shots
                  </button>
                </Grid>
              ) : null}
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}

export default withRouter(GameView);
