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

  getResult = score => {
    console.log(score);
    if (score !== null) {
      switch (score[0]) {
        case "1.0":
          return (
            <img
              width="20px"
              height="auto"
              style={{ position: "absolute", left: "5%" }}
              src="https://res.cloudinary.com/munnotubbel/image/upload/v1576767846/javaProject/Navy_Cross_xzfzf7.png"
            />
          );

        case "0.5":
          return <div className="winlos stalemate"></div>;

        case "0.0":
          return <div className="winlos sunk"></div>;
      }
    }
    return "";
  };

  render() {
    const { updateValue } = this.context;

    console.log("-------------------------------------");
    console.log(this.context);

    if (this.state.games) {
      return (
        <CardDeck>
          {this.state.games.map(game => {
            return (
              <Card className="text-center one-edge-shadow gameCards">
                <Card.Header>Game {game.gmId}</Card.Header>
                {game.ingamePlayer && (
                  <Card.Body>
                    <Card.Title>
                      <Container>
                        {game.ingamePlayer.map((ply, index) => {
                          if (index === 0) {
                            return (
                              <div>
                                <Row className="justify-content-md-center">
                                  <div>{ply.name}</div>
                                  {this.getResult(ply.score)}
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
                              </div>
                            );
                          } else if (index === 1) {
                            return (
                              <Row className="justify-content-md-center">
                                <div>{ply.name}</div>
                                {this.getResult(ply.score)}
                              </Row>
                            );
                          }
                        })}
                      </Container>
                    </Card.Title>
                    {this.state.myGameIds !== [null] &&
                    this.state.myGameIds.includes(game.gmId) ? (
                      <NavLink
                        to={{
                          pathname: "/web/game_view"
                        }}
                        onClick={() => updateValue("gmId", game.gmId)}
                      >
                        <Button
                          style={{
                            position: "relative",
                            fontSize: "12px"
                          }}
                          className="enterGameBtn"
                          onClick={() => updateValue("gmId", game.gmId)}
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
