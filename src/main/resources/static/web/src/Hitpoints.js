import React from 'react'
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import "./Hitpoints.css"
export default function Hitpoints(props) {
  console.log(props)
    function createHitpoints(){
        
       

        switch (props.dmg){
case 0: 
return(<div
    class
    class="meter animate"
   ><span style={{width:"100%"}}></span>
  </div>);
  
  

  case 1: 
  return(<div
      class="meter animate"
    > <span style={{width:"93%"}}></span></div>);
   

    case 2: 
return(<div
    class="meter animate"
  > <span style={{width:"86%"}}></span></div>);
  
  case 3: 
return(<div
    class="meter animate"
  ><span style={{width:"79%"}}></span></div>);
 
  case 4: 
return(<div
   class="meter animate"
  ><span style={{width:"72%"}}></span></div>);
  
  case 5: 
return(<div
    class="meter animate"
  ><span style={{width:"65%"}}></span></div>);
 
  case 6: 
return(<div
    class="meter animate"
  ><span style={{width:"58%"}}></span></div>);
  
  case 7: 
return(<div
 class="meter animate"
  ><span style={{width:"51%"}}></span></div>);
  
  case 8: 
return(<div
 class="meter animate"
  ><span style={{width:"44%"}}></span></div>);
 
  case 9: 
return(<div
   class="meter animate"
  ><span style={{width:"37%"}}></span></div>);

 
  case 10: 
return(<div
    class="meter animate"
  ><span style={{width:"30%"}}></span></div>);
 

  case 11: 
return(<div
    class="meter animate"
  ><span style={{width:"23%"}}></span></div>);
  
  case 12: 
return(<div
    class="meter animate"
  ><span style={{width:"16%"}}></span></div>);
 
 case 13: 
 return(<div
  class="meter animate"
   ><span style={{width:"9%"}}></span></div>);

   case 14: 
   return(<div
     class="meter animate"
     ><span style={{width:"86%"}}>terminated</span></div>);
    
  



        }
    }
    return (
       <Grid container >
           <Grid item style={{width:"300px"}}> {  createHitpoints()}</Grid></Grid>
   
 
    
            
            
    )
}
