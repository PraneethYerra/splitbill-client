import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
class GroupSettlementsList extends Component {
    constructor(props){
        super(props)
        this.state={
            paperStyle:{
                height:'64px',
                padding:'10px',
                cursor:'pointer',
                overflow:'hidden'
            }
        }
    }
    heightChange=()=>{
        if(this.state.paperStyle.height=='64px'){
            this.setState({
                paperStyle:{
                    minHeight:'64px',
                    padding:'10px',
                    cursor:'pointer',
                    overflow:'hidden'
                }
            })
        }
        else{
            this.setState({
                paperStyle:{
                    height:'64px',
                    padding:'10px',
                    cursor:'pointer',
                    overflow:'hidden'
                }
            })
        }
    }
    render () {
        {   let settlement = this.props.settlement;
            // let arr = this.smartSettle(this.props.settlement)
            let email = settlement.email;
            let {totalDues} = settlement;
            if(totalDues === 0){
                return(
                    <Paper style={this.state.paperStyle} onClick={this.heightChange}>
                        <b>{email}</b>
                        <p style={{color:'#757575',margin:'0'}}>settled up!</p>
                        {
                            this.props.arr.map(elem=>{
                                if(settlement.email === elem.giver){
                                    return <p>{elem.giver} owes &#8377;{elem.amount} to {elem.receiver}</p>
                                }
                                else if(settlement.email === elem.receiver){
                                    return <p>{elem.receiver} gets back &#8377;{elem.amount} from {elem.giver}</p>
                                }
                            })
                        }
                    </Paper>
                )
            }
            else if(totalDues<0){
                return(
                    <Paper style={this.state.paperStyle} onClick={this.heightChange}>
                        <p style={{fontSize:'20px',margin:'0'}}>{email}</p>
                        <p style={{color:'#43a047',margin:'0'}}>gets back <b>&#8377;{Math.abs(totalDues)}</b></p>
                        <br/>
                        <br/>
                        {
                            this.props.arr.map(elem=>{
                                if(settlement.email === elem.giver){
                                    return <p>{elem.giver} owes &#8377;{elem.amount} to {elem.receiver}</p>
                                }
                                else if(settlement.email === elem.receiver){
                                    return <p>{elem.receiver} gets back &#8377;{elem.amount} from {elem.giver}</p>
                                }
                            })
                        }
                        
                    </Paper>
                )
            }
            else if(totalDues>0){
                return(
                    <Paper style={this.state.paperStyle} onClick={this.heightChange}>
                        <p style={{fontSize:'20px',margin:'0'}}>{email}</p>
                        <p style={{color:'#f44336',margin:'0'}}>owes <b>&#8377;{Math.abs(totalDues)}</b></p>
                        <br/>
                        <br/>
                        {
                            this.props.arr.map(elem=>{
                                if(settlement.email === elem.giver){
                                    return <p>{elem.giver} owes &#8377;{elem.amount} to {elem.receiver}</p>
                                }
                                else if(settlement.email === elem.receiver){
                                    return <p>{elem.receiver} gets back &#8377;{elem.amount} from {elem.giver}</p>
                                }
                            })
                        }
                        
                    </Paper>
                )
            }
        }
    }
}

export default GroupSettlementsList