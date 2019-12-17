import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Games from "./Games";
import Game_view from "./Game_view";
import Ranking from "./Ranking";
import Login from "./Login";
import SignUp from "./SignUp";
import { withStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Route, HashRouter, NavLink } from "react-router-dom";
import Players from "./Players";
import "./Water.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
export default class App extends Component {
  state = {
    title: "Battleship Game",
    players: []
  };
  gamePlayerPicked = props => {
    if (props.location) {
      this.state.gamePlayer = props.location.gamePlayer;
      this.state.game = props.location.game;
    }
    return (
      <Game_view
        gamePlayer={this.state.gamePlayer.gmPlyId}
        game={this.state.game.gmId}
        changetitle={this.updateTitle}
      />
    );
  };

  updateTitle = title => {
    this.setState({ title: title });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <HashRouter>
          <NavBar title={this.state.title} />

          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <Route exact path="/" component={Games} />
            <Route path="/web/games" component={Games} />
            <Route path="/web/game_view" component={this.gamePlayerPicked} />
            <Route path="/web/game" component={Game_view} />
            <Route path="/web/ranking" component={Ranking} />
            <Route path="/web/login" component={Login} />
            <Route path="/web/signup" component={SignUp} />
          </Grid>
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
