import React from "react";
import Grid from "@material-ui/core/Grid";
import Hitpoints from "./Hitpoints";
import "./Boards.css"

export default function EnemyBoard(props) {
  function createEnemyBoard() {
    let enemyBoard = [];

    for (let i = 100; i < 1001; i += 100) {
      let enemyChildren = [];

      for (let j = 1; j < 11; j++) {
        let cellKey = i + j;
        if (props.myHits.includes(cellKey)) {
          {
            enemyChildren.push(
              <Grid
                item
                className="allCells"
                value={cellKey}
                xs={1}
                align="center"
                style={{
                  backgroundColor: "red",
              
                }}
              >
                <strong>X</strong>
              </Grid>
            );
          }
        } else if (props.myShots.includes(cellKey)) {
          {
            enemyChildren.push(
              <Grid
                item
                className="allCells"
                value={cellKey}
                xs={1}
                align="center"
                style={{
                  backgroundColor: "gray",
              
                }}
              ></Grid>
            );
          }
        } else if (props.myMiss.includes(cellKey)) {
          {
            enemyChildren.push(
             <Grid
                item
                className="allCells"
                value={cellKey}
                xs={1}
                align="center"
                
              >
              <img className="bojeRed wiggle" src="https://res.cloudinary.com/munnotubbel/image/upload/v1576514944/javaProject/boje-removebg-preview-removebg-preview_acxmc4.png" ></img>
              </Grid>
            );
          }
        } else {
          enemyChildren.push(
            <Grid
              item
              className="allCells"
              xs={1}
              align="center"
              style={{
                paddingTop: "1px",
             
              }}
              onClick={() => props.fireInTheHole(cellKey)}
            ></Grid>
          );
        }
      }

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
  }

  return (<Grid item style={{marginLeft:"20px"}}>
       <strong>enemy Board</strong>
      {props.myHits && <Hitpoints dmg={props.myHits.length} />}
    <Grid
      item
      className="boardContainer"
      align="center"
      xs={5}

    >
     
      {createEnemyBoard()}
    </Grid></Grid>
  );
}
