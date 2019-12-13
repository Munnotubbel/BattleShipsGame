import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { responsiveFontSizes } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class Game extends Component {
  state = {
    shotsTemp: [],
    shots: [],
    rotate: "horizontal",
    fleetInPosition: false,
    shipLog:[],
    shipLogTemp:[],
    boardCol: [1,2,3,4,5,6,7,8,9,10],
    boardRow: [100,200,300,400,500,600,700,800,900,1000],
    shipsPlaced: false,
    shipsToPlace: { ship1:true, ship2:false, ship3:false, ship4:false},
    myShip1: null,
    myShip2: null,
    myShip3: null,
    myShip4: null,

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

          {response.ships &&
          response.ships.forEach(element => {
            shipTypes.push(element.shipType)
            for (var i = 0; i < element.location.length; i++) {
              myShipLocations.push(element.location[i]);
            }
          })}
          {response.attacks &&
          response.attacks.forEach(element => {
            for (var i = 0; i < element.attackLocations.length; i++) {
              myAttacks.push(element.attackLocations[i]);
            }
          })}
          
          {response.EnAttacks &&
          response.EnAttacks.forEach(element => {
            for (var i = 0; i < element.attackLocations.length; i++) {
              hits.push(element.attackLocations[i]);
            }
          })}
          {response.EnPlayer && (enemyName=response.EnPlayer.name)}

          this.setState({
            responstStatus: response.status,
            gameName: response.gmName,
            enemyName: enemyName,
            myName: response.player ? response.player.name:"",
            locations: myShipLocations, 
            attacks: myAttacks,
            hits: hits,
            shipTypes: shipTypes,
            round: response.turnInfo? response.turnInfo.round : 1,
            nextTurn: response.turnInfo? response.turnInfo.nextTurn :false,
          },()=>{this.state.locations[1] && this.setState({shipsPlaced: true,fleetInPosition:false,shipsToPlace:{ship1:false}});console.log(this.state)});
        }
      });
  };

  postShips = () => {
    const post =[this.state.myShip1,this.state.myShip2,this.state.myShip3,this.state.myShip4]
    console.log(post)
    console.log(JSON.stringify(post));
    fetch(`/api/game_view/${this.props.gamePlayer}/ships`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
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
    case 1: this.setState({shipsToPlace:{ship1:false,ship2:true},shipLog: [...this.state.shipLog,...this.state.shipLogTemp]})
    break;
    case 2: this.setState({shipsToPlace:{ship2:false,ship3:true},shipLog: [...this.state.shipLog,...this.state.shipLogTemp]})
    break;
    case 3: this.setState({shipsToPlace:{ship3:false,ship4:true},shipLog: [...this.state.shipLog,...this.state.shipLogTemp]})
    break;
    case 4: this.setState({shipsToPlace:{ship4:false},fleetInPosition:true, shipLog: [...this.state.shipLog,...this.state.shipLogTemp]})
    break;
  }
}
placeAgain=()=>{this.setState({shipsToPlace:{ship1:true,ship2:false,ship2:false,ship2:false},fleetInPosition:false, shipLog: [],shipLogTemp: []})
}

rotate=(direction)=>{
  this.setState({rotate: direction},()=>{console.log(direction)})
};

checkValid=(arr)=>{
  const unvalid=[111,211,311,,411,511,611,711,811,911,1011,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110];
  const check1 =unvalid.filter(element => arr.includes(element))
  const check2=this.state.shipLog.filter(element => arr.includes(element))
  const checkboth =check1.concat(check2)
  console.log(checkboth  )
  if (checkboth.length===0){return true}
}

handleClick=(cellKey)=>{
  if (this.state.shipsPlaced===false){

   
          
        if (this.state.shipsToPlace.ship1===true){
          console.log("ship 1")
          const locations=[];
          
          
          if (this.state.rotate==="horizontal"){locations.push(cellKey,cellKey+1);
            

            if(this.checkValid(locations)===true){
              this.setState({myShip1:{"locations": locations, shipType: "Submarine"},
              shipLogTemp:[...locations]})
            }
                else{alert("invalid position")}
              }
                  else{locations.push(cellKey,cellKey+100)
                  if(this.checkValid(locations)===true){
                    this.setState({myShip1:{"locations": locations, shipType: "Submarine"},
                    shipLogTemp:[...locations]})}
                else {alert("invalid position")}}
            
        }
        else if (this.state.shipsToPlace.ship2===true){
          console.log("ship 2")
          const locations=[];
          if (this.state.rotate==="horizontal"){locations.push(cellKey,cellKey+1,cellKey+2);
            if(this.checkValid(locations)===true){
              this.setState({myShip2:{"locations": locations, shipType: "Destroyer"},
              shipLogTemp:[...locations]})
              }
              else {alert("unvalid position")}}
          else{locations.push(cellKey,cellKey+100,cellKey+200);
            if(this.checkValid(locations)===true){
              this.setState({myShip2:{"locations": locations, shipType: "Destroyer"},
              shipLogTemp:[...locations]})}
              else {alert("unvalid position")}}
            
        }
        else if (this.state.shipsToPlace.ship3===true){
          console.log("ship 3")
          const locations=[];
          if (this.state.rotate==="horizontal"){locations.push(cellKey,cellKey+1,cellKey+2,cellKey+3);
            if(this.checkValid(locations)===true){
              this.setState({myShip3:{"locations": locations, shipType: "Cruise Ship"},
           
              shipLogTemp:[...locations]})}
              else {alert("unvalid position")}}
          else{locations.push(cellKey,cellKey+100,cellKey+200,cellKey+300);
            if(this.checkValid(locations)===true){
              this.setState({myShip3:{"locations": locations, shipType: "Cruise Ship"},
           
              shipLogTemp:[...locations]})}
            
            else {alert("unvalid position")}}
            
        }
        else if (this.state.shipsToPlace.ship4===true){
          console.log("ship 4")
          const locations=[];
          if (this.state.rotate==="horizontal"){locations.push(cellKey,cellKey+1,cellKey+2,cellKey+3,cellKey+4);
            if(this.checkValid(locations)===true){
              this.setState({myShip4:{"locations": locations, shipType: "Battleship"},
              shipLogTemp:[...locations]
             })}
              else {alert("unvalid position")}}
          else{locations.push(cellKey,cellKey+100,cellKey+200,cellKey+300,cellKey+400);
            if(this.checkValid(locations)===true){
              this.setState({myShip4:{"locations": locations, shipType: "Battleship"},
              shipLogTemp:[...locations]  
             })}
              else {alert("unvalid position");}}
           
        }
  }  
 }

 handleShot=(cellKey)=>{
   console.log("FIRE IN THE HOLE" + cellKey)
   const location = []
if (this.state.shipsPlaced ===true && this.state.shots.length<3){
  location.push(cellKey)
this.setState({shots:[...this.state.shots,...location]}, ()=>{if(this.state.shots.length===3){this.setState({shotsPlaced: true})}})
}
 
 }
resetShot=()=>{this.setState({shots: [],shotsPlaced:false})}

postShots=()=>{
  const attacks =[{"turn":this.state.round,"attackLocations":this.state.shots}];

    fetch(`/api/game_view/${this.props.gamePlayer}/attacks`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(attacks)
    })
      .then(response => {
        console.log(response)
        if (response.status == 201) {
          this.fetchData()
          return response.json();
          
        }
      })
      .catch(err => console.log("err", err));
  };
  



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
        } else if (this.state.locations.includes(cellKey) ||this.state.shipLog.includes(cellKey)||this.state.shipLogTemp.includes(cellKey)) {
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
        if (this.state.attacks.includes(cellKey) || this.state.shots.includes(cellKey)) {
          {
            enemyChildren.push(
              <Grid
                item
                value={cellKey}
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
              onClick={()=>this.handleShot(cellKey)}
            >
            
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

    this.state && console.log(this.state);
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
              {this.state.round &&<h2>Round {this.state.round}</h2>}
            </Grid>
            <Grid item>
              <Grid container container direction="column" justify="center" alignItems="center">
                
              {(this.state.fleetInPosition===true && this.state.shipsPlaced===false) ?<Grid item><button onClick={()=>this.postShips()}>post ships</button></Grid>: null}
            {this.state.shipsToPlace.ship1===true ?<Grid item><button onClick={()=>this.placeShip(1,2)}>Place First Ship</button></Grid>: null}
            {this.state.shipsToPlace.ship2===true ?<Grid item><button onClick={()=>this.placeShip(2,3)}>Place Second Ship</button></Grid>: null}
            {this.state.shipsToPlace.ship3===true ?<Grid item><button onClick={()=>this.placeShip(3,4)}>Place Third Ship</button></Grid>: null}
            {this.state.shipsToPlace.ship4===true ?<Grid item><button onClick={()=>this.placeShip(4,null)}>Place Fourth Ship</button></Grid>: null}
            {(this.state.fleetInPosition===false && this.state.shipsPlaced===false) ? <Grid item><button onClick={()=>this.rotate("horizontal")}>horizontal</button></Grid> :null}
            {(this.state.fleetInPosition===false && this.state.shipsPlaced===false) ? <Grid item><button onClick={()=>this.rotate(null)}>vertical</button></Grid> :null}
            {this.state.shipsPlaced===false ? <Grid item><button onClick={()=>this.placeAgain()}>again</button></Grid> : null}
            {(this.state.shipsPlaced===true && this.state.nextTurn===true) ? <Grid item><button onClick={()=>this.resetShot()}>reset shot</button></Grid> : null}
            {this.state.shotsPlaced ===true ? <Grid item><button onClick={()=>this.postShots()}>post Shots</button></Grid> : null}}
            </Grid>
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
