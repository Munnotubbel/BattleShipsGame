import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

export default class Players extends Component {
  state = {};
  async componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers = () => {
    fetch(`api/players`)
      .then(response => response.json())
      .then(response => this.setState(response));
  };

  render() {
    this.state.players && console.log(this.state.players);
    if (this.state.players) {
      return (
        <Grid item xs={12}>
          <Grid
            container
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            {this.state.players &&
              this.state.players.map(player => {
                return (
                  <Grid item xs={4} key={player.id}>
                    {player.id}-{player.username}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}
