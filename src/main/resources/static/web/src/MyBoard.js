import React from "react";
import Grid from "@material-ui/core/Grid";
import Hitpoints from "./Hitpoints";
import "./Water.css"

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
                item
                xs={1}
                align="center"
                style={{
                  backgroundColor: "darkred",
                  paddingTop: "1px",
                  border: "1px solid black",
                  minHeight: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  maxWidth: "30px"
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
                item
                xs={1}
                align="center"
                style={{
                  backgroundColor: "yellow",
                  paddingTop: "1px",
                  border: "1px solid black",
                  minHeight: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  maxWidth: "30px"
                }}
              ></Grid>
            );
          }
        } else if (props.enShots.includes(cellKey)) {
          {
            children.push(
              <Grid
                item
                value={cellKey}
                xs={1}
                align="center"
                style={{
                  backgroundColor: "orange",
                  paddingTop: "1px",
                  border: "1px solid black",
                  minHeight: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  maxWidth: "30px"
                }}
              ></Grid>
            );
          }
        } else {
          children.push(
            <Grid
              item
              value={cellKey}
              xs={1}
              align="center"
              style={{
                paddingTop: "1px",
                border: "1px solid black",
                minHeight: "30px",
                maxHeight: "30px",
                minWidth: "30px",
                maxWidth: "30px"
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
      <Grid>
           <strong>my Board</strong>
    {props.enHits && <Hitpoints dmg={props.enHits.length} />}

    <Grid
      item
      className="waterBackground"
      align="center"
      xs={5}
      style={{
        minHeight: "300px",
        maxHeight: "300px",
        minWidth: "300px",
        maxWidth: "300px",
        marginRight: "20px"
      }}
    >
     
    
      {createOwnBoard()}
    </Grid></Grid>
  );
}
