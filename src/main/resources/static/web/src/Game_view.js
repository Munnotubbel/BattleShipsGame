import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { responsiveFontSizes } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class Game extends Component {
  state = {
    ships: [
      { shipLocations: ["A1", "A2"], ShipType: "Submarine" },
      { shipLocations: ["B3", "B4", "B5"], ShipType: "Destroyer" },
      { shipLocations: ["C6", "C7", "C8", "C9"], ShipType: "Cruise Ship" },
      { shipLocations: ["D5", "D4", "D3", "D2", "D1"], ShipType: "Battleship" }
    ]
  };
  componentDidMount = () => {
    this.setState({ gamePlayerId: this.props.gamePlayer }, () => {
      this.fetchData();
    });
  };
  fetchData = () => {
    fetch(`api/game_view/${this.state.gamePlayerId}`)
      .then(response =>
        response.status !== 401 ? response.json() : this.props.history.goBack()
      )
      .then(response => {
        console.log(response);
        if (response) {
          const myShipLocations = [];
          const myAttacks = [];
          const hits = [];

          response.ships.forEach(element => {
            for (var i = 0; i < element.location.length; i++) {
              myShipLocations.push(element.location[i]);
            }
          });
          response.attacks.forEach(element => {
            for (var i = 0; i < element.attackLocations.length; i++) {
              myAttacks.push(element.attackLocations[i]);
            }
          });
          response.EnAttacks.forEach(element => {
            for (var i = 0; i < element.attackLocations.length; i++) {
              hits.push(element.attackLocations[i]);
            }
          });
          this.setState({
            responstStatus: response.status,
            gameName: response.gmName,
            enemyName: response.EnPlayer.name,
            myName: response.player.name,
            locations: myShipLocations,
            attacks: myAttacks,
            hits: hits
          });
        }
      });
  };

  postShips = () => {
    console.log(JSON.stringify(this.state.ships));
    fetch(`/api/game_view/${this.props.gamePlayer}/ships`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify([
        { shipLocations: ["A1", "A2"], ShipType: "Submarine" },
        { shipLocations: ["B3", "B4", "B5"], ShipType: "Destroyer" },
        { shipLocations: ["C6", "C7", "C8", "C9"], ShipType: "Cruise Ship" },
        {
          shipLocations: ["D5", "D4", "D3", "D2", "D1"],
          ShipType: "Battleship"
        }
      ])
    })
      .then(response => {
        if (response.status == 201) {
          return response.json();
        } else {
          alert("ships exist");
        }
      })
      .catch(err => console.log("err", err));
  };

  createOwnBoard = () => {
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
        let cellKey = rowKey + j;
        if (
          this.state.locations.includes(cellKey) &&
          this.state.hits.includes(cellKey)
        ) {
          {
            children.push(
              <Grid
                item
                item
                xs={1}
                align="center"
                style={{
                  backgroundColor: "darkred",
                  paddingTop: "1px",
                  border: "1px solid black",
                  minHeight: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  maxWidth: "30px"
                }}
              >
                <strong>X</strong>
              </Grid>
            );
          }
        } else if (this.state.locations.includes(cellKey)) {
          {
            children.push(
              <Grid
                item
                item
                xs={1}
                align="center"
                style={{
                  backgroundColor: "yellow",
                  paddingTop: "1px",
                  border: "1px solid black",
                  minHeight: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  maxWidth: "30px"
                }}
              >
                {cellKey}
              </Grid>
            );
          }
        } else if (this.state.hits.includes(cellKey)) {
          {
            children.push(
              <Grid
                item
                item
                xs={1}
                align="center"
                style={{
                  backgroundColor: "orange",
                  paddingTop: "1px",
                  border: "1px solid black",
                  minHeight: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  maxWidth: "30px"
                }}
              >
                {cellKey}
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
                paddingTop: "1px",
                border: "1px solid black",
                minHeight: "30px",
                maxHeight: "30px",
                minWidth: "30px",
                maxWidth: "30px"
              }}
            >
              {cellKey}
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

  createEnemyBoard = () => {
    let enemyBoard = [];

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
      let enemyChildren = [];
      //Inner loop to create children
      for (let j = 1; j <= 10; j++) {
        let cellKey = rowKey + j;
        if (this.state.attacks.includes(cellKey)) {
          {
            enemyChildren.push(
              <Grid
                item
                item
                xs={1}
                align="center"
                style={{
                  backgroundColor: "red",
                  paddingTop: "1px",
                  border: "1px solid black",
                  minHeight: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  maxWidth: "30px"
                }}
              >
                {cellKey}
              </Grid>
            );
          }
        } else {
          enemyChildren.push(
            <Grid
              item
              item
              xs={1}
              align="center"
              style={{
                paddingTop: "1px",
                border: "1px solid black",
                minHeight: "30px",
                maxHeight: "30px",
                minWidth: "30px",
                maxWidth: "30px"
              }}
            >
              {rowKey + j}
            </Grid>
          );
        }
      }
      //Create the parent and add the children
      enemyBoard.push(
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          flexWrap="nowrap"
        >
          {enemyChildren}
        </Grid>
      );
    }
    return enemyBoard;
  };
  render() {
    this.state.responstStatus && console.log(this.state.responstStatus);
    this.state.attacks && console.log(this.state.attacks);
    this.state.locations && console.log(this.state.locations);

    if (this.state.responstStatus == 401) {
      this.props.history.goBack();
    } else {
      if (this.state.locations && this.state.attacks) {
        return (
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} align="center">
              <h2>
                {this.state.myName} (You) VS {this.state.enemyName}
              </h2>
            </Grid>
            <Grid>
              <button onClick={this.postShips}>post ships</button>
            </Grid>
            <Grid
              item
              align="center"
              xs={5}
              style={{
                minHeight: "300px",
                maxHeight: "300px",
                minWidth: "300px",
                maxWidth: "300px",
                marginRight: "20px"
              }}
            >
              <strong>my Board</strong>
              {this.createOwnBoard()}
            </Grid>

            <Grid
              item
              align="center"
              xs={5}
              style={{
                minHeight: "300px",
                maxHeight: "300px",
                minWidth: "300px",
                maxWidth: "300px",
                marginLeft: "20px"
              }}
            >
              <strong>enemy Board</strong>
              {this.createEnemyBoard()}
            </Grid>
          </Grid>
        );
      } else {
        return <h1>...loading</h1>;
      }
    }
  }
}

export default withRouter(Game);
