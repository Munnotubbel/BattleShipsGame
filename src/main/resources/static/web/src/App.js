import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "./NavBar";
import Games from "./Games";
import Game_view from "./Game_view";
import Ranking from "./Ranking";
import Login from "./Login";
import SignUp from "./SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, HashRouter } from "react-router-dom";
import "./Water.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ThemeContextProvider from "./ThemeContext";
import { ThemeContext } from "./ThemeContext";

export default class App extends Component {
  static contextType = ThemeContext;
  state = {
    title: "Battleship Game",
    players: []
  };

  gamePicked = () => {
    console.log("SCHABBER SCHABBER SCHABBER SCHABBER");
    return <Game_view changetitle={this.updateTitle} />;
  };

  updateTitle = title => {
    this.setState({ title: title });
  };

  render() {
    return (
      <div>
        <HashRouter>
          <ThemeContextProvider>
            <NavBar gameCreated={this.gamePicked} title={this.state.title} />

            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "20px" }}
            >
              <Route exact path="/" component={Games} />
              <Route path="/web/games" component={Games} />

              <Route path="/web/game_view" component={this.gamePicked} />

              <Route path="/web/game" component={Game_view} />

              <Route path="/web/ranking" component={Ranking} />
              <Route path="/web/login" component={Login} />
              <Route path="/web/signup" component={SignUp} />
            </Grid>
          </ThemeContextProvider>
        </HashRouter>
        <div className="background">
          <div className="water"> </div>{" "}
        </div>
        <svg>
          <filter id="turbulence" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              id="sea-filter"
              numOctaves="4"
              seed="4"
              baseFrequency="0.05 0.1"
            ></feTurbulence>
            <feDisplacementMap
              scale="10"
              in="SourceGraphic"
            ></feDisplacementMap>
            <animate
              xlinkHref="#sea-filter"
              attributeName="baseFrequency"
              dur="60s"
              keyTimes="0;0.5;1"
              values="0.03 0.08; 0.05 0.1; 0.03 0.08"
              repeatCount="indefinite"
            ></animate>
          </filter>
        </svg>
      </div>
    );
  }
}
