import React, { createContext, Component } from "react";
import { withRouter } from "react-router-dom";
export const InfoContext = createContext();

class InfoContextProvider extends Component {
  state = {
    battleship: {},
    cruiseShip: {},
    destroyer: {},
    EnAtmTurn: null,
    enemyName: null,
    fleetInPosition: false,
    gameOver: false,
    gameResult: "",
    gmId: 1,
    logged: null,
    myHits: [],
    myShip1: null,
    myShip2: null,
    myShip3: null,
    myShip4: null,
    pull: false,
    ranking: null,
    rotate: "horizontal",
    round: 0,
    selfCanFire: false,
    shipLog: [],
    shipLogTemp: [],
    shipsPlaced: false,
    shipsToPlace: { ship1: true, ship2: false, ship3: false, ship4: false },
    shots: [],
    shotsTemp: [],
    submarine: {},
    sunk: [],
    timeOut: null,
    turnTimer: null
  };

  constructor() {
    super();
    this.interval = setInterval(this.getGameInfo, 5000);
  }

  componentDidMount() {
    this.getGameInfo();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateValue = (key, val) => {
    this.setState({ [key]: val });
  };

  //-----------------------------------------------------------------Games List
  fetchGames = () => {
    fetch(`api/games`)
      .then(response => response.json())
      .then(response =>
        this.setState({ ...response }, () => {
          if (response.loggedPly !== this.context.logged) {
            this.setState({ logged: response.loggedPly });
          }
        })
      );
  };

  //-----------------------------------------------------------------Game View
  fetchGameView = () => {
    fetch(`api/game_view/${this.state.gmId}`)
      .then(response =>
        response.status !== 401 ? response.json() : this.props.history.goBack()
      )
      .then(response => {
        if (response) {
          const hits = [];
          const myAttacks = [];
          const myShipLocations = [];
          const shipTypes = [];
          let enemyName = null;
          var battleship;
          var cruiseShip;
          var destroyer;
          var submarine;

          response.ships &&
            response.ships.forEach(element => {
              if (element.ShipType === "Submarine") {
                submarine = element;
              } else if (element.ShipType === "Destroyer") {
                destroyer = element;
              } else if (element.ShipType === "Cruise Ship") {
                cruiseShip = element;
              } else if (element.ShipType === "Battleship") {
                battleship = element;
              }

              shipTypes.push(element.ShipType);
              for (var i = 0; i < element.location.length; i++) {
                myShipLocations.push(element.location[i]);
              }
            });

          response.attacks &&
            response.attacks.forEach(element => {
              for (var i = 0; i < element.attackLocations.length; i++) {
                myAttacks.push(element.attackLocations[i]);
              }
            });

          response.EnAttacks &&
            response.EnAttacks.forEach(element => {
              for (var i = 0; i < element.attackLocations.length; i++) {
                hits.push(element.attackLocations[i]);
              }
            });

          response.EnPlayer && (enemyName = response.EnPlayer.name);

          this.setState(
            {
              attacks: myAttacks,
              battleship: battleship,
              cruiseShip: cruiseShip,
              destroyer: destroyer,
              enemyName: enemyName,
              EnAtmTurn: response.EnAtmTurn,
              gameName: response.gmName,
              gameOver: response.gameOver ? response.gameOver : false,
              gameResult: response.gameResult ? response.gameResult : "",
              hitMyShip: response.EnHits ? response.EnHits : [],
              hits: hits,
              locations: myShipLocations,
              myHits: response.myHits ? response.myHits : [],
              myName: response.player ? response.player.name : "",
              responstStatus: response.status,
              round: response.turnInfo ? response.turnInfo.round : 1,
              selfCanFire: response.turnInfo
                ? response.turnInfo.selfCanFire
                : false,
              shipLog: [],
              shipLogTemp: [],
              shipsPlaced: response.shipsPlaced,
              shipTypes: shipTypes,
              submarine: submarine,
              sunk: response.sunk ? response.sunk : null,
              timeOut: response.timeOut ? response.timeOut : null,
              turnTimer: response.turnTimer && response.turnTimer
            },
            () => {
              if (response.shipsPlaced === false) {
                this.setState({
                  fleetInPosition: false,
                  shipsToPlace: { ship1: true }
                });
              } else {
                this.setState({
                  fleetInPosition: false,
                  shipsToPlace: { ship1: false }
                });
              }

              if (response.logged !== this.state.logged) {
                this.setState({ logged: response.logged });
              }
            }
          );
        }
      });
  };

  getGameInfo = async () => {
    if (this.state.pull === true) {
      fetch(`/api/game_view/${this.state.gmId}/checkNext`) // Any output from the script will go to the "result" div
        .then(response => response.json())
        .then(response => {
          if (response.gameResult === "it's a tie") {
            this.setState({ pull: false, gameOver: true }, () =>
              this.fetchGameView()
            );
          }
          if (
            this.state.round !== response.round ||
            this.state.gameOver !== response.gameOver ||
            this.state.selfCanFire !== response.selfCanFire ||
            this.state.gameResult !== response.gameResult ||
            this.state.gameResult !== response.EnAtmTurn ||
            this.state.enemyName !== response.enemyName
          ) {
            this.setState(
              {
                enemyName: response.enemyName,
                EnAtmTurn: response.EnAtmTurn,
                gameOver: response.gameOver,
                gameResult: response.gameResult,
                round: response.round,
                selfCanFire: response.selfCanFire,
                turnTimer: response.turnTimer && response.turnTimer
              },
              () => {
                console.log("POLL!!");
                console.log(this.state);
              }
            );
          }
        })
        .catch(error => console.log(error));
    }
  };
  //-----------------------------------------------------------------Game View - Ship functions

  checkValid = arr => {
    const unvalid = [
      111,
      211,
      311,
      411,
      511,
      611,
      711,
      811,
      911,
      1011,
      1101,
      1102,
      1103,
      1104,
      1105,
      1106,
      1107,
      1108,
      1109,
      1110
    ];

    const check1 = unvalid.filter(element => arr.includes(element));
    const check2 = this.state.shipLog.filter(element => arr.includes(element));
    const checkboth = check1.concat(check2);

    if (checkboth.length === 0) {
      return true;
    }
  };

  placeAgain = () => {
    this.setState({
      fleetInPosition: false,
      shipLog: [],
      shipLogTemp: [],
      shipsToPlace: { ship1: true, ship2: false }
    });
  };

  rotateShip = direction => {
    this.setState({ rotate: direction }, () => {
      console.log(direction);
      this.putShip(this.state.shipLogTemp[0]);
    });
  };

  putShip = cellKey => {
    if (this.state.shipsPlaced === false) {
      if (this.state.shipsToPlace.ship1 === true) {
        console.log("ship 1");
        const locations = [];

        if (this.state.rotate === "horizontal") {
          locations.push(cellKey, cellKey + 1);

          if (this.checkValid(locations) === true) {
            this.setState({
              myShip1: {
                locations: locations,
                shipType: "Submarine",
                horizontal: true
              },
              shipLogTemp: [...locations]
            });
          } else {
            alert("invalid position");
          }
        } else {
          locations.push(cellKey, cellKey + 100);
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip1: {
                locations: locations,
                shipType: "Submarine",
                horizontal: false
              },
              shipLogTemp: [...locations]
            });
          } else {
            alert("invalid position");
          }
        }
      } else if (this.state.shipsToPlace.ship2 === true) {
        console.log("ship 2");
        const locations = [];
        if (this.state.rotate === "horizontal") {
          locations.push(cellKey, cellKey + 1, cellKey + 2);
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip2: {
                locations: locations,
                shipType: "Destroyer",
                horizontal: true
              },
              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        } else {
          locations.push(cellKey, cellKey + 100, cellKey + 200);
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip2: {
                locations: locations,
                shipType: "Destroyer",
                horizontal: false
              },
              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        }
      } else if (this.state.shipsToPlace.ship3 === true) {
        console.log("ship 3");
        const locations = [];
        if (this.state.rotate === "horizontal") {
          locations.push(cellKey, cellKey + 1, cellKey + 2, cellKey + 3);
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip3: {
                locations: locations,
                shipType: "Cruise Ship",
                horizontal: true
              },

              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        } else {
          locations.push(cellKey, cellKey + 100, cellKey + 200, cellKey + 300);
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip3: {
                locations: locations,
                shipType: "Cruise Ship",
                horizontal: false
              },

              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        }
      } else if (this.state.shipsToPlace.ship4 === true) {
        console.log("ship 4");
        const locations = [];
        if (this.state.rotate === "horizontal") {
          locations.push(
            cellKey,
            cellKey + 1,
            cellKey + 2,
            cellKey + 3,
            cellKey + 4
          );
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip4: {
                locations: locations,
                shipType: "Battleship",
                horizontal: true
              },
              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        } else {
          locations.push(
            cellKey,
            cellKey + 100,
            cellKey + 200,
            cellKey + 300,
            cellKey + 400
          );
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip4: {
                locations: locations,
                shipType: "Battleship",
                horizontal: false
              },
              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        }
      }
    }
    console.log(this.state.shipLogTemp);
  };

  placeShip = number => {
    switch (number) {
      case 1:
        if (this.state.shipLogTemp.length === 2) {
          this.setState({
            shipsToPlace: { ship1: false, ship2: true },
            shipLog: [...this.state.shipLog, ...this.state.shipLogTemp]
          });
        } else {
          alert("place first ship");
        }
        break;

      case 2:
        if (this.state.shipLogTemp.length === 3) {
          this.setState({
            shipsToPlace: { ship2: false, ship3: true },
            shipLog: [...this.state.shipLog, ...this.state.shipLogTemp]
          });
        } else {
          alert("place second ship");
        }
        break;

      case 3:
        if (this.state.shipLogTemp.length === 4) {
          this.setState({
            shipsToPlace: { ship3: false, ship4: true },
            shipLog: [...this.state.shipLog, ...this.state.shipLogTemp]
          });
        } else {
          alert("place third ship");
        }
        break;

      case 4:
        if (this.state.shipLogTemp.length === 5) {
          this.setState({
            shipsToPlace: { ship4: false },
            fleetInPosition: true,
            shipLog: [...this.state.shipLog, ...this.state.shipLogTemp]
          });
        } else {
          alert("place fourth ship");
        }
        break;

      default:
        break;
    }
  };

  postShips = () => {
    const post = [
      this.state.myShip1,
      this.state.myShip2,
      this.state.myShip3,
      this.state.myShip4
    ];

    console.log(JSON.stringify(post));
    fetch(`/api/game_view/${this.state.gmId}/ships`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          this.fetchGameView();
          return response.json();
        }
      })
      .catch(err => console.log("err", err));
  };

  //-----------------------------------------------------------------Game View - Attack functions

  handleShot = cellKey => {
    fetch(`/api/game_view/${this.state.gmId}/checkNext`)
      .then(response => response.json())
      .then(response => {
        if (response.selfCanFire === true && response.gameOver === false) {
          const location = [];
          if (this.state.shipsPlaced === true && this.state.shots.length < 3) {
            location.push(cellKey);
            this.setState({ shots: [...this.state.shots, ...location] }, () => {
              if (this.state.shots.length === 3) {
                this.setState({ shotsPlaced: true });
              }
            });
          }
        } else if (
          response.selfCanFire === false &&
          response.EnCanFire === true
        ) {
          alert("wait for your opponent");
          this.setState({
            round: response.round,
            gameOver: response.gameOver,
            gameResult: response.gameResult ? response.gameResult : ""
          });
        } else {
          this.setState({
            round: response.round,
            gameOver: response.gameOver,
            gameResult: response.gameResult ? response.gameResult : ""
          });
        }
      });
  };

  resetShot = () => {
    this.setState({ shots: [], shotsPlaced: false });
  };

  postShots = () => {
    fetch(`/api/game_view/${this.state.gmId}/checkNext`)
      .then(response => response.json())
      .then(response => {
        if (
          response.selfCanFire === true &&
          response.myAtmTurn <= response.EnAtmTurn &&
          response.gameOver === false
        ) {
          const attacks = [
            { turn: response.myAtmTurn, attackLocations: this.state.shots }
          ];

          fetch(`/api/game_view/${this.state.gmId}/attacks`, {
            method: "POST",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(attacks)
          })
            .then(response => {
              console.log(response);
              if (response.status === 201) {
                this.setState({ shots: [], shotsPlaced: false }, () =>
                  this.fetchGameView()
                );
                return response.json();
              }
            })
            .catch(err => console.log("err", err));
        } else if (response.gameOver === true) {
          this.fetchGameView();
        } else {
          alert("wait for opponent");
          this.setState({ selfCanFire: response.selfCanFire }, () =>
            this.fetchGameView()
          );
        }
      });
  };

  //-----------------------------------------------------------------Leaderboard functions
  fetchRanking = () => {
    console.log("rating fetch");
    fetch(`api/ranking`)
      .then(response => response.json())
      .then(response => this.setState({ ranking: response }));
  };

  //-----------------------------------------------------------------logout
  logOut = () => {
    fetch("/api/logout", {
      method: "POST"
    }).then(response => {
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.log("something went wrong");
      }
    });
  };

  // lookForGame = () => {
  //   fetch("/api/lookForGame", {
  //     method: "POST"
  //   })
  //     .then(response => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then(res => {
  //       if (res.gameId) {
  //         this.updateValue("gmId", res.gameId);
  //         this.props.history.push("/web/game_view");
  //       } else {
  //         this.setState({overlayTrigger: true});
  //       }
  //     });
  // };

  render() {
    return (
      <InfoContext.Provider
        value={{
          ...this.state,
          fetchGames: this.fetchGames,
          fetchGameView: this.fetchGameView,
          fetchRanking: this.fetchRanking,
          handleShot: this.handleShot,
          logOut: this.logOut,
          placeAgain: this.placeAgain,
          placeShip: this.placeShip,
          postShips: this.postShips,
          postShots: this.postShots,
          putShip: this.putShip,
          resetShot: this.resetShot,
          rotateShip: this.rotateShip,
          updateValue: this.updateValue
        }}
      >
        {this.props.children}
      </InfoContext.Provider>
    );
  }
}

export default withRouter(InfoContextProvider);
