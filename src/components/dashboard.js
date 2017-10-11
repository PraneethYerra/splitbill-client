import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AddSettle from './mini/AddSettle'
import axios from 'axios'
import GroupBillList from './mini/GroupBillList'
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            settlements:[],
            bills:[]
        }
    }
    componentDidMount () {
        axios.get(`/summary`).then(res=>{
            if(res.status===200){
              this.setState({
                settlements:res.data.settlements
              })
            }
            else{
              alert('something went wrong')
            }
          }).catch(err=>{
            console.log(err)
          })
          axios.get(`/dashboard`).then(res=>{
            if(res.status===200){
              this.setState({
                bills:res.data
              })
            }
            else{
              alert('something went wrong')
            }
          }).catch(err=>{
            console.log(err)
          })
    }
    checkForTotalBalance=(totalBalance)=>{
        if(totalBalance<=0){
            return(
                <Col md={4}>
                    <p style={{margin:'0px',fontSize:"18px"}}>Total Balance</p>
                    <p style={{margin:'0px',fontSize:'20px',fontWeight:'600'}}>&#8377;{totalBalance}</p>
                </Col>
            )
        }
        else{
            return(
                <Col md={4}>
                    <p style={{margin:'0px',fontSize:"18px"}}>Total Balance</p>
                    <p style={{margin:'0px',fontSize:'20px',fontWeight:'600'}}>&#8377;{totalBalance}</p>
                </Col>
            )
        }
    }
    checkForYouOwe=(owe)=>{
        if(owe<0){
            return(
            <Col md={4}>
                <p style={{margin:'0px',fontSize:"18px"}}>You Owe</p>
                <p style={{margin:'0px',fontSize:'20px',fontWeight:'600'}}>&#8377;{Math.abs(owe)}</p>
            </Col>
            )
        }
        else{
            return(
                <Col md={4}>
                <p style={{margin:'0px',fontSize:"18px"}}>You Owe</p>
                <p style={{margin:'0px',fontSize:'20px',fontWeight:'600'}}>&#8377;{Math.abs(owe)}</p>
            </Col>
            )
        }
    }
    checkForYouOwed=(owed)=>{
        if(owed<0){
            return(
                <Col md={4}>
                    <p style={{margin:'0px',fontSize:"18px"}}>You are owed</p>
                    <p style={{margin:'0px',fontSize:'20px',fontWeight:'600'}}>&#8377;{Math.abs(owed)}</p>
                </Col>
            )
        }
        else{
            return(
                <Col md={4}>
                    <p style={{margin:'0px',fontSize:"18px"}}>You are owed</p>
                    <p style={{margin:'0px',fontSize:'20px',fontWeight:'600'}}>&#8377;{Math.abs(owed)}</p>
                </Col>
            )
        }
    }
    render(){
        let {settlements} = this.state
        if(settlements.length===0){
            return(
                <div>
                    <b style={{fontSize:"30px",color:'#ff4081'}}>{this.props.dashHeading}</b>
                    <h2>No Bills Yet</h2>
                </div>
            )
        }
        else{
            let owed = 0;
            let owe = 0;
            settlements.forEach((object)=>{
                let totalDues = object.totalDues;
                if(object.totalDues>0){
                    owed+=totalDues
                }
                if(object.totalDues<0){
                    owe+=totalDues
                }
            })
            
            return( 
                    <div>
                        <Row>
                            {this.checkForTotalBalance(owed+owe)}
                            {this.checkForYouOwe(owe)}
                            {this.checkForYouOwed(owed)}
                        </Row>
                        {
                            this.state.bills.map((billData,index)=>{
                                return (
                                    <GroupBillList billData={billData} key={index}/>
                                )
                            })
                        }
                    </div>
            )
            

        }
    }
}

export default Dashboard