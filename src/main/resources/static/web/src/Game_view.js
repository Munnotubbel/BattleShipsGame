import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class Game extends Component {
  state = {};
  componentDidMount = () => {
    this.fetchData();
  };
  fetchData = () => {
    fetch(`api/game/1`)
      .then(response => response.json())
      .then(response => {
        const bothUsers = [];
        response.gamePlayers.forEach(element => {
          bothUsers.push(element.player.name);
        });
        this.setState({
          opponents: bothUsers
        });
      });

    fetch(`api/game_view/1`)
      .then(response => response.json())
      .then(response => {
        console.log("get locations now");
        const locations = [];
        response.ships.forEach(element => {
          for (var i = 0; i < element.location.length; i++) {
            locations.push(element.location[i]);
          }
        });
        this.setState({
          currentUser: response.gamePlayers.name,
          locations: locations
        });
      });
  };

  getLocations = () => {
    console.log("get locations now");
    const locations = [];
    this.state.ships.forEach(element => {
      for (var i = 0; i < element.location.length; i++) {
        locations.push(element.location[i]);
      }
    });
    this.setState({ locations: locations });
  };

  createBoard = () => {
    let board = [];

    // Outer loop to create parent
    for (let i = 0; i < 10; i++) {
      let rowKey = "";
      switch (i) {
        case 0:
          rowKey = "A";
          break;
        case 1:
          rowKey = "B";
          break;
        case 2:
          rowKey = "C";
          break;
        case 3:
          rowKey = "D";
          break;
        case 4:
          rowKey = "E";
          break;
        case 5:
          rowKey = "F";
          break;
        case 6:
          rowKey = "G";
          break;
        case 7:
          rowKey = "H";
          break;
        case 8:
          rowKey = "I";
          break;
        case 9:
          rowKey = "J";
          break;
      }
      let children = [];
      //Inner loop to create children
      for (let j = 1; j <= 10; j++) {
        if (this.state.locations.includes(`${rowKey + j}`)) {
          {
            children.push(
              <Grid
                item
                item
                xs={1}
                align="center"
                style={{
                  backgroundColor: "yellow",
                  paddingTop: "20px",
                  border: "1px solid black",
                  minHeight: "60px",
                  maxHeight: "60px",
                  minWidth: "60px",
                  maxWidth: "60px"
                }}
              >
                {rowKey + j}
              </Grid>
            );
          }
        } else {
          children.push(
            <Grid
              item
              item
              xs={1}
              align="center"
              style={{
                paddingTop: "20px",
                border: "1px solid black",
                minHeight: "60px",
                maxHeight: "60px",
                minWidth: "60px",
                maxWidth: "60px"
              }}
            >
              {rowKey + j}
            </Grid>
          );
        }
      }
      //Create the parent and add the children
      board.push(
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          flexWrap="nowrap"
        >
          {children}
        </Grid>
      );
    }
    return board;
  };
  render() {
    this.state.ships && console.log(this.state);

    if (this.state.locations) {
      return (
        <Grid align="center">
          {this.state.opponents && (
            <h2>
              {this.state.opponents.map((player, index) => {
                return (
                  <strong>
                    {index == 0
                      ? player +
                        (this.state.currentUser === player ? " (You)" : "") +
                        " VS "
                      : player +
                        (this.state.currentUser === player ? "You" : "")}
                  </strong>
                );
              })}
            </h2>
          )}
          <Grid
            item
            xs={12}
            style={{
              minHeight: "600px",
              maxHeight: "600px",
              minWidth: "600px",
              maxWidth: "600px"
            }}
          >
            {this.createBoard()}
          </Grid>
        </Grid>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}

export default Game;
