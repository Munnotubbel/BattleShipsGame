import React, { Component } from "react";
import Hitpoints from "./Hitpoints";
import "./Hitpoints.css"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { responsiveFontSizes } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import EnemyBoard from "./EnemyBoard";
import MyBoard from "./MyBoard";
class Game extends Component {
  state = {
    selfCanFire: false,
    gameOver: false,
    gameResult: "",
    myHits:[],
    shotsTemp: [],
    shots: [],
    rotate: "horizontal",
    fleetInPosition: false,
    shipLog:[],
    shipLogTemp:[],
    shipsPlaced: false,
    shipsToPlace: { ship1:true, ship2:false, ship3:false, ship4:false},
    myShip1: null,
    myShip2: null,
    myShip3: null,
    myShip4: null,
  };
  componentDidMount = () => {
    this.setState({ gamePlayerId: this.props.gamePlayer }, () => {
      this.fetchData();
    });
  };

  componentWillUnmount() {
      this.props.changetitle("Battleships Game");
  }

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
            gameOver: response.gameOver ? response.gameOver : false,
            gameResult: response.gameResult ? response.gameResult :"",
            myHits: response.myHits ? response.myHits : [],
            responstStatus: response.status,
            gameName: response.gmName,
            enemyName: enemyName,
            myName: response.player ? response.player.name:"",
            locations: myShipLocations, 
            attacks: myAttacks,
            hits: hits,
            hitMyShip: response.EnHits ? response.EnHits: [],
            shipTypes: shipTypes,
            round: response.turnInfo ? response.turnInfo.round : 1,
            selfCanFire: response.turnInfo ? response.turnInfo.selfCanFire : false,
          },
          ()=>{this.state.locations[1] &&
             this.setState({shipsPlaced: true,fleetInPosition:false,shipsToPlace:{ship1:false}});
             this.props.changetitle(`${this.state.myName} (You) VS ${this.state.enemyName}`)});
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
  console.log("RICHTIG PLATZ " +number)
  switch (number){
    case 1: 
    if(this.state.shipLogTemp.length===2) 
    {this.setState({shipsToPlace:{ship1:false,ship2:true},shipLog: [...this.state.shipLog,...this.state.shipLogTemp]});} 
    else{alert("place first ship")}
    break;

    case 2: 
    if(this.state.shipLogTemp.length===3) 
    {this.setState({shipsToPlace:{ship2:false,ship3:true},shipLog: [...this.state.shipLog,...this.state.shipLogTemp]});}
    else{alert("place second ship")}
    break;

    case 3: 
    if(this.state.shipLogTemp.length===4) 
    {this.setState({shipsToPlace:{ship3:false,ship4:true},shipLog: [...this.state.shipLog,...this.state.shipLogTemp]});}
    else{alert("place third ship")} 
    break;

    case 4: 
    if(this.state.shipLogTemp.length===5) 
    {this.setState({shipsToPlace:{ship4:false},fleetInPosition:true, shipLog: [...this.state.shipLog,...this.state.shipLogTemp]});} 
    else{alert("place fourth ship")}
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

putShip=(cellKey)=>{
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
if (this.state.shipsPlaced ===true && this.state.shots.length<3 && this.state.gameOver==false){
  location.push(cellKey)
this.setState({shots:[...this.state.shots,...location]}, ()=>{if(this.state.shots.length===3){this.setState({shotsPlaced: true})}})
}
 
 }
resetShot=()=>{this.setState({shots: [],shotsPlaced:false})}

postShots=()=>{

  
    fetch(`api/game_view/${this.state.gamePlayerId}/checkNext`)
      .then(response => response.json())
      .then(response => {
        if(response.selfCanFire==true && response.myAtmTurn<=response.EnAtmTurn && response.gameOver===false){

  const attacks =[{"turn": response.myAtmTurn,"attackLocations": this.state.shots}];

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
          
          this.setState({shots:[],shotsPlaced: false},()=>this.fetchData())
          return response.json();
          
        }
      })
      .catch(err => console.log("err", err));
  }
  else if( response.gameOver===true){
   this.fetchData();
  }
else {alert("wait for opponent");this.fetchData()}
});}


  render() {

    this.state.myHits && console.log(this.state.myHits.length);
    this.state.hits && console.log(this.state.hits.length);
    // this.state.locations && console.log(this.state.locations);


    if (this.state.responstStatus == 401) {
      this.props.history.goBack();
    } else {
      if (this.state.locations && this.state.attacks && this.state.myHits && this.state.hits) {
        return (
          <Grid container direction="row"  justify="center">
            <Grid item xs={12} align="center">
              {/* <h2>
                {this.state.myName} (You) VS {this.state.enemyName}
              </h2> */}
              {this.state.gameOver==true ? <div style={{position:"absolute", left:"30%" ,top:"40%", width:"40%", height:"30%", backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex:"2000" }}><h2 style={{position:"absolute", top:"35%", left:"40%"}}>{this.state.gameResult}</h2></div> : null}
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
            {(this.state.shipsPlaced===true && this.state.selfCanFire===true && this.state.shots.length>0) ? <Grid item><button onClick={()=>this.resetShot()}>reset shot</button></Grid> : null}
            {this.state.shotsPlaced ===true ? <Grid item><button onClick={()=>this.postShots()}>post Shots</button></Grid> : null}
            </Grid>
            </Grid>
       <MyBoard
        enShots={this.state.hits}
         enHits={this.state.hitMyShip}
          myShipLocations={this.state.locations}
           placedShips={this.state.shipLog}
            placedShipsTemp={this.state.shipLogTemp}
            putShip={this.putShip}>
            </MyBoard>

       <EnemyBoard 
       myHits={this.state.myHits} 
       myShots={this.state.shots} 
       myMiss={this.state.attacks}
       fireInTheHole={this.handleShot}>
       </EnemyBoard>

         
          </Grid>
        );
      } else {
        return <h1>...loading</h1>;
      }
    }
  }
}

export default withRouter(Game);
