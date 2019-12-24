import React, { createContext, Component } from "react";
import { withRouter } from "react-router-dom";
export const InfoContext = createContext();

class InfoContextProvider extends Component {
  state = {
    selfCanFire: false,
    gameOver: false,
    gameResult: "",
    myHits: [],
    shotsTemp: [],
    shots: [],
    rotate: "horizontal",
    fleetInPosition: false,
    shipLog: [],
    shipLogTemp: [],
    shipsPlaced: false,
    shipsToPlace: { ship1: true, ship2: false, ship3: false, ship4: false },
    myShip1: null,
    myShip2: null,
    myShip3: null,
    myShip4: null,
    gmId: 1,
    logged: null,
    pull: false
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

  getGameInfo = async () => {
    if (this.state.pull === true) {
      fetch(`/api/game_view/${this.state.gmId}/checkNext`) // Any output from the script will go to the "result" div
        .then(response => response.json())
        .then(response =>
          this.setState(
            {
              round: response.round,
              gameOver: response.gameOver,
              gameResult: response.gameResult,
              selfCanFire: response.selfCanFire
            },
            () => {
              console.log("POLL!!");
              console.log(this.state);
            }
          )
        )
        .catch(error => console.log(error));
    }
  };

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

  fetchGameView = () => {
    fetch(`api/game_view/${this.state.gmId}`)
      .then(response =>
        response.status !== 401 ? response.json() : this.props.history.goBack()
      )
      .then(response => {
        if (response) {
          const myShipLocations = [];
          const myAttacks = [];
          const hits = [];
          let enemyName = null;
          const shipTypes = [];

          response.ships &&
            response.ships.forEach(element => {
              shipTypes.push(element.shipType);
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
              gameOver: response.gameOver ? response.gameOver : false,
              gameResult: response.gameResult ? response.gameResult : "",
              myHits: response.myHits ? response.myHits : [],
              responstStatus: response.status,
              gameName: response.gmName,
              enemyName: enemyName,
              myName: response.player ? response.player.name : "",
              locations: myShipLocations,
              attacks: myAttacks,
              hits: hits,
              hitMyShip: response.EnHits ? response.EnHits : [],
              shipTypes: shipTypes,
              round: response.turnInfo ? response.turnInfo.round : 1,
              selfCanFire: response.turnInfo
                ? response.turnInfo.selfCanFire
                : false,
                shipLog: [],
      shipLogTemp: []
            },
            () => {if(this.state.locations.length===0){
              this.setState({
                shipsPlaced: false,
                fleetInPosition: false,
                shipsToPlace: { ship1: true }
              });
            }
              this.state.locations[1] &&
                this.setState({
                  shipsPlaced: true,
                  fleetInPosition: false,
                  shipsToPlace: { ship1: false }
                });
              if (response.logged !== this.state.logged) {
            
                this.setState({logged: response.logged});
              }
            }
          );
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


  fetchGames = () => {   
    fetch(`api/games`)
      .then(response => response.json())
      .then(response =>
        this.setState({ ...response }, () => {
          if (response.loggedPly !== this.context.logged) {
            this.setState({logged: response.loggedPly});
          }
        })
      );
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
              myShip1: { locations: locations, shipType: "Submarine" },
              shipLogTemp: [...locations]
            });
          } else {
            alert("invalid position");
          }
        } else {
          locations.push(cellKey, cellKey + 100);
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip1: { locations: locations, shipType: "Submarine" },
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
              myShip2: { locations: locations, shipType: "Destroyer" },
              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        } else {
          locations.push(cellKey, cellKey + 100, cellKey + 200);
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip2: { locations: locations, shipType: "Destroyer" },
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
              myShip3: { locations: locations, shipType: "Cruise Ship" },

              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        } else {
          locations.push(cellKey, cellKey + 100, cellKey + 200, cellKey + 300);
          if (this.checkValid(locations) === true) {
            this.setState({
              myShip3: { locations: locations, shipType: "Cruise Ship" },

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
              myShip4: { locations: locations, shipType: "Battleship" },
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
              myShip4: { locations: locations, shipType: "Battleship" },
              shipLogTemp: [...locations]
            });
          } else {
            alert("unvalid position");
          }
        }
      }
    }
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
          this.setState({ shipsPlaced: true }, () => this.fetchGameView());
          return response.json();
        }
      })
      .catch(err => console.log("err", err));
  };

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
      shipsToPlace: { ship1: true, ship2: false },
      fleetInPosition: false,
      shipLog: [],
      shipLogTemp: []
    });
  };


  rotate = direction => {
    this.setState({ rotate: direction }, () => {
      console.log(direction);
    });
  };



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




  render() {
    return (
      <InfoContext.Provider
        value={{ ...this.state,
         updateValue: this.updateValue, 
         logOut: this.logOut, 
         fetchGames: this.fetchGames, 
         fetchGameView: this.fetchGameView, 
         putShip: this.putShip, 
         rotate: this.rotate,
         placeShip:this.placeShip,
         placeAgain:this.placeAgain, 
         postShips: this.postShips,
         handleShot: this.handleShot,
         resetShot: this.resetShot,
         postShots: this.postShots
         }}

      >
        {this.props.children}
      </InfoContext.Provider>
    );
  }
}

export default withRouter(InfoContextProvider);
