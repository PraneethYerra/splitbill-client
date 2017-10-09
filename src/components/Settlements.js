import React, { Component } from 'react'
import axios from 'axios'

class Settlements extends Component {
    constructor(props){
        super(props);
    }
    
    displaySimplifiedAmount(settlements){
        if(settlements.totalDues < 0){
            return(
                <div>
                <p>you owe {settlements.email}</p>
                <b>&#8377;{Math.abs(settlements.totalDues)}</b>
                </div>
            )
        }
        else if(settlements.totalDues > 0){
            return(
                <div>
                <p>{settlements.email} owes you</p>
                <b>&#8377;{Math.abs(settlements.totalDues)}</b>
                </div>
            )
        }
        else if(settlements.totalDues === 0){
            return(
                <div>
                <p>you are all settled up !</p>
                
                </div>
            )
        }
        
    }
    render () {
        console.log(this.props.settlements)
        return (
            <div>
                {
                    this.props.settlements.map((settlement)=>{
                       return this.displaySimplifiedAmount(settlement)
                    })
                }
            </div>
        )
    }
}

export default Settlements