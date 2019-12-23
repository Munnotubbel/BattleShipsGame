import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
// import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import ReactTimeAgo from "react-time-ago";
import { InfoContext } from "../../../InfoContext";

export default class Games extends Component {
  static contextType = InfoContext;
  state = {};

  componentWillMount = () => {
    this.context.fetchGames();
  };



  getResult = score => {
    if (score !== null) {
      switch (score[0]) {
        case "1.0":
          return (
            <img
              width="20px"
              height="auto"
              alt="winnersMedal"
              style={{ position: "absolute", left: "5%" }}
              src="https://res.cloudinary.com/munnotubbel/image/upload/v1576767846/javaProject/Navy_Cross_xzfzf7.png"
            />
          );

        case "0.5":
          return <div className="winlos stalemate"></div>;

        case "0.0":
          return <div className="winlos sunk"></div>;

        default:
          return "";
      }
    }
    return "";
  };

  render() {
    const { updateValue,games,myGameIds } = this.context;
console.log(this.context)
    if (games) {
      return (
        <CardDeck>
          {games.map(game => {
            return (
              <Card
                key={game.gmId}
                className="text-center one-edge-shadow gameCards"
              >
                <Card.Header>Game {game.gmId}</Card.Header>
                {game.ingamePlayer && (
                  <Card.Body>
                    <Card.Title>
                      <Container>
                        {game.ingamePlayer.map((ply, index) => {
                          if (index === 0) {
                            return (
                              <div key="player1">
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
                          } else {
                            return (
                              <Row
                                key="player2"
                                className="justify-content-md-center"
                              >
                                <div>{ply.name}</div>
                                {this.getResult(ply.score)}
                              </Row>
                            );
                          }
                        })}
                      </Container>
                    </Card.Title>
                    {myGameIds !== [null] &&
                    myGameIds.includes(game.gmId) &&
                    game.ingamePlayer[0].score.length === 0 ? (
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
