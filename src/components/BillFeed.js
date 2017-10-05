import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios'
import Paper from 'material-ui/Paper'
class BillFeed extends Component {
    constructor(props){
        super(props)
        this.state = {
            bills:[]
        }
    }
    componentDidMount () {
        axios.get('/bills/cool').then(res=>{
            if(res.status === 200){
                this.setState({
                    bills:res.data
                })
                alert('status 200')
            }
            else{
                alert('something went wrong')
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    displayPeoplePaid(numOfPeoplePaid,bill){
        if(numOfPeoplePaid === 1){
            return `you paid ${bill}`
        }
        else{
            return `${numOfPeoplePaid} people paid ${bill}`
        }
    }
    displaySettlement(settlements){
        let settlementArr =  settlements.filter((settlement)=>{
            if((settlement.giver === 'srksumanth@gmail.com' && settlement.receiver === 'cool') || (settlement.receiver === 'srksumanth@gmail.com' && settlement.giver === 'cool'))
            return true;
        });
        let settlement = settlementArr[0];
        if(settlement.receiver === 'srksumanth@gmail.com'){
            return `you lent ${settlement.giver} Rs.${settlement.amount}`
        }
        if(settlement.giver === 'srksumanth@gmail.com'){
            return `${settlement.receiver} lent you Rs.${settlement.amount}`
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
                {
                    this.state.bills.map((billData,index)=>{
                        return (
                            <Paper>
                                <div style={{padding:"10px"}}>
                                <p>{billData.description}</p>
                                <p>{this.displayPeoplePaid(billData.numOfPeoplePaid,billData.bill)}</p>
                                <p>{this.displaySettlement(billData.settlements)}</p>
                                </div>
                                {this.displayAllUserBillDetails(billData.details)}
                            </Paper>
        
                        )
                    })
                }
            </div>      
        )
    }
}

export default BillFeed