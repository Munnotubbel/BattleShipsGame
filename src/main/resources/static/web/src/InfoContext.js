import React, { createContext, Component } from "react";
import { withRouter } from "react-router-dom";
export const InfoContext = createContext();

class InfoContextProvider extends Component {
  state = {
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




  render() {
    return (
      <InfoContext.Provider
        value={{ ...this.state, updateValue: this.updateValue, logOut: this.logOut, fetchGames: this.fetchGames}}
      >
        {this.props.children}
      </InfoContext.Provider>
    );
  }
}

export default withRouter(InfoContextProvider);
