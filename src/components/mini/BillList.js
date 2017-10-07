import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid'
import BillFeed from '../BillFeed'
import Paper from 'material-ui/Paper'
const userDetails = {
    email:window.localStorage.getItem('email'),
    displayName: window.localStorage.getItem('displayName')
}
class BillList extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            style: {heightToggle:{height:'80px',overflow:'hidden'}}
        }

    }
    heightChange(){
        if(this.state.style.heightToggle.height==='80px')
        this.setState({style: {heightToggle:{minHeight:'200px',overflow:'hidden'}}})
        else
        this.setState({style: {heightToggle:{height:'80px',overflow:'hidden'}}})
    }
    displayPeoplePaid(numOfPeoplePaid,bill){
        if(numOfPeoplePaid === 1){
            // return `you paid ${bill}`
            return(
                <div>
                    <p style={{margin:'0px'}}>you paid</p>
                    <p style={{margin:'0px',fontSize:'22px',fontWeight:'600'}}>&#8377;{bill}</p>
                </div>
            )
        }
        else{
            // return `${numOfPeoplePaid} people paid ${bill}`
            return(
                <div>
                    <p style={{margin:'0px'}}>{numOfPeoplePaid} people paid</p>
                    <p style={{margin:'0px',fontSize:'22px',fontWeight:'600'}}>&#8377;{bill}</p>
                </div>
            )
        }
    }
    displaySettlement(settlements){
        let settlementArr =  settlements.filter((settlement)=>{
            if((settlement.giver === userDetails.email && settlement.receiver === this.props.friendEmail) || (settlement.receiver === userDetails.email && settlement.giver === this.props.friendEmail))
            return true;
        });
        if(settlementArr.length === 0)
            return(
                <div>
                    <p style={{margin:'0px'}}>you borrowed </p>
                    <p style={{margin:'0px'}}>nothing</p>
                </div>
            )
        let settlement = settlementArr[0];
        if(settlement.receiver === userDetails.email){
            // return `you lent ${settlement.giver} Rs.${settlement.amount}`
            return(
                <div>
                    <p style={{margin:'0px'}}>you lent {settlement.giver}</p>
                    <p style={{margin:'0px',fontSize:'22px',fontWeight:'600'}}>&#8377;{settlement.amount}</p>
                </div>
            )
        }
        if(settlement.giver === userDetails.email){
            // return `${settlement.receiver} lent you Rs.${settlement.amount}`
            return(
                <div>
                    <p style={{margin:'0px'}}>{settlement.receiver} lent you</p>
                    <p style={{margin:'0px',fontSize:'22px',fontWeight:'600'}}>&#8377;{settlement.amount}</p>
                </div>
            )
        }
    }
    displayAllUserBillDetails(billDetails){
        return (
            billDetails.map((billDetail)=>{
                return (
                    <p style={{margin:'0px',padding:'10px'}}><b>{billDetail.email}</b> paid <b>&#8377;{billDetail.paid}</b></p>
                )
            })
        )
    }
    
    render () {
        return (
            <Paper style={this.state.style.heightToggle} onClick={()=>this.heightChange()}>
                                <div className="outer" style={{cursor:'pointer',padding:'10px'}}>
                                
                                    <Row>
                                        <Col md={1}>
                                            <div className="date">
                                                <p style={{margin:'1px 0px'}}>SEP</p>
                                                <p style={{fontSize:'24px',margin:'5px 0px'}}>19</p>
                                            </div>
                                        </Col>
                                        <Col md={5}>
                                            <div className="description" style={{display:'inline-block'}}>
                                                <p style={{fontSize:'26px',fontWeight:'500'}}>{this.props.billData.description}</p>
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <div style={{display:'inline-block'}}>
                                                <p style={{margin:'0'}}>{this.displayPeoplePaid(this.props.billData.numOfPeoplePaid,this.props.billData.bill)}</p>
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <div style={{display:'inline-block',paddingLeft:'10px'}}>
                                                <p style={{margin:'0'}}>{this.displaySettlement(this.props.billData.settlements)}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                </div>
                                
                                {this.displayAllUserBillDetails(this.props.billData.details)}
                                
                            </Paper>

        )
    }
}

export default BillList