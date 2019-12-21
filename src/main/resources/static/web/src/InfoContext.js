import React, { createContext, Component } from "react";

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

  render() {
    return (
      <InfoContext.Provider
        value={{ ...this.state, updateValue: this.updateValue }}
      >
        {this.props.children}
      </InfoContext.Provider>
    );
  }
}

export default InfoContextProvider;
