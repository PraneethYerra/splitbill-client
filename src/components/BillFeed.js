import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios'
import Paper from 'material-ui/Paper'
import BillList from './mini/BillList'
// import ToggleDisplay from 'react-toggle-display'

class BillFeed extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            style: {heightToggle:{height:'80px',overflow:'hidden'}}
        }
    }
    // componentDidMount () {
    //     axios.get('/bills/cool').then(res=>{
    //         if(res.status === 200){
    //             this.setState({
    //                 bills:res.data
    //             })
    //             // alert('status 200')
    //         }
    //         else{
    //             alert('something went wrong')
    //         }
    //     }).catch(err=>{
    //         console.log(err);
    //     })
    // }
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
            if((settlement.giver === 'srksumanth@gmail.com' && settlement.receiver === 'cool') || (settlement.receiver === 'srksumanth@gmail.com' && settlement.giver === 'cool'))
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
        if(settlement.receiver === 'srksumanth@gmail.com'){
            // return `you lent ${settlement.giver} Rs.${settlement.amount}`
            return(
                <div>
                    <p style={{margin:'0px'}}>you lent {settlement.giver}</p>
                    <p style={{margin:'0px',fontSize:'22px',fontWeight:'600'}}>&#8377;{settlement.amount}</p>
                </div>
            )
        }
        if(settlement.giver === 'srksumanth@gmail.com'){
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
                            <BillList billData={billData} key={index}/>
                        )
                    })
                }
            </div>      
        )
    }
}

export default BillFeed