import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios'
import Paper from 'material-ui/Paper'
import GroupList from './GroupList'
import GroupBillList from './mini/GroupBillList'

const userDetails = {
    email:window.localStorage.getItem('email'),
    displayName: window.localStorage.getItem('displayName')
}
class GroupFeed extends Component {
    constructor(props){
        super(props)
        this.state={
            bills:[]
        }
       
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
                    <p>{billDetail.email} paid {billDetail.paid}</p>
                )
            })
        )
    }
    render () {
        return (
            <div>
            <br/>
                {
                    this.props.bills.map((billData,index)=>{
                        return (
                            <GroupBillList billData={billData} key={index}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default GroupFeed