import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import GroupSettlementsList from './mini/GroupSettlementsList' 

class GroupSettlements extends Component {
    constructor(props){
        super(props)
    }
    splitBillAlgo=(details)=>{
        let settlements = [];
        let sortByAscending = (details)=>{
            details.sort((a,b)=>{
                return a.diff-b.diff
              });
        }
        sortByAscending(details);
        while(details.length > 1){
            if((details[0].diff + details[details.length-1].diff) < 0){
              let amount = Math.min(Math.abs(details[0].diff),Math.abs(details[details.length-1].diff));
              settlements.push({
                receiver:details[details.length-1].email,
                giver:details[0].email,
                amount
              })
              details[0].diff += amount;
              details.pop();
              sortByAscending(details);
            }
            else if((details[0].diff + details[details.length-1].diff) > 0){
              let amount = Math.min(Math.abs(details[0].diff),Math.abs(details[details.length-1].diff));
              settlements.push({
                receiver:details[details.length-1].email,
                giver:details[0].email,
                amount
              })
                details[details.length-1].diff -= amount;
                details.shift();
                sortByAscending(details);
            }
            else{
                settlements.push({
                receiver:details[details.length-1].email,
                giver:details[0].email,
                amount:Math.abs(details[0].diff)
              })
              details.pop();
              details.shift();
            //   sortByAscending(details);
            }
          }
          return settlements;
      }
    smartSettle=(groupSettlements)=>{
        let formatArr = [];
        groupSettlements.forEach(function(element) {
            if(element.totalDues !== 0){
                formatArr.push({
                    email:element.email,
                    diff:-element.totalDues
                })
            }
        });
        return this.splitBillAlgo(formatArr);
    }
    render () {
        let arr = this.smartSettle(this.props.groupSettlements)
        console.log('settlements',arr);
        return (
            <div>
                <h2 style={{marginTop:'0',color:'#616161'}}>Group Balances</h2>
                {this.props.groupSettlements.map(
                    (settlement)=>{
                        return(
                            <GroupSettlementsList arr={arr} settlement={settlement}/>
                        )
                    }
                )}
                
            </div>
        )
    }
}

export default GroupSettlements