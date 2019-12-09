import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
export default class Ranking extends Component {
  state = {};
  componentDidMount = () => {
    this.fetchRanking();
  };
  fetchRanking = () => {
    fetch(`api/ranking`)
      .then(response => response.json())
      .then(response => this.setState({ ranking: response }));
  };

  createRanking = () => {
    const rankingTable = [];

    this.state.ranking.forEach(player => {
      let wins = 0;
      let loses = 0;
      let ties = 0;
      let rating = 0;
      for (var i = 0; i < player.scores.length; i++) {
        player.scores[i] === 1.0 && wins++;
        player.scores[i] === 0.5 && ties++;
        player.scores[i] === 0.0 && loses++;
        rating = rating + player.scores[i];
        console.log(wins + " " + loses + " " + ties + " " + rating);
      }
      rankingTable.push(
        <Grid item xs={3}>
          {player.UserName}
        </Grid>
      );
      rankingTable.push(
        <Grid item xs={2}>
          {wins}
        </Grid>
      );
      rankingTable.push(
        <Grid item xs={2}>
          {ties}
        </Grid>
      );
      rankingTable.push(
        <Grid item xs={2}>
          {loses}
        </Grid>
      );
      rankingTable.push(
        <Grid item xs={2}>
          {rating}
        </Grid>
      );
    });
    return rankingTable;
  };

  render() {
    if (this.state.ranking) {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          style={{ marginTop: "5%" }}
        >
          <Grid item xs={3}>
            Player
          </Grid>
          <Grid item xs={2}>
            win
          </Grid>
          <Grid item xs={2}>
            tie
          </Grid>
          <Grid item xs={2}>
            lose
          </Grid>
          <Grid item xs={2}>
            rating
          </Grid>
          {this.createRanking()}
        </Grid>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}
