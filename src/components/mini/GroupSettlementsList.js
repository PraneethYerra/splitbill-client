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
            let email = settlement.email;
            let {totalDues} = settlement;
            if(totalDues === 0){
                return(
                    <Paper style={this.state.paperStyle} onClick={this.heightChange}>
                        <b>{email}</b>
                        <p style={{color:'#757575',margin:'0'}}>settled up!</p>
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
                        {settlement.dues.map(function(element){
                            if(element.due===0){
                                return ''
                            }
                            if(element.due>0){
                                return(
                                    <div>
                                        <p style={{margin:'0'}}>Owes <b style={{color:'#f44336'}}>&#8377;{Math.abs(element.due)}</b> to</p>
                                        <p style={{fontSize:'20px',margin:'0'}}>{element.email}</p>
                                    </div>
                                )
                            }
                            if(element.due<0){
                                return(
                                    <div>
                                        <p style={{margin:'0'}}>gets back <b style={{color:'#43a047'}}>&#8377;{Math.abs(element.due)}</b> from</p>
                                        <p style={{fontSize:'20px',margin:'0'}}>{element.email}</p>
                                    </div>
                                )
                            }
                        })}
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
                        {settlement.dues.map(function(element){
                            if(element.due===0){
                                return ''
                            }
                            if(element.due>0){
                                return(
                                    <div>
                                        <p style={{margin:'0'}}>Owes <b style={{color:'#f44336'}}>&#8377;{Math.abs(element.due)}</b> to</p>
                                        <p style={{fontSize:'20px',margin:'0'}}>{element.email}</p>
                                    </div>
                                )
                            }
                            if(element.due<0){
                                return(
                                    <div>
                                        <p style={{margin:'0'}}>gets back <b style={{color:'#43a047'}}>&#8377;{Math.abs(element.due)}</b> from</p>
                                        <p style={{fontSize:'20px',margin:'0'}}>{element.email}</p>
                                    </div>
                                )
                            }
                        })}
                    </Paper>
                )
            }
        }
    }
}

export default GroupSettlementsList