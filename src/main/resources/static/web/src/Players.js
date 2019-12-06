import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

export default class Players extends Component {
  state = {};
  async componentDidMount() {
    this.fetchPlayer();
  }

  fetchPlayer() {
    fetch(`api/players`)
      .then(response => response.json())
      .then(
        response => this.setState({ players: response }),
        () => {
          console.log(this.state);
        }
      );
  }
  handleSubmit = e => {
    console.log("state is at the moment:" + this.state.username);
    e.preventDefault();

    var data = new FormData();
    data.append("json", JSON.stringify({ userName: this.state.username }));

    fetch("api/players", {
      method: "POST",
      body: data
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        alert(JSON.stringify(data));
      });
  };

  handleChange = e => {
    this.setState({
      username: [e.target.value]
    });
  };
  render() {
    this.state.players && console.log(this.state.players.players);
    if (this.state.players) {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          style={{ marginTop: "5%" }}
        >
          <form onSubmit={this.handleSubmit} className="white">
            <Grid item align="center" style={{ marginBottom: "10px" }}>
              <input
                type="email"
                id="username"
                onChange={this.handleChange}
                placeholder="username"
              />
            </Grid>
            <Grid item align="center">
              <button className="logbuttun">add member</button>
            </Grid>
          </form>
          <Grid item xs={12}>
            <Grid
              container
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {this.state.players.players &&
                this.state.players.players.map(player => {
                  return (
                    <Grid item xs={4} key={player.id}>
                      {player.id}-{player.userName}
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}
