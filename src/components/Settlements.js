import React, { Component } from 'react'
import axios from 'axios'

class Settlements extends Component {
    constructor(props){
        super(props);
        this.state={
            settlements:[]
        }
    }
    componentDidMount () {
        axios.get('/smart-settle/cool').then(res=>{
            if(res.status === 200){
                this.setState({
                    settlements:[res.data]
                })
                // alert('status 200')
            }
            else{
                alert('something went wrong')
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    displaySimplifiedAmount(settlements){
        if(settlements.totalDues < 0){
            return(
                <div>
                <p>you owe {settlements.email}</p>
                <p>&#8377;{Math.abs(settlements.totalDues)}</p>
                </div>
            )
        }
        else if(settlements.totalDues > 0){
            return(
                <div>
                <p>{settlements.email} owes you</p>
                <p>&#8377;{Math.abs(settlements.totalDues)}</p>
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
        return (
            <div>
                {
                    this.state.settlements.map((settlement)=>{
                       return this.displaySimplifiedAmount(this.state.settlements)
                    })
                }
            </div>
        )
    }
}

export default Settlements