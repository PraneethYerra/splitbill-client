import React, { Component } from 'react'
import axios from 'axios'
import TextField from 'material-ui/TextField'
import PeopleChips from './mini/PeopleChips'
import DateField from './mini/DateField'
import Chip from 'material-ui/Chip'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CustomList from './mini/CustomList'
import ToggleDisplay from 'react-toggle-display'
import Paper from 'material-ui/Paper';
const styles = {
    chip:{
        margin:4
    }
}

class BillForm extends Component {
    state = {
        description:'',
        bill:'',
        value: 1,
        people:[],
        details:[],
        splitMethod:1,
        showPeopleBills:false,
        paidByUserOnly:true,
        userAmount:'',
        userPercent:''
      };
    changeCurrentUserAmount(amount){
        this.setState({
            userAmount:amount
        })
    }
    changeCurrentUserPercent(percent){
        this.setState({
            userPercent:percent
        })
    }
    changePersonPaidAmount(index,amount){
        let newDetails = [...this.state.details];
        // let personEmail = newDetails[index].email;
        // newDetails.splice(index,1,{email:personEmail,paid:amount});
        newDetails[index].paid = amount;
        this.setState({details:newDetails});
    }
    changePersonPercent(index,percent){
        let newDetails = [...this.state.details];
        newDetails[index].percent = percent;
        this.setState({details:newDetails});
    }
    AddPerson(e){
        if(e.keyCode == 13){
            let newState = {...this.state}
            newState.people.push(e.target.value);
            newState.details.push({
                email:e.target.value,
                paid:'',
                percent:''
            })
            e.target.value = '',
            this.setState(newState)
        }
    }
    updatePeopleData(indexToDelete){
        let newState = {...this.state};
        newState.people.splice(indexToDelete,1);
        newState.details.splice(indexToDelete,1);
        this.setState(newState);
    }
    togglePeopleBills(){
        this.setState({
            showPeopleBills:!this.state.showPeopleBills,
            paidByUserOnly:!this.state.paidByUserOnly
        })
    }
    paidByTag(){
        if(this.state.showPeopleBills){
            return 'mutiple people'
        }
        else return 'you'
    }
    onBillChange(e){
        let val = e.target.value;
        if(this.state.paidByUserOnly){
            this.setState({
                bill:val,
                userAmount:val
            })
        }
        else{
            this.setState({
                bill:val
            })
         }
    }
      changeSplitMethod = (event, index, splitMethod) => this.setState({splitMethod});
      submitForm(){
        let numOfPeoplePaid = 0
        let billData = {
            by:"srksumanth@gmail.com",
            description:this.state.description,
            people:["srksumanth@gmail.com"].concat(this.state.people),
            bill:this.state.bill,
            details:[],
            splitMethod:this.state.splitMethod
        };
          let calculatedbill = 0;
          calculatedbill += Number(this.state.userAmount);
          if(!this.state.paidByUserOnly){//if paid by multiple people
                this.state.details.forEach(info=>{
                    calculatedbill += Number(info.paid);
                })
                if(Number(this.state.bill) !== calculatedbill){
                    alert("Individuals amount doesn't match total bill");
                    return;
              }
              else{//
                alert('ready to send data!!');
                
                billData.details.push({email:billData.by,paid:Number(this.state.userAmount)})
                this.state.details.forEach((detail)=>{
                    billData.details.push({
                        email:detail.email,
                        paid:Number(detail.paid)
                    });
                    if(Number(detail.paid) > 0) //excludes user
                    numOfPeoplePaid++;
                })
                if(Number(this.state.userAmount) > 0) numOfPeoplePaid++ //includes user
                billData.numOfPeoplePaid = numOfPeoplePaid
                if(this.state.splitMethod === 1){
                    alert('wow')
                billData.settlements = this.getSettlementsForEqualSplit(billData.bill,billData.details)
                }
                if(this.state.splitMethod === 2)
                billData.settlements = this.getSettlementsForEqualSplit(billData.bill,this.state.details)

              }
          }
          
          else{//paid by user only
              alert('ready to send data!!');
              numOfPeoplePaid = 1;
                  billData.details.push({person:billData.by,paid:billData.bill})
                  this.state.details.forEach((detail)=>{
                      billData.details.push({
                          email:detail.email,
                          paid:0
                      })
                  })
                  billData.numOfPeoplePaid = numOfPeoplePaid
                  if(this.state.splitMethod === 1)
                  billData.settlements = this.settleEqualUserOnly(billData.bill,this.state.details)
                  if(this.state.splitMethod === 2)
                  billData.settlements = this.settleUnEqualUserOnly(billData.bill,this.state.details)
            
          }
          console.log('billdata',billData)
        //   make a post request
        axios.post('/add-bill',billData).then(res=>{
            if(res.status === 200){
                alert('posted successfully')
            }
          }).catch(err=>{
            console.log(err);
          })

      }
      splitBillAlgo(details){
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

      getSettlementsForUnequalSplit(totalBill,details){
        let diffDetails = [];
        details.forEach((detail)=>{
            let diff = detail.paid - (totalBill/100 * detail.percent);
            diffDetails.push({
                email:detail.email,
                diff
            })
        });
        return this.splitBillAlgo(diffDetails);
      }
      getSettlementsForEqualSplit(totalBill,details){
          let diffDetails = [];
          details.forEach((detail)=>{
            let diff = detail.paid - (totalBill/details.length);
            diffDetails.push({
                email:detail.email,
                diff
            })
        });
        return this.splitBillAlgo(diffDetails);
      }
      settleEqualUserOnly(totalBill,details){
          let settlements = [];
          details.forEach((detail)=>{
              settlements.push({
                  receiver:'srksumanth@gmail.com',
                  giver:detail.email,
                  amount:totalBill/(details.length+1)
              })
          })
          return settlements;
      }
      settleUnEqualUserOnly(totalBill,details){
        let settlements = [];
        details.forEach((detail)=>{
            settlements.push({
                receiver:detail.email,
                giver:'srksumanth@gmail.com',
                amount:totalBill/100 * detail.percent
            })
        })
        return settlements;
    }
    render () {
        return (
            <div>
                <form>
                <TextField floatingLabelText="description" value={this.state.description}
                onChange={(e)=>{this.setState({description:e.target.value})}}/> 

                <TextField type="number" floatingLabelText="bill amount" value={this.state.bill}
                onChange={this.onBillChange.bind(this)}/> 
                {/* <SelectField floatingLabelText="split" value={this.state.splitMethod} onChange={this.changeSplitMethod}>
                    <MenuItem value={1} primaryText="Split Equally" />
                    <MenuItem value={2} primaryText="Split By Percentage" />
                </SelectField>   */}
                <TextField onKeyDown={this.AddPerson.bind(this)} floatingLabelText="type to add people"/>

                <PeopleChips updatePeopleData={this.updatePeopleData.bind(this)} people={this.state.people}/>
                <br></br>
                <span>Paid By</span><br></br>
                <Chip onClick={this.togglePeopleBills.bind(this)} style={styles.chip}> {this.paidByTag.call(this)} </Chip>

                <ToggleDisplay show={this.state.showPeopleBills}>

                <CustomList changeCurrentUserAmount={this.changeCurrentUserAmount.bind(this)}
                changePersonPaidAmount={this.changePersonPaidAmount.bind(this)}
                changeCurrentUserPercent={this.changeCurrentUserPercent.bind(this)}
                changePersonPercent={this.changePersonPercent.bind(this)}
                 people={this.state.people}
                 splitMethod = {this.state.splitMethod}
                 details = {this.state.details}
                 />

                </ToggleDisplay>     
                <br></br>
                <DateField/>
                <br></br>
                <RaisedButton onClick={this.submitForm.bind(this)} label="Add Bill" primary={true} />              
                </form>
            </div>
        )
    }
}

export default BillForm