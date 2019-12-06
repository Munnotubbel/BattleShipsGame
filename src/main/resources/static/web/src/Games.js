import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
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
    this.state.games && console.log(this.state.games);

    if (this.state.games) {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          style={{ marginTop: "5%" }}
        >
          {this.state.games.map(game => {
            return (
              <Grid item xs={6}>
                {game.gamename}
                <ul>
                  <li>Game ID: {game.gameId}</li>
                  <li>created at: {game.created}</li>
                  {game.gamePlayers && (
                    <div>
                      <strong>Players:</strong>
                      <ul>
                        {game.gamePlayers.map(gamePly => {
                          return (
                            <ul>
                              <ul>
                                <li>Playername: {gamePly.player.name}</li>
                                <li>Player ID: {gamePly.player.playerId}</li>
                              </ul>
                              <ul>
                                Ships:
                                {gamePly.ships &&
                                  gamePly.ships.map(ship => {
                                    console.log(ship);
                                    return (
                                      <ul>
                                        <li>Ship Type: {ship.ShipType}</li>
                                        <li>Ship Location : {ship.location}</li>
                                      </ul>
                                    );
                                  })}
                              </ul>
                            </ul>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </ul>
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}
