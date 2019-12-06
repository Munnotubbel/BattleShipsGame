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
import Game from "./Game_view";
import { withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { Route, HashRouter, NavLink } from "react-router-dom";
import Players from "./Players";
export default class App extends Component {
  state = {
    players: []
  };

  render() {
    return (
      <HashRouter>
        <div style={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <NavBar />
              <Typography variant="h6">Battleships</Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Route exact path="/" component={Players} />
          <Route path="/web/games" component={Games} />
          <Route path="/web/game" component={Game} />
        </Grid>
      </HashRouter>
    );
  }
}
