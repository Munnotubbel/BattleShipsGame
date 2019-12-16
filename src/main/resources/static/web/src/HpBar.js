import React from 'react'
import "./Hitpoints.css";
export default function HpBar(props) {
    return (
        <div className="progress-bar">
            <div className="progress-bar-inner-bar" style={{width:`${props.hp}%`}}>
              <span className="energy-bar-fade"></span>
              <span className="small-energy-bar-1"></span>
              <span className="small-energy-bar-2"></span>
              <span className="small-energy-bar-3"></span>
              <span className="small-energy-bar-4"></span>
              <span className="small-energy-bar-5"></span> 
              <span className="small-energy-bar-6"></span>  
              <span className="small-energy-bar-7"></span>      
              
              <div className="energy-bar-cover-up"></div>
            </div>
          </div>
    )
}
