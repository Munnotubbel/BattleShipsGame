(this.webpackJsonpbships=this.webpackJsonpbships||[]).push([[0],{108:function(e,t,a){e.exports=a(181)},113:function(e,t,a){},123:function(e,t,a){},169:function(e,t,a){},181:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(11),r=a.n(s),i=(a(113),a(205)),c=a(82),o=a(81),m=a(105),u=a(207),p=a(26),h=a(13),d=a(9),g=a(5),f=a(106),E=a(83),v=a(19),b=a(43),y=a(28),S=a(44),w=a(45),j=a(14),k=a(47),O=a(22),T=a(46),C=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(S.a)(this,Object(w.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(v.a)({},e.target.id,e.target.value),(function(){return console.log(a.state)}))},a.handleSubmit=function(e){e.preventDefault(),a.fetchLogin()},a.fetchLogin=function(){fetch("https://bships.herokuapp.com/api/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},body:"userName=".concat(a.state.username,"&password=").concat(a.state.password)}).then((function(e){console.log(e),200===e.status?(console.log("logged in!"),a.props.onHide()):(console.log(e.status),console.log(e),console.log("Invalid username or password"))})).catch((function(e){return console.log("err",e)}))},a.state={value:""},a.handleChange=a.handleChange.bind(Object(j.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(j.a)(a)),a}return Object(k.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){return l.a.createElement(O.a,Object.assign({className:"one-edge-shadow"},this.props,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0}),l.a.createElement(O.a.Header,{closeButton:!0},l.a.createElement(O.a.Title,{id:"contained-modal-title-vcenter"},"Login")),l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement(O.a.Body,null,l.a.createElement(h.a,null,l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement("label",null,"Username:",l.a.createElement("input",{type:"text",id:"username",value:this.state.username,onChange:this.handleChange}))),l.a.createElement(g.a,null,l.a.createElement("label",null,"Password:",l.a.createElement("input",{type:"password",id:"password",value:this.state.password,onChange:this.handleChange})))))),l.a.createElement(O.a.Footer,null,l.a.createElement(T.a,{type:"submit",value:"Login"},"Login"))))}}]),t}(n.Component),x=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(S.a)(this,Object(w.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(v.a)({},e.target.id,e.target.value),(function(){return console.log(a.state)}))},a.handleSubmit=function(e){console.log("SUBMIT"),e.preventDefault(),a.signUp()},a.signUp=function(){fetch("https://bships.herokuapp.com/api/register",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},body:"userName=".concat(a.state.username,"&password=").concat(a.state.password)}).then((function(e){201===e.status?console.log("user added"):409===e.status?console.log("User exists"):console.log("Something is missing")}))},a.state={value:""},a.handleChange=a.handleChange.bind(Object(j.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(j.a)(a)),a}return Object(k.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){return l.a.createElement(O.a,Object.assign({className:"one-edge-shadow"},this.props,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0}),l.a.createElement(O.a.Header,{closeButton:!0},l.a.createElement(O.a.Title,{id:"contained-modal-title-vcenter"},"Register yourself")),l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement(O.a.Body,null,l.a.createElement(h.a,null,l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement("label",null,"Username:",l.a.createElement("input",{type:"text",id:"username",onChange:this.handleChange}))),l.a.createElement(g.a,null,l.a.createElement("label",null,"Password:",l.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange})))))),l.a.createElement(O.a.Footer,null,l.a.createElement(T.a,{type:"submit",value:"Sign up"},"Sign up"))))}}]),t}(n.Component),N=a(38),P=a(23),L=a(78),I=a.n(L),z=a(99);function B(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function F(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(Object(a),!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):B(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var H=Object(n.createContext)(),V=function(e){function t(){var e;return Object(b.a)(this,t),(e=Object(S.a)(this,Object(w.a)(t).call(this))).state={battleship:{},cruiseShip:{},destroyer:{},EnAtmTurn:null,enemyName:null,fleetInPosition:!1,gameOver:!1,gameResult:"",gmId:1,logged:null,myHits:[],myShip1:null,myShip2:null,myShip3:null,myShip4:null,pull:!1,ranking:null,rotate:"horizontal",round:0,selfCanFire:!1,shipLog:[],shipLogTemp:[],shipsPlaced:!1,shipsToPlace:{ship1:!0,ship2:!1,ship3:!1,ship4:!1},shots:[],shotsTemp:[],submarine:{},sunk:[],timeOut:null,turnTimer:null},e.updateValue=function(t,a){e.setState(Object(v.a)({},t,a))},e.fetchGames=function(){fetch("https://bships.herokuapp.com/api/games").then((function(e){return e.json()})).then((function(t){return e.setState(F({},t),(function(){t.loggedPly!==e.state.logged&&e.setState({logged:t.loggedPly})}))}))},e.fetchGameView=function(){fetch("https://bships.herokuapp.com/api/game_view/".concat(e.state.gmId)).then((function(t){return 401!==t.status?t.json():e.props.history.goBack()})).then((function(t){if(t){var a,n,l,s,r=[],i=[],c=[],o=[],m=null;t.ships&&t.ships.forEach((function(e){"Submarine"===e.ShipType?s=e:"Destroyer"===e.ShipType?l=e:"Cruise Ship"===e.ShipType?n=e:"Battleship"===e.ShipType&&(a=e),o.push(e.ShipType);for(var t=0;t<e.location.length;t++)c.push(e.location[t])})),t.attacks&&t.attacks.forEach((function(e){for(var t=0;t<e.attackLocations.length;t++)i.push(e.attackLocations[t])})),t.EnAttacks&&t.EnAttacks.forEach((function(e){for(var t=0;t<e.attackLocations.length;t++)r.push(e.attackLocations[t])})),t.EnPlayer&&(m=t.EnPlayer.name),e.setState({attacks:i,battleship:a,cruiseShip:n,destroyer:l,enemyName:m,EnAtmTurn:t.EnAtmTurn,gameName:t.gmName,gameOver:!!t.gameOver&&t.gameOver,gameResult:t.gameResult?t.gameResult:"",hitMyShip:t.EnHits?t.EnHits:[],hits:r,locations:c,myHits:t.myHits?t.myHits:[],myName:t.player?t.player.name:"",responstStatus:t.status,round:t.turnInfo?t.turnInfo.round:1,selfCanFire:!!t.turnInfo&&t.turnInfo.selfCanFire,shipLog:[],shipLogTemp:[],shipsPlaced:t.shipsPlaced,shipTypes:o,submarine:s,sunk:t.sunk?t.sunk:null,timeOut:t.timeOut?t.timeOut:null,turnTimer:t.turnTimer&&t.turnTimer},(function(){!1===t.shipsPlaced?e.setState({fleetInPosition:!1,shipsToPlace:{ship1:!0}}):e.setState({fleetInPosition:!1,shipsToPlace:{ship1:!1}}),t.logged!==e.state.logged&&e.setState({logged:t.logged})}))}}))},e.getGameInfo=Object(z.a)(I.a.mark((function t(){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:!0===e.state.pull&&fetch("https://bships.herokuapp.com/api/game_view/".concat(e.state.gmId,"/checkNext")).then((function(e){return e.json()})).then((function(t){"it's a tie"===t.gameResult&&e.setState({pull:!1,gameOver:!0},(function(){return e.fetchGameView()})),e.state.round===t.round&&e.state.gameOver===t.gameOver&&e.state.selfCanFire===t.selfCanFire&&e.state.gameResult===t.gameResult&&e.state.gameResult===t.EnAtmTurn&&e.state.enemyName===t.enemyName||e.setState({enemyName:t.enemyName,EnAtmTurn:t.EnAtmTurn,gameOver:t.gameOver,gameResult:t.gameResult,round:t.round,selfCanFire:t.selfCanFire,turnTimer:t.turnTimer&&t.turnTimer},(function(){console.log("POLL!!"),console.log(e.state)}))})).catch((function(e){return console.log(e)}));case 1:case"end":return t.stop()}}),t)}))),e.checkValid=function(t){var a=[111,211,311,411,511,611,711,811,911,1011,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110].filter((function(e){return t.includes(e)})),n=e.state.shipLog.filter((function(e){return t.includes(e)}));if(0===a.concat(n).length)return!0},e.placeAgain=function(){e.setState({fleetInPosition:!1,shipLog:[],shipLogTemp:[],shipsToPlace:{ship1:!0,ship2:!1}})},e.rotateShip=function(t){e.setState({rotate:t},(function(){console.log(t),e.putShip(e.state.shipLogTemp[0])}))},e.putShip=function(t){if(!1===e.state.shipsPlaced)if(!0===e.state.shipsToPlace.ship1){console.log("ship 1");var a=[];"horizontal"===e.state.rotate?(a.push(t,t+1),!0===e.checkValid(a)?e.setState({myShip1:{locations:a,shipType:"Submarine",horizontal:!0},shipLogTemp:[].concat(a)}):alert("invalid position")):(a.push(t,t+100),!0===e.checkValid(a)?e.setState({myShip1:{locations:a,shipType:"Submarine",horizontal:!1},shipLogTemp:[].concat(a)}):alert("invalid position"))}else if(!0===e.state.shipsToPlace.ship2){console.log("ship 2");var n=[];"horizontal"===e.state.rotate?(n.push(t,t+1,t+2),!0===e.checkValid(n)?e.setState({myShip2:{locations:n,shipType:"Destroyer",horizontal:!0},shipLogTemp:[].concat(n)}):alert("unvalid position")):(n.push(t,t+100,t+200),!0===e.checkValid(n)?e.setState({myShip2:{locations:n,shipType:"Destroyer",horizontal:!1},shipLogTemp:[].concat(n)}):alert("unvalid position"))}else if(!0===e.state.shipsToPlace.ship3){console.log("ship 3");var l=[];"horizontal"===e.state.rotate?(l.push(t,t+1,t+2,t+3),!0===e.checkValid(l)?e.setState({myShip3:{locations:l,shipType:"Cruise Ship",horizontal:!0},shipLogTemp:[].concat(l)}):alert("unvalid position")):(l.push(t,t+100,t+200,t+300),!0===e.checkValid(l)?e.setState({myShip3:{locations:l,shipType:"Cruise Ship",horizontal:!1},shipLogTemp:[].concat(l)}):alert("unvalid position"))}else if(!0===e.state.shipsToPlace.ship4){console.log("ship 4");var s=[];"horizontal"===e.state.rotate?(s.push(t,t+1,t+2,t+3,t+4),!0===e.checkValid(s)?e.setState({myShip4:{locations:s,shipType:"Battleship",horizontal:!0},shipLogTemp:[].concat(s)}):alert("unvalid position")):(s.push(t,t+100,t+200,t+300,t+400),!0===e.checkValid(s)?e.setState({myShip4:{locations:s,shipType:"Battleship",horizontal:!1},shipLogTemp:[].concat(s)}):alert("unvalid position"))}console.log(e.state.shipLogTemp)},e.placeShip=function(t){switch(t){case 1:2===e.state.shipLogTemp.length?e.setState({shipsToPlace:{ship1:!1,ship2:!0},shipLog:[].concat(Object(P.a)(e.state.shipLog),Object(P.a)(e.state.shipLogTemp))}):alert("place first ship");break;case 2:3===e.state.shipLogTemp.length?e.setState({shipsToPlace:{ship2:!1,ship3:!0},shipLog:[].concat(Object(P.a)(e.state.shipLog),Object(P.a)(e.state.shipLogTemp))}):alert("place second ship");break;case 3:4===e.state.shipLogTemp.length?e.setState({shipsToPlace:{ship3:!1,ship4:!0},shipLog:[].concat(Object(P.a)(e.state.shipLog),Object(P.a)(e.state.shipLogTemp))}):alert("place third ship");break;case 4:5===e.state.shipLogTemp.length?e.setState({shipsToPlace:{ship4:!1},fleetInPosition:!0,shipLog:[].concat(Object(P.a)(e.state.shipLog),Object(P.a)(e.state.shipLogTemp))}):alert("place fourth ship")}},e.postShips=function(){var t=[e.state.myShip1,e.state.myShip2,e.state.myShip3,e.state.myShip4];console.log(JSON.stringify(t)),fetch("https://bships.herokuapp.com/api/game_view/".concat(e.state.gmId,"/ships"),{method:"POST",credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(t){if(console.log(t),201===t.status)return e.fetchGameView(),t.json()})).catch((function(e){return console.log("err",e)}))},e.handleShot=function(t){fetch("https://bships.herokuapp.com/api/game_view/".concat(e.state.gmId,"/checkNext")).then((function(e){return e.json()})).then((function(a){if(!0===a.selfCanFire&&!1===a.gameOver){var n=[];!0===e.state.shipsPlaced&&e.state.shots.length<3&&(n.push(t),e.setState({shots:[].concat(Object(P.a)(e.state.shots),n)},(function(){3===e.state.shots.length&&e.setState({shotsPlaced:!0})})))}else!1===a.selfCanFire&&!0===a.EnCanFire?(alert("wait for your opponent"),e.setState({round:a.round,gameOver:a.gameOver,gameResult:a.gameResult?a.gameResult:""})):e.setState({round:a.round,gameOver:a.gameOver,gameResult:a.gameResult?a.gameResult:""})}))},e.resetShot=function(){e.setState({shots:[],shotsPlaced:!1})},e.postShots=function(){fetch("https://bships.herokuapp.com/api/game_view/".concat(e.state.gmId,"/checkNext")).then((function(e){return e.json()})).then((function(t){if(!0===t.selfCanFire&&t.myAtmTurn<=t.EnAtmTurn&&!1===t.gameOver){var a=[{turn:t.myAtmTurn,attackLocations:e.state.shots}];fetch("https://bships.herokuapp.com/api/game_view/".concat(e.state.gmId,"/attacks"),{method:"POST",credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(t){if(console.log(t),201===t.status)return e.setState({shots:[],shotsPlaced:!1},(function(){return e.fetchGameView()})),t.json()})).catch((function(e){return console.log("err",e)}))}else!0===t.gameOver?e.fetchGameView():(alert("wait for opponent"),e.setState({selfCanFire:t.selfCanFire},(function(){return e.fetchGameView()})))}))},e.fetchRanking=function(){console.log("rating fetch"),fetch("https://bships.herokuapp.com/api/ranking").then((function(e){return e.json()})).then((function(t){return e.setState({ranking:t})}))},e.logOut=function(){fetch("https://bships.herokuapp.com/api/logout",{method:"POST"}).then((function(e){200===e.status?window.location.reload():console.log("something went wrong")}))},e.interval=setInterval(e.getGameInfo,5e3),e}return Object(k.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){this.getGameInfo()}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return l.a.createElement(H.Provider,{value:F({},this.state,{fetchGames:this.fetchGames,fetchGameView:this.fetchGameView,fetchRanking:this.fetchRanking,handleShot:this.handleShot,logOut:this.logOut,placeAgain:this.placeAgain,placeShip:this.placeShip,postShips:this.postShips,postShots:this.postShots,putShip:this.putShip,resetShot:this.resetShot,rotateShip:this.rotateShip,updateValue:this.updateValue})},this.props.children)}}]),t}(n.Component),R=Object(N.e)(V);var G=Object(N.e)((function(e,t){var a=Object(n.useContext)(H),s=a.updateValue,r=a.logOut,i=l.a.useState(!1),v=Object(c.a)(i,2),b=v[0],y=v[1],S=l.a.useState(!1),w=Object(c.a)(S,2),j=w[0],k=w[1],O=l.a.createRef(),T=l.a.createElement(E.a,{id:"popover-basic"},l.a.createElement(E.a.Content,null,null===a.logged?"Welcome Admiral! Please login":"finish your Games before starting a new one"));return l.a.createElement(o.a,{bg:"light",expand:"lg",className:"navButtons"},l.a.createElement(m.a,{className:"mr-auto"},l.a.createElement(h.a,null,l.a.createElement(d.a,null,null===a.logged?l.a.createElement(g.a,null,l.a.createElement(u.a,{variant:"primary",onClick:function(){return y(!0)}},"Login"),l.a.createElement(C,{show:b,onHide:function(){return y(!1)}})):l.a.createElement(g.a,null,l.a.createElement(u.a,{variant:"primary",onClick:function(){return r()}},"Logout")),null===a.logged?l.a.createElement(g.a,null,l.a.createElement(u.a,{variant:"primary",onClick:function(){return k(!0)}},"Register"),l.a.createElement(x,{show:j,onHide:function(){return k(!1)}})):l.a.createElement(g.a,{style:{width:"110px"}}),l.a.createElement(g.a,null,l.a.createElement(p.b,{to:"/web/ranking"},l.a.createElement(u.a,null,"Leaderboard"))),l.a.createElement(g.a,null,l.a.createElement(p.b,{to:"/web/games"},l.a.createElement(u.a,null,"Games"))),l.a.createElement(g.a,null,l.a.createElement(f.a,{rootClose:"true",rootCloseEvent:"mousedown",ref:O,trigger:"manual",placement:"bottom",overlay:T},l.a.createElement(u.a,{onClick:function(){fetch("https://bships.herokuapp.com/api/lookForGame",{method:"POST"}).then((function(e){return console.log(e),e.json()})).then((function(t){t.gameId?(s("gmId",t.gameId),e.history.push("/web/game_view")):O.current.show()}))}},"Play")))))),l.a.createElement(o.a.Brand,{href:"/",className:"pageTitle d-none d-lg-block"},l.a.createElement("img",{width:"200px",height:"auto",alt:"bshioLogo",src:"https://res.cloudinary.com/munnotubbel/image/upload/v1576591169/javaProject/bShip_u50r62.png"}),"Battleships"))})),_=a(29),A=a(101),D=a(208);function M(){var e=Object(n.useContext)(H);function t(e){if(null!==e)switch(e[0]){case"1.0":return l.a.createElement("img",{width:"20px",height:"auto",alt:"winnersMedal",style:{position:"absolute",left:"5%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1576767846/javaProject/Navy_Cross_xzfzf7.png"});case"0.5":return l.a.createElement("div",{className:"winlos stalemate"});case"0.0":return l.a.createElement("div",{className:"winlos sunk"});default:return""}return""}return Object(n.useEffect)((function(){e.fetchGames()}),[]),e.games?l.a.createElement(i.a,{item:!0,xs:10},l.a.createElement(A.a,null,e.games.map((function(a){return l.a.createElement(_.a,{style:{margin:"10px"},key:a.gmId,className:"text-center one-edge-shadow gameCards"},l.a.createElement(_.a.Header,null,"Game ",a.gmId),a.ingamePlayer&&l.a.createElement(_.a.Body,{className:"gameCardText"},l.a.createElement(h.a,null,l.a.createElement(_.a.Title,null,a.ingamePlayer.map((function(e,a){return 0===a?l.a.createElement("div",{key:"player1"},l.a.createElement(d.a,{className:"justify-content-md-center"},l.a.createElement("div",null,e.name),t(e.score)),l.a.createElement(d.a,{style:{fontSize:"calc(5px + 0.6vw)",marginTop:"5px",marginBottom:"5px"},className:"justify-content-md-center"},"VS")):l.a.createElement(d.a,{key:"player2",className:"justify-content-md-center"},l.a.createElement("div",null,e.name),t(e.score))})))),e.myGameIds!==[null]&&e.myGameIds.includes(a.gmId)&&0===a.ingamePlayer[0].score.length?l.a.createElement(p.b,{to:{pathname:"/web/game_view"},onClick:function(){return e.updateValue("gmId",a.gmId)}},l.a.createElement(T.a,{style:{position:"relative",fontSize:"12px"},className:"enterGameBtn",onClick:function(){return e.updateValue("gmId",a.gmId)}},"Enter Game")):null),l.a.createElement(_.a.Footer,{className:"text-muted",style:{fontSize:"calc(5px + 0.3vw)"}},"created: ",l.a.createElement(D.a,{date:a.created})))})))):l.a.createElement("h1",null,"...loading")}a(70);function U(e){return l.a.createElement("div",{className:"health-bar"},l.a.createElement("div",{className:"health-bar-inner-bar",style:{width:"".concat(e.hp,"%")}}),l.a.createElement("div",{className:"health-bar-name"},e.name))}function J(e){return l.a.createElement(h.a,null,l.a.createElement(d.a,{item:!0,style:{width:"300px"}}," ",function(){switch(e.dmg){case 0:return l.a.createElement(U,{name:e.name,hp:100});case 1:return l.a.createElement(U,{name:e.name,hp:93});case 2:return l.a.createElement(U,{name:e.name,hp:86});case 3:return l.a.createElement(U,{name:e.name,hp:79});case 4:return l.a.createElement(U,{name:e.name,hp:72});case 5:return l.a.createElement(U,{name:e.name,hp:65});case 6:return l.a.createElement(U,{name:e.name,hp:58});case 7:return l.a.createElement(U,{name:e.name,hp:51});case 8:return l.a.createElement(U,{name:e.name,hp:44});case 9:return l.a.createElement(U,{name:e.name,hp:37});case 10:return l.a.createElement(U,{name:e.name,hp:30});case 11:return l.a.createElement(U,{name:e.name,hp:23});case 12:return l.a.createElement(U,{name:e.name,hp:16});case 13:return l.a.createElement(U,{name:e.name,hp:9});case 14:default:return l.a.createElement(U,{name:e.name,hp:0})}}()))}a(56);function W(){return l.a.createElement("div",{style:{position:"absolute",left:0,top:0}},l.a.createElement("div",{className:"targetWrap"},l.a.createElement("div",{className:"innerCircle spin"},l.a.createElement("div",{className:"tinybeam1"}),l.a.createElement("div",{className:"tinybeam2"}),l.a.createElement("div",{className:"tinybeam3"}),l.a.createElement("div",{className:"tinybeam4"})),l.a.createElement("div",{className:"outerCircle spin"},l.a.createElement("div",{className:"tinybeam5"}),l.a.createElement("div",{className:"tinybeam6"}),l.a.createElement("div",{className:"tinybeam7"}),l.a.createElement("div",{className:"tinybeam8"}))))}var q=a(67);function $(e){var t=Object(n.useContext)(H);return l.a.createElement(h.a,null,t.sunk&&t.sunk.length>0?l.a.createElement(d.a,null,l.a.createElement(g.a,null,!0===t.sunk[0].Battleship?l.a.createElement("div",null,l.a.createElement("div",{class:"speechbubble"},"Battleship sunk"),l.a.createElement("div",{class:"pointer"})):null),l.a.createElement(g.a,null,!0===t.sunk[0].CruiseShip?l.a.createElement("div",null,l.a.createElement("div",{class:"speechbubble"},"Cruise Ship sunk"),l.a.createElement("div",{class:"pointer"})):null),l.a.createElement(g.a,null,!0===t.sunk[0].Destroyer?l.a.createElement("div",null,l.a.createElement("div",{class:"speechbubble"},"Destroyer sunk"),l.a.createElement("div",{class:"pointer"})):null),l.a.createElement(g.a,null,!0===t.sunk[0].Submarine?l.a.createElement("div",null,l.a.createElement("div",{class:"speechbubble"},"Submarine sunk"),l.a.createElement("div",{class:"pointer"})):null),l.a.createElement(g.a,null)):null,l.a.createElement(d.a,null,l.a.createElement(g.a,null," ",e.myHits&&l.a.createElement(J,{name:e.enemyName,dmg:e.myHits.length}))),l.a.createElement(d.a,null,l.a.createElement(g.a,null,0===t.EnAtmTurn||0===t.round?l.a.createElement("div",{className:"timeOut"},0===t.round?l.a.createElement("div",null,l.a.createElement("h6",null,"place your ships and wait for opponent")," "):l.a.createElement("div",null,l.a.createElement("h6",null,"wait for opponent")," "),l.a.createElement("div",{style:{margin:"5px auto"}},t.enemyName&&l.a.createElement(q.a,{date:t.timeOut+9e5,renderer:function(e){var t=e.minutes,a=e.seconds;return l.a.createElement("div",null,t,":",a)}}))):l.a.createElement(h.a,{className:"boardContainer"},function(){for(var t=[],a=100;a<1001;a+=100){for(var n=[],s=function(t){var s=a+t;e.myHits.includes(s)?n.push(l.a.createElement(g.a,{className:"allCells",value:s,xs:1},l.a.createElement("div",{class:"watergrid"},l.a.createElement("div",{class:"oil1"}),l.a.createElement("div",{class:"oil2"}),l.a.createElement("div",{class:"oil3"}),l.a.createElement("div",{class:"oil4"}),l.a.createElement("div",{class:"oil5"}),l.a.createElement("div",{class:"oil6"}),l.a.createElement("div",{class:"oil7"}),l.a.createElement("div",{class:"oil8"}),l.a.createElement("div",{class:"oil9"}),l.a.createElement("div",{class:"oil10"}),l.a.createElement("div",{class:"fire"},l.a.createElement("div",{class:"fire-left"},l.a.createElement("div",{class:"main-fire"}),l.a.createElement("div",{class:"particle-fire"})),l.a.createElement("div",{class:"fire-main"},l.a.createElement("div",{class:"main-fire"}),l.a.createElement("div",{class:"particle-fire"})),l.a.createElement("div",{class:"fire-right"},l.a.createElement("div",{class:"main-fire"}),l.a.createElement("div",{class:"particle-fire"})),l.a.createElement("div",{class:"fire-bottom"},l.a.createElement("div",{class:"main-fire"})))))):e.myShots.includes(s)?n.push(l.a.createElement(g.a,{className:"allCells",value:s,xs:1},l.a.createElement(W,null))):e.myMiss.includes(s)?n.push(l.a.createElement(g.a,{className:"allCells",value:s,xs:1},l.a.createElement("img",{style:{animationDelay:"".concat(Math.floor(-30*Math.random())+"s")},className:"bojeRed wiggle",alt:"boje",src:"https://res.cloudinary.com/munnotubbel/image/upload/v1576514944/javaProject/boje-removebg-preview-removebg-preview_acxmc4.png"}))):n.push(l.a.createElement(g.a,{className:"allCells",onClick:function(){return e.fireInTheHole(s)},xs:1}))},r=1;r<11;r++)s(r);t.push(l.a.createElement(d.a,null,n,l.a.createElement(g.a,{xs:2})))}return t}()))))}a(71);function K(){return l.a.createElement("div",{class:"watergrid"},l.a.createElement("div",{class:"oil1"}),l.a.createElement("div",{class:"oil2"}),l.a.createElement("div",{class:"oil3"}),l.a.createElement("div",{class:"oil4"}),l.a.createElement("div",{class:"oil5"}),l.a.createElement("div",{class:"oil6"}),l.a.createElement("div",{class:"oil7"}),l.a.createElement("div",{class:"oil8"}),l.a.createElement("div",{class:"oil9"}),l.a.createElement("div",{class:"oil10"}),l.a.createElement("div",{class:"fire"},l.a.createElement("div",{class:"fire-left"},l.a.createElement("div",{class:"main-fire"}),l.a.createElement("div",{class:"particle-fire"})),l.a.createElement("div",{class:"fire-main"},l.a.createElement("div",{class:"main-fire"}),l.a.createElement("div",{class:"particle-fire"})),l.a.createElement("div",{class:"fire-right"},l.a.createElement("div",{class:"main-fire"}),l.a.createElement("div",{class:"particle-fire"})),l.a.createElement("div",{class:"fire-bottom"},l.a.createElement("div",{class:"main-fire"}))))}function Q(e){var t=Object(n.useContext)(H);function a(e){return t.submarine.location[0]===e?!0===t.submarine.isHorizontal?l.a.createElement("img",{alt:"submarine",style:{zIndex:3e3,position:"absolute",width:"5.4vw",height:"auto",left:0,top:"30%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1577626645/javaProject/submarine_hxr5hf.png"}):l.a.createElement("img",{alt:"submarine",style:{transform:"rotate(90deg)",transformOrigin:"left center ",zIndex:3e3,position:"absolute",width:"5.4vw",height:"auto",left:"50%",top:"-15%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1577626645/javaProject/submarine_hxr5hf.png"}):t.destroyer.location[0]===e?!0===t.destroyer.isHorizontal?l.a.createElement("img",{alt:"destroyer",style:{zIndex:3e3,position:"absolute",width:"8vw",height:"auto",left:0,top:"25%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1577626636/javaProject/destroyer_loejgp.png"}):l.a.createElement("img",{alt:"destroyer",style:{transform:"rotate(90deg)",transformOrigin:"left center ",zIndex:3e3,position:"absolute",width:"8vw",height:"auto",left:"50%",top:"-35%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1577626636/javaProject/destroyer_loejgp.png"}):t.cruiseShip.location[0]===e?!0===t.cruiseShip.isHorizontal?l.a.createElement("img",{alt:"cruiseShip",style:{zIndex:3e3,position:"absolute",width:"11vw",height:"auto",left:0,top:"15%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1577626631/javaProject/cruiseShip_vrszgj.png"}):l.a.createElement("img",{alt:"cruiseShip",style:{transform:"rotate(90deg)",transformOrigin:"left center ",zIndex:3e3,position:"absolute",width:"11vw",height:"auto",left:"50%",top:"-40%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1577626631/javaProject/cruiseShip_vrszgj.png"}):t.battleship.location[0]===e?!0===t.battleship.isHorizontal?l.a.createElement("img",{alt:"battleship",style:{zIndex:3e3,position:"absolute",width:"13.5vw",height:"auto",left:0,top:"5%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1577986664/javaProject/battleship_trans_zg385u.png"}):l.a.createElement("img",{alt:"battleship",style:{transform:"rotate(90deg)",transformOrigin:"left center ",zIndex:3e3,position:"absolute",width:"13.5vw",height:"auto",left:"50%",top:"-50%"},src:"https://res.cloudinary.com/munnotubbel/image/upload/v1577626627/javaProject/battleship_trans_k2u0t5.png"}):void 0}return l.a.createElement(h.a,null,l.a.createElement(d.a,null,l.a.createElement(g.a,{xs:12}," ",e.enHits&&l.a.createElement(J,{name:t.logged+" (you)",dmg:e.enHits.length}))),l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement(h.a,{className:"boardContainer"},function(){for(var n=[],s=100;s<1001;s+=100){for(var r=[],i=function(n){var i=n+s;!0!==t.shipsPlaced||t.destroyer.location[0]!==i&&t.submarine.location[0]!==i&&t.cruiseShip.location[0]!==i&&t.battleship.location[0]!==i?e.enHits.includes(i)?r.push(l.a.createElement(g.a,{className:"allCells",xs:1},l.a.createElement(K,null))):e.placedShips.includes(i)||e.placedShipsTemp.includes(i)?r.push(l.a.createElement(g.a,{className:"allCells",value:i,style:{backgroundColor:"white"},xs:1})):!0===t.shipsPlaced&&(t.destroyer.location.includes(i)||t.submarine.location.includes(i)||t.cruiseShip.location.includes(i)||t.battleship.location.includes(i))?r.push(l.a.createElement(g.a,{className:"allCells",value:i,xs:1})):e.enShots.includes(i)?r.push(l.a.createElement(g.a,{className:"allCells",value:i,xs:1},l.a.createElement("img",{style:{animationDelay:"".concat(Math.floor(-30*Math.random())+"s")},className:"bojeRed wiggle",alt:"boje",src:"https://res.cloudinary.com/munnotubbel/image/upload/v1576514944/javaProject/boje-removebg-preview-removebg-preview_acxmc4.png"}))):r.push(l.a.createElement(g.a,{className:"allCells",value:i,align:"center",style:{paddingTop:"1px"},xs:1,onClick:function(){return e.putShip(i)}})):r.push(l.a.createElement(g.a,{className:"allCells",xs:1},a(i),e.enHits.includes(i)&&l.a.createElement(K,null)))},c=1;c<11;c++)i(c);n.push(l.a.createElement(d.a,null,r,l.a.createElement(g.a,{xs:2,className:"w-100"})))}return n}()))))}a(123);function X(){var e=Object(n.useContext)(H);return l.a.createElement("div",{className:"counterBorder"},e.selfCanFire?l.a.createElement("div",null,e.round<10?l.a.createElement("div",{className:"counterCenter"},e.round):l.a.createElement("div",{className:"counterCenter2"},e.round),l.a.createElement("div",{className:"counterCenterText"},"turn"),e.turnTimer&&l.a.createElement("div",{style:{position:"absolute",left:"40%",top:"65%",zIndex:9e3}},l.a.createElement(q.a,{date:e.turnTimer+6e4,renderer:function(e){var t=e.minutes,a=e.seconds;return l.a.createElement("div",null,t,":",a)}}))):l.a.createElement("div",{class:"circle"},l.a.createElement("div",{class:"up"},l.a.createElement("div",{class:"innera"})),l.a.createElement("div",{class:"down"},l.a.createElement("div",{class:"innerb"}))))}var Y=Object(N.e)((function(){var e=Object(n.useContext)(H);if(Object(n.useEffect)((function(){e.fetchGameView(),e.updateValue("pull",!0)}),[]),Object(n.useEffect)((function(){return function(){e.updateValue("pull",!1)}}),[]),401!==e.responstStatus)return e.locations&&e.attacks&&e.myHits&&e.hits?l.a.createElement(h.a,null,!0===e.gameOver?l.a.createElement(d.a,null,l.a.createElement(g.a,{style:{position:"absolute",left:"30%",top:"40%",width:"40%",height:"30%",backgroundColor:"rgba(255, 255, 255, 0.8)",zIndex:"10000"}},l.a.createElement("h2",{style:{position:"absolute",top:"35%",left:"40%"}},e.gameResult))," "):null,l.a.createElement(d.a,{className:"justify-content-md-center"},l.a.createElement(g.a,{xs:"2"}),l.a.createElement(g.a,{xs:"auto"},l.a.createElement(X,null)),l.a.createElement(g.a,{xs:"2"})),l.a.createElement(d.a,null,l.a.createElement(g.a,{xs:12,lg:6}," ",l.a.createElement(Q,{enShots:e.hits,enHits:e.hitMyShip,myShipLocations:e.locations,placedShips:e.shipLog,placedShipsTemp:e.shipLogTemp,putShip:e.putShip})),l.a.createElement(g.a,{xs:12,lg:6},l.a.createElement($,{enemyName:e.enemyName,myHits:e.myHits,myShots:e.shots,myMiss:e.attacks,fireInTheHole:e.handleShot}))),l.a.createElement(d.a,{style:{marginTop:"20px"}},l.a.createElement(g.a,{xs:2}," ",!0===e.fleetInPosition&&!1===e.shipsPlaced?l.a.createElement(i.a,{item:!0},l.a.createElement("button",{className:"actionButton",onClick:function(){return e.postShips()}},"post ships")):null,!0===e.shipsToPlace.ship1?l.a.createElement(i.a,{item:!0},l.a.createElement("button",{className:"actionButton",onClick:function(){return e.placeShip(1,2)}},"confirm First Ship")):null,!0===e.shipsToPlace.ship2?l.a.createElement(i.a,{item:!0},l.a.createElement("button",{className:"actionButton",onClick:function(){return e.placeShip(2,3)}},"confirm Second Ship")):null,!0===e.shipsToPlace.ship3?l.a.createElement(i.a,{item:!0},l.a.createElement("button",{className:"actionButton",onClick:function(){return e.placeShip(3,4)}},"confirm Third Ship")):null,!0===e.shipsToPlace.ship4?l.a.createElement(i.a,{item:!0},l.a.createElement("button",{className:"actionButton",onClick:function(){return e.placeShip(4,null)}},"confirm Fourth Ship")):null),l.a.createElement(g.a,{xs:1}," ",!1===e.shipsPlaced?l.a.createElement(i.a,{item:!0},l.a.createElement("button",{className:"actionButton",onClick:function(){return e.placeAgain()}},"again")):null),l.a.createElement(g.a,{xs:1},!1===e.fleetInPosition&&!1===e.shipsPlaced?l.a.createElement(i.a,{item:!0},"horizontal"===e.rotate?l.a.createElement("button",{className:"actionButton",onClick:function(){return e.rotateShip(null)}},"to vertical"):l.a.createElement("button",{className:"actionButton",onClick:function(){return e.rotateShip("horizontal")}},"to horizontal")):null),l.a.createElement(g.a,{xs:3}),l.a.createElement(g.a,{xs:1},!0===e.shipsPlaced&&!0===e.selfCanFire&&e.shots.length>0?l.a.createElement(i.a,{item:!0},l.a.createElement("button",{className:"actionButton",onClick:function(){return e.resetShot()}},"reset shot")):null),l.a.createElement(g.a,{xs:1},!0===e.shotsPlaced?l.a.createElement(i.a,{item:!0},l.a.createElement("button",{className:"actionButton",onClick:function(){return e.postShots()}},"post Shots")):null))):l.a.createElement("h1",null,"...loading");this.props.history.goBack()})),Z=a(103),ee=a.n(Z);function te(){var e=Object(n.useContext)(H);return Object(n.useEffect)((function(){e.fetchRanking()}),[]),l.a.createElement(_.a,{className:"one-edge-shadow",style:{width:"80%"}},e.ranking?l.a.createElement(_.a.Body,null,function(){var t=[];if(e.ranking)return e.ranking.forEach((function(e){for(var a=e.UserName,n=0,l=0,s=0,r=0,i=0,c=0;c<e.scores.length;c++)1===e.scores[c]&&n++,.5===e.scores[c]&&s++,0===e.scores[c]&&l++,.01===e.scores[c]&&i++,.01!==e.scores[c]&&(r+=e.scores[c]);t.push({name:a,wins:n,ties:s,loses:l,canceled:i,rating:r})})),t.sort((function(e,t){return e.rating<t.rating?1:t.rating<e.rating?-1:0})),t.forEach((function(e,t){e.rank=t+1})),l.a.createElement(ee.a,{hover:!0,bordered:!1,classes:"table-borderless",keyField:"index",data:t,columns:[{dataField:"rank",text:"rank",sort:!0},{dataField:"name",text:"Player",sort:!0},{dataField:"wins",text:"victory",sort:!0},{dataField:"ties",text:"stalemate",sort:!0},{dataField:"loses",text:"defeat",sort:!0},{dataField:"canceled",text:"canceled",sort:!0},{dataField:"rating",text:"rating",sort:!0}]})}()):l.a.createElement(_.a.Body,null,"...loading"))}a(168),a(169),a(170);var ae=function(){return l.a.createElement("div",null,l.a.createElement(p.a,null,l.a.createElement(R,null,l.a.createElement(G,{gameCreated:function(){return l.a.createElement(Y,null)}}),l.a.createElement(i.a,{container:!0,justify:"center",alignItems:"center",style:{marginTop:"20px"}},l.a.createElement(N.a,{exact:!0,path:"/",component:M}),l.a.createElement(N.a,{path:"/web/games",component:M}),l.a.createElement(N.a,{path:"/web/game_view",component:Y}),l.a.createElement(N.a,{path:"/web/ranking",component:te}),l.a.createElement(N.a,{path:"/web/login",component:C}),l.a.createElement(N.a,{path:"/web/signup",component:x})))),l.a.createElement("div",{className:"background"},l.a.createElement("div",{className:"water"}," ")," "),l.a.createElement("svg",null,l.a.createElement("filter",{id:"turbulence",x:"0",y:"0",width:"100%",height:"100%"},l.a.createElement("feTurbulence",{id:"sea-filter",numOctaves:"4",seed:"4",baseFrequency:"0.05 0.1"}),l.a.createElement("feDisplacementMap",{scale:"10",in:"SourceGraphic"}),l.a.createElement("animate",{xlinkHref:"#sea-filter",attributeName:"baseFrequency",dur:"60s",keyTimes:"0;0.5;1",values:"0.03 0.08; 0.05 0.1; 0.03 0.08",repeatCount:"indefinite"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ne=a(206),le=a(104),se=a.n(le);ne.a.locale(se.a),r.a.render(l.a.createElement(ae,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},56:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){}},[[108,1,2]]]);
//# sourceMappingURL=main.73a6c1b3.chunk.js.map