import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Route, HashRouter, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import ReactTimeAgo from "react-time-ago";

export default class Games extends Component {
  state = {};

  componentWillMount = () => {
    this.fetchGames();
  };

  fetchGames = () => {
    fetch(`api/games`)
      .then(response => response.json())
      .then(response => this.setState(response));
  };

  render() {
    if (this.state.games) {
      return (
        <CardDeck>
          {this.state.games.map(game => {
            let gameId = game.gmId;
            let player1;
            let player2;
            let gamePlayer1;
            let gamePlayer2;
            game.gamePlayer.map((gamePly, index) => {
              console.log(gamePly);
              if (index === 0) {
                gamePlayer1 = gamePly.gmPlyId;
                player1 = gamePly.player.name;
              }
              if (index === 1) {
                gamePlayer2 = gamePly.gmPlyId;
                player2 = gamePly.player.name;
              }
              console.log(player1 + player2);
            });
            return (
              <Card className="text-center one-edge-shadow">
                <Card.Header>Game {game.gmId}</Card.Header>
                {game.gamePlayer && (
                  <Card.Body>
                    <Card.Title>
                      <Container>
                        <Row className="justify-content-md-center">
                          <NavLink
                            to={{
                              pathname: "/web/game_view",
                              gamePlayer: { gmPlyId: `${gamePlayer1}` },
                              game: { gmId: `${gameId}` }
                            }}
                          >
                            {player1 + " "}
                          </NavLink>
                        </Row>
                        <Row
                          style={{
                            fontSize: "calc(5px + 0.6vw)",
                            marginTop: "5px",
                            marginBottom: "5px"
                          }}
                          className="justify-content-md-center"
                        >
                          VS
                        </Row>
                        <Row className="justify-content-md-center">
                          <NavLink
                            to={{
                              pathname: "/web/game_view",
                              gamePlayer: { gmPlyId: `${gamePlayer2}` },
                              game: { gmId: `${gameId}` }
                            }}
                          >
                            {player2 ? " " + player2 : " -"}
                          </NavLink>
                        </Row>
                      </Container>
                    </Card.Title>

                    <Button variant="primary">Enter Game</Button>
                  </Card.Body>
                )}

                <Card.Footer
                  className="text-muted"
                  style={{ fontSize: "calc(5px + 0.3vw)" }}
                >
                  created: <ReactTimeAgo date={game.created} />
                </Card.Footer>
              </Card>
            );
          })}
        </CardDeck>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}
