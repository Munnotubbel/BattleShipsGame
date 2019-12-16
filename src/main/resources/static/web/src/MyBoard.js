import React from "react";
import Grid from "@material-ui/core/Grid";
import Hitpoints from "./Hitpoints";
import "./Water.css"
import "./Boards.css"

export default function MyBoard(props) {
  function createOwnBoard() {
    let board = [];

    // Outer loop to create parent
    for (let i = 100; i < 1001; i += 100) {
      let children = [];
      //Inner loop to create children
      for (let j = 1; j < 11; j++) {
        let cellKey = j + i;

        if (props.enHits.includes(cellKey)) {
          {
            children.push(
              <Grid
                item
                className="allCells"
                xs={1}
                align="center"
                style={{
                  backgroundColor: "darkred"           
                }}
              >
                <strong>X</strong>
              </Grid>
            );
          }
        } else if (
          props.myShipLocations.includes(cellKey) ||
          props.placedShips.includes(cellKey) ||
          props.placedShipsTemp.includes(cellKey)
        ) {
          {
            children.push(
              <Grid
                item
                className="allCells"
                xs={1}
                align="center"
                style={{
                  backgroundColor: "yellow",
                     }}
              ></Grid>
            );
          }
        } else if (props.enShots.includes(cellKey)) {
          {
            children.push(
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
          children.push(
            <Grid
              item
              className="allCells"
              value={cellKey}
              xs={1}
              align="center"
              style={{
                paddingTop: "1px",
               
              }}
              onClick={() => props.putShip(cellKey)}
            ></Grid>
          );
        }
      }
      //Create the parent and add the children
      board.push(
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          flexWrap="nowrap"
        >
          {children}
        </Grid>
      );
    }
    return board;
  }

  return (
      <Grid item style={{marginRight:"20px"}}>
           <strong>my Board</strong>
    {props.enHits && <Hitpoints dmg={props.enHits.length} />}

    <Grid
      item
      className="boardContainer"
      align="center"
      xs={5}  
    >
     
    
      {createOwnBoard()}
    </Grid></Grid>
  );
}
