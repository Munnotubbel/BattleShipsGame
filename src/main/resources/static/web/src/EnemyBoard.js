import React from "react";
import Grid from "@material-ui/core/Grid";
import Hitpoints from "./Hitpoints";
import "./Water.css"

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
                className="gridBoardCell"
                value={cellKey}
                xs={1}
                align="center"
                style={{
                  backgroundColor: "red",
                  paddingTop: "1px",
                  border: "1px solid black",
            
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
                className="gridBoardCell"
                value={cellKey}
                xs={1}
                align="center"
                style={{
                  backgroundColor: "gray",
                  paddingTop: "1px",
                  border: "1px solid black",
              
                }}
              ></Grid>
            );
          }
        } else if (props.myMiss.includes(cellKey)) {
          {
            enemyChildren.push(
              <Grid
                item
                className="gridBoardCell"
                value={cellKey}
                xs={1}
                align="center"
                style={{
                  backgroundColor: "blue",
                  paddingTop: "1px",
                  border: "1px solid black",
           
                }}
              ></Grid>
            );
          }
        } else {
          enemyChildren.push(
            <Grid
              item
              className="gridBoardCell"
              xs={1}
              align="center"
              style={{
                paddingTop: "1px",
                border: "1px solid black",
           
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

 
    return (
        <Grid>
        <strong>my Board</strong>
      {props.myHits && <div className="healthBarEnemy"><Hitpoints  dmg={props.myHits.length}/></div>}
      <Grid className="background gridBoardContainer LowerEnemy">
        <Grid className="water gridBoardContainer" style={{
         
        }}> </Grid> <svg>
          <filter id="turbulence" x="0" y="0" width="100%" height="100%">
  <feTurbulence id="sea-filter" numOctaves="3" seed="2" baseFrequency="0.03 0.08">
      </feTurbulence>
      <feDisplacementMap scale="10" in="SourceGraphic"></feDisplacementMap>
      <animate xlinkHref="#sea-filter" attributeName="baseFrequency" dur="60s"
     keyTimes="0;0.5;1" values="0.02 0.06; 0.04 0.08; 0.02 0.06" repeatCount="indefinite">
      </animate>
      </filter>
      </svg>
      <Grid
        item
        className="gridBoardContainer boardContainerTop"
        align="center"
        
        style={{
            
          position: "absolute",
          top: 0,
          left: 0,
         
        }}
      >     
    
        {createEnemyBoard()}
      </Grid>
    
      </Grid></Grid>
    );
  }