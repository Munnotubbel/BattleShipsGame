import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "../routes/navbar/NavBar";
import Games from "../routes/games/Games";
import GameView from "../routes/game_view/GameView";
import Ranking from "../routes/ranking/Ranking";
import Login from "../routes/navbar/Login";
import SignUp from "../routes/navbar/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/App.css";
import { Route, HashRouter } from "react-router-dom";
import "../../css/Water.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import InfoContextProvider from "../../InfoContext";
import { InfoContext } from "../../InfoContext";


class App extends Component {
  static contextType = InfoContext;
 

  render() {
    return (
      <div>
        <HashRouter>
          <InfoContextProvider>
            <NavBar gameCreated={()=>{return <GameView/>}}/>

            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "20px" }}
            >
              <Route exact path="/" component={Games} />
              <Route path="/web/games" component={Games} />

              <Route path="/web/game_view" component={GameView} />

              <Route path="/web/game" component={GameView} />

              <Route path="/web/ranking" component={Ranking} />
              <Route path="/web/login" component={Login} />
              <Route path="/web/signup" component={SignUp} />
             
            </Grid>
          </InfoContextProvider>
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


export default App