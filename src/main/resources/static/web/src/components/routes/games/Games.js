import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardGroup from "react-bootstrap/CardGroup";

import CardColumns from "react-bootstrap/CardColumns";
// import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import ReactTimeAgo from "react-time-ago";
import { InfoContext } from "../../../InfoContext";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import Grid from "@material-ui/core/Grid";

export default function Games() {
  const infocon = useContext(InfoContext);

  // const useMountEffect = fun => useEffect(fun, []);
  // useMountEffect(infocon.fetchGames());

  useEffect(() => {
    infocon.fetchGames();
  }, []);

  function getResult(score) {
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
  }

  if (infocon.games) {
    return (
      <Grid item xs={10}>
        <CardDeck>
          {infocon.games.map(game => {
            return (
              <Card
                style={{ margin: "10px" }}
                key={game.gmId}
                className="text-center one-edge-shadow gameCards"
              >
                <Card.Header>Game {game.gmId}</Card.Header>
                {game.ingamePlayer && (
                  <Card.Body className="gameCardText">
                    <Container>
                      <Card.Title>
                        {game.ingamePlayer.map((ply, index) => {
                          if (index === 0) {
                            return (
                              <div key="player1">
                                <Row className="justify-content-md-center">
                                  <div>{ply.name}</div>
                                  {getResult(ply.score)}
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
                                {getResult(ply.score)}
                              </Row>
                            );
                          }
                        })}
                      </Card.Title>
                    </Container>
                    {infocon.myGameIds !== [null] &&
                    infocon.myGameIds.includes(game.gmId) &&
                    game.ingamePlayer[0].score.length === 0 ? (
                      <NavLink
                        to={{
                          pathname: "/web/game_view"
                        }}
                        onClick={() => infocon.updateValue("gmId", game.gmId)}
                      >
                        <Button
                          style={{
                            position: "relative",
                            fontSize: "12px"
                          }}
                          className="enterGameBtn"
                          onClick={() => infocon.updateValue("gmId", game.gmId)}
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
      </Grid>
    );
  } else {
    return <h1>...loading</h1>;
  }
}
