import React, { Component } from "react";
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
import { pollWrapper } from "poll-js";
class GameView extends Component {
  static contextType = InfoContext;

  componentDidMount = () => {
    this.context.fetchGameView();

    this.context.updateValue("pull", true);
  };

  componentWillUnmount = () => {
    this.context.updateValue("pull", false);
  };

  render() {
    if (this.context.responstStatus === 401) {
      this.props.history.goBack();
    } else {
      if (
        this.context.locations &&
        this.context.attacks &&
        this.context.myHits &&
        this.context.hits
      ) {
        return (
          <Container>
            {this.context.gameOver === true ? (
              <Row>
                <Col
                  style={{
                    position: "absolute",
                    left: "30%",
                    top: "40%",
                    width: "40%",
                    height: "30%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    zIndex: "2000"
                  }}
                >
                  <h2 style={{ position: "absolute", top: "35%", left: "40%" }}>
                    {this.context.gameResult}
                  </h2>
                </Col>{" "}
              </Row>
            ) : null}

            {this.context.round && (
              <Row className="justify-content-md-center">
                <Col xs="2"></Col>
                <Col xs="auto">
                  <TurnCounter
                    gameOver={this.context.gameOver}
                    round={this.context.round}
                    selfCanFire={this.context.selfCanFire}
                  ></TurnCounter>
                </Col>
                <Col xs="2"></Col>
              </Row>
            )}

            <Row>
              <Col xs={6}>
                {" "}
                <MyBoard
                  enShots={this.context.hits}
                  enHits={this.context.hitMyShip}
                  myShipLocations={this.context.locations}
                  placedShips={this.context.shipLog}
                  placedShipsTemp={this.context.shipLogTemp}
                  putShip={this.context.putShip}
                ></MyBoard>
              </Col>

              <Col xs={6}>
                <EnemyBoard
                  enemyName={this.context.enemyName}
                  myHits={this.context.myHits}
                  myShots={this.context.shots}
                  myMiss={this.context.attacks}
                  fireInTheHole={this.context.handleShot}
                ></EnemyBoard>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={2}>
                {" "}
                {this.context.fleetInPosition === true &&
                this.context.shipsPlaced === false ? (
                  <Grid item>
                    <button onClick={() => this.context.postShips()}>
                      post ships
                    </button>
                  </Grid>
                ) : null}
                {this.context.shipsToPlace.ship1 === true ? (
                  <Grid item>
                    <button onClick={() => this.context.placeShip(1, 2)}>
                      Place First Ship
                    </button>
                  </Grid>
                ) : null}
                {this.context.shipsToPlace.ship2 === true ? (
                  <Grid item>
                    <button onClick={() => this.context.placeShip(2, 3)}>
                      Place Second Ship
                    </button>
                  </Grid>
                ) : null}
                {this.context.shipsToPlace.ship3 === true ? (
                  <Grid item>
                    <button onClick={() => this.context.placeShip(3, 4)}>
                      Place Third Ship
                    </button>
                  </Grid>
                ) : null}
                {this.context.shipsToPlace.ship4 === true ? (
                  <Grid item>
                    <button onClick={() => this.context.placeShip(4, null)}>
                      Place Fourth Ship
                    </button>
                  </Grid>
                ) : null}
              </Col>
              <Col xs={1}>
                {" "}
                {this.context.shipsPlaced === false ? (
                  <Grid item>
                    <button onClick={() => this.context.placeAgain()}>
                      again
                    </button>
                  </Grid>
                ) : null}
              </Col>
              <Col xs={1}>
                {this.context.fleetInPosition === false &&
                this.context.shipsPlaced === false ? (
                  <Grid item>
                    <button onClick={() => this.context.rotate("horizontal")}>
                      horizontal
                    </button>
                  </Grid>
                ) : null}
              </Col>
              <Col xs={1}>
                {this.context.fleetInPosition === false &&
                this.context.shipsPlaced === false ? (
                  <Grid item>
                    <button onClick={() => this.context.rotate(null)}>
                      vertical
                    </button>
                  </Grid>
                ) : null}
              </Col>
              <Col xs={3}></Col>
              <Col xs={1}>
                {this.context.shipsPlaced === true &&
                this.context.selfCanFire === true &&
                this.context.shots.length > 0 ? (
                  <Grid item>
                    <button onClick={() => this.context.resetShot()}>
                      reset shot
                    </button>
                  </Grid>
                ) : null}
              </Col>
              <Col xs={1}>
                {this.context.shotsPlaced === true ? (
                  <Grid item>
                    <button onClick={() => this.context.postShots()}>
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
}

export default withRouter(GameView);
