import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import ReactTimeAgo from "react-time-ago";
import { ThemeContext } from "./ThemeContext";

export default class Games extends Component {
  static contextType = ThemeContext;
  state = {};

  componentWillMount = () => {
    this.fetchGames();
  };

  fetchGames = () => {
    const { updateValue } = this.context;
    fetch(`api/games`)
      .then(response => response.json())
      .then(response =>
        this.setState({ ...response }, () => {
          if (response.loggedPly !== this.context.logged) {
            updateValue("logged", response.loggedPly);
          }
        })
      );
  };

  render() {
    const { updateValue } = this.context;

    console.log("-------------------------------------");
    console.log(this.context);

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
              if (index === 0) {
                gamePlayer1 = gamePly.gmPlyId;
                player1 = gamePly.player.name;
              }
              if (index === 1) {
                gamePlayer2 = gamePly.gmPlyId;
                player2 = gamePly.player.name;
              }
            });
            return (
              <Card className="text-center one-edge-shadow gameCards">
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
                    {this.state.myGameIds !== [null] &&
                    this.state.myGameIds.includes(gameId) ? (
                      <NavLink
                        to={{
                          pathname: "/web/game_view"
                        }}
                        onClick={() => updateValue("gmId", gameId)}
                      >
                        <Button
                          variant="primary"
                          onClick={() => updateValue("gmId", gameId)}
                        >
                          Enter Game
                        </Button>
                      </NavLink>
                    ) : null}
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
