import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { responsiveFontSizes } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class Game extends Component {
  state = {
    rotate: "horizontal",
    fleetInPosition: false,
    shipLog:{ship1:[],ship2:[],ship3:[],ship4:[],},
    boardCol: [1,2,3,4,5,6,7,8,9,10],
    boardRow: [100,200,300,400,500,600,700,800,900,1000],
    shipsPlaced: false,
    shipsToPlace: { ship1:true, ship2:false, ship3:false, ship4:false},
    myShips:{ship1:{locations:[]},
            ship2:{locations:[]},
            ship3:{locations:[]},
            ship4:{locations:[]}},
    ships: [
      { "locations": [101, 102], "shipType": "Submarine" },
      { "locations": [203, 204, 205], "shipType": "Destroyer" },
      { "locations": [306, 307, 308, 309], "shipType": "Cruise Ship" },
      {
        "locations": [405, 404, 403, 402, 401],
        "shipType": "Battleship"
      }
    ]
  };
  componentDidMount = () => {
    this.setState({ gamePlayerId: this.props.gamePlayer }, () => {
      this.fetchData();
    });
  };
  fetchData = () => {
    fetch(`api/game_view/${this.state.gamePlayerId}`)
      .then(response =>
        response.status !== 401 ? response.json() : this.props.history.goBack()
      )
      .then(response => {
        console.log(response);
        if (response) {
          const myShipLocations = [];
          const myAttacks = [];
          const hits = [];
          let enemyName =null;
          const shipTypes= []

          response.ships.forEach(element => {
            shipTypes.push(element.shipType)
            for (var i = 0; i < element.location.length; i++) {
              myShipLocations.push(element.location[i]);
            }
          });
          response.attacks.forEach(element => {
            for (var i = 0; i < element.attackLocations.length; i++) {
              myAttacks.push(element.attackLocations[i]);
            }
          });
          {response.EnAttacks &&
          response.EnAttacks.forEach(element => {
            for (var i = 0; i < element.attackLocations.length; i++) {
              hits.push(element.attackLocations[i]);
            }
          })}
          if (response.EnPlayer) {enemyName=response.EnPlayer.name}

          this.setState({
            responstStatus: response.status,
            gameName: response.gmName,
            enemyName: enemyName,
            myName: response.player.name,
            locations: myShipLocations,
            attacks: myAttacks,
            hits: hits,
            shipTypes: shipTypes
          },()=>{this.state.locations[1] && this.setState({shipsPlaced: true,fleetInPosition:false,shipsToPlace:{ship1:false}})});
        }
      });
  };

  postShips = () => {
    console.log(JSON.stringify(this.state.ships));
    fetch(`/api/game_view/${this.props.gamePlayer}/ships`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.ships)
    })
      .then(response => {
        console.log(response)
        if (response.status == 201) {
          this.setState({shipsPlaced: true},()=>this.fetchData())
          return response.json();
          
        }
      })
      .catch(err => console.log("err", err));
  };

placeShip =(number)=>{
  switch (number){
    case 1: this.setState({shipsToPlace:{ship1:false,ship2:true}})
    break;
    case 2: this.setState({shipsToPlace:{ship2:false,ship3:true}})
    break;
    case 3: this.setState({shipsToPlace:{ship3:false,ship4:true}})
    break;
    case 4: this.setState({shipsToPlace:{ship4:false},fleetInPosition:true})
    break;
  }
  
}

rotate=(direction)=>{
  this.setState({rotate: direction},()=>{console.log(direction)})
};

checkValid=(arr)=>{
  const unvalid=[11,211,311,,411,511,611,711,811,911,1011,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110];
  const check =unvalid.filter(element => arr.includes(element))
  console.log(check)
  if (check.length===0){return true}
}

handleClick=(cellKey)=>{
  if (this.state.shipsPlaced===false){
    const locations=[];
   
          
        if (this.state.shipsToPlace.ship1===true){
          console.log("ship 1")
          
          
          
          if (this.state.rotate==="horizontal"){locations.push(cellKey,cellKey+1);
            

            if(this.checkValid(locations)===true){
              this.setState({myShips:{ship1:{locations: locations, shipType: "Submarine"}},
            shipLog:[...locations]})
            }
                else{alert("invalid position")}
              }
                  else{locations.push(cellKey,cellKey+100)
                  if(this.checkValid(locations)===true){
                    this.setState({myShips:{ship1:{locations: locations, shipType: "Submarine"}},
                  shipLog:[...locations]})}
                else {alert("invalid position")}}
            
        }
        else if (this.state.shipsToPlace.ship2===true){
          console.log("ship 2")
          
          if (this.state.rotate==="horizontal"){locations.push(cellKey,cellKey+1,cellKey+2);
            if(this.checkValid(locations)===true){
              this.setState({myShips:{ship2:{locations: locations, shipType: "Submarine"}},
            shipLog:{ship1:locations}})
              }
              else {alert("unvalid position")}}
          else{locations.push(cellKey,cellKey+100,cellKey+200);
            if(this.checkValid(locations)===true){
              this.setState({myShips:{ship2:{locations: locations, shipType: "Submarine"}},
            shipLog:{ship1:locations}})}
              else {alert("unvalid position")}}
            
        }
        else if (this.state.shipsToPlace.ship3===true){
          console.log("ship 3")
          
          if (this.state.rotate==="horizontal"){locations.push(cellKey,cellKey+1,cellKey+2,cellKey+3);
            if(this.checkValid(locations)===true){
              this.setState({myShips:{ship3:{locations: locations, shipType: "Submarine"}},
           
            shipLog:[...this.state.shipLog,...locations]})}
              else {alert("unvalid position")}}
          else{locations.push(cellKey,cellKey+100,cellKey+200,cellKey+300);
            if(this.checkValid(locations)===true){
              this.setState({myShips:{ship3:{locations: locations, shipType: "Submarine"}},
           
            shipLog:[...this.state.shipLog,...locations]})}
            
            else {alert("unvalid position")}}
            
        }
        else if (this.state.shipsToPlace.ship4===true){
          console.log("ship 4")
        
          if (this.state.rotate==="horizontal"){locations.push(cellKey,cellKey+1,cellKey+2,cellKey+3,cellKey+4);
            if(this.checkValid(locations)===true){
              this.setState({myShips:{ship4:{locations: locations, shipType: "Submarine"}},
              shipLog:[...this.state.shipLog,...locations]
             })}
              else {alert("unvalid position")}}
          else{locations.push(cellKey,cellKey+100,cellKey+200,cellKey+300,cellKey+400);
            if(this.checkValid(locations)===true){
              this.setState({myShips:{ship4:{locations: locations, shipType: "Submarine"}},
              shipLog:[...this.state.shipLog,...locations]
             })}
              else {alert("unvalid position");}}
           
        }
  }  
 }






  createOwnBoard = () => {
  
 
    let board = [];

    // Outer loop to create parent
    for (let i = 100; i < 1001; i+=100) {
       let children = [];
      //Inner loop to create children
      for (let j = 1; j < 11; j++) {
       
        let cellKey =  j+i;
        
        if (
          this.state.locations.includes(cellKey) &&
          this.state.hits.includes(cellKey)
        ) {
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
        } else if (this.state.locations.includes(cellKey) ||this.state.shipLog.ship1.includes(cellKey)) {
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
              >
                {cellKey}
              </Grid>
            );
          }
        } else if (this.state.hits.includes(cellKey)) {
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
                
              >
                {cellKey}
              </Grid>
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
              onClick={()=>this.handleClick(cellKey)}
            >
              {cellKey}
            </Grid>
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
  };

  createEnemyBoard = () => {
    let enemyBoard = [];

    // Outer loop to create parent
    for (let i = 100; i < 1001; i+=100) {
      
      let enemyChildren = [];
      //Inner loop to create children
      for (let j = 1; j <11; j++) {
        let cellKey = i + j;
        if (this.state.attacks.includes(cellKey)) {
          {
            enemyChildren.push(
              <Grid
                item
                item
                xs={1}
                align="center"
                style={{
                  backgroundColor: "red",
                  paddingTop: "1px",
                  border: "1px solid black",
                  minHeight: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  maxWidth: "30px"
                }}
              >
                {cellKey}
              </Grid>
            );
          }
        } else {
          enemyChildren.push(
            <Grid
              item
              item
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
            >
              {cellKey}
            </Grid>
          );
        }
      }
      //Create the parent and add the children
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
  };
  render() {
 console.log("RENDER")
    // this.state.attacks && console.log(this.state.attacks);
    // this.state.locations && console.log(this.state.locations);


    if (this.state.responstStatus == 401) {
      this.props.history.goBack();
    } else {
      if (this.state.locations && this.state.attacks) {
        return (
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} align="center">
              <h2>
                {this.state.myName} (You) VS {this.state.enemyName}
              </h2>
            </Grid>
            <Grid>
              {(this.state.fleetInPosition===true && this.state.shipsPlaced===false) ?<button onClick={()=>this.postShips}>post ships</button>: null}
            {this.state.shipsToPlace.ship1===true ?<button onClick={()=>this.placeShip(1,2)}>Place First Ship</button>: null}
            {this.state.shipsToPlace.ship2===true ?<button onClick={()=>this.placeShip(2,3)}>Place Second Ship</button>: null}
            {this.state.shipsToPlace.ship3===true ?<button onClick={()=>this.placeShip(3,4)}>Place Third Ship</button>: null}
            {this.state.shipsToPlace.ship4===true ?<button onClick={()=>this.placeShip(4,null)}>Place Fourth Ship</button>: null}
            {this.state.fleetInPosition===false ? <button onClick={()=>this.rotate("horizontal")}>horizontal</button> :null}
            {this.state.fleetInPosition===false ? <button onClick={()=>this.rotate(null)}>vertical</button> :null}
              
            </Grid>
            <Grid
              item
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
              <strong>my Board</strong>
              {this.createOwnBoard()}
            </Grid>

            <Grid
              item
              align="center"
              xs={5}
              style={{
                minHeight: "300px",
                maxHeight: "300px",
                minWidth: "300px",
                maxWidth: "300px",
                marginLeft: "20px"
              }}
            >
              <strong>enemy Board</strong>
              {this.createEnemyBoard()}
            </Grid>
          </Grid>
        );
      } else {
        return <h1>...loading</h1>;
      }
    }
  }
}

export default withRouter(Game);
