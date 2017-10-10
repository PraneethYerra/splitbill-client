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
import AutoComplete from 'material-ui/AutoComplete';
import SelectGroup from './mini/SelectGroup'
const userDetails = {
    email:window.localStorage.getItem('email'),
    displayName: window.localStorage.getItem('displayName')
}
const styles = {
    chip:{
        margin:4
    }
}
class BillForm extends Component {
    state = {
        description:'',
        descriptionError:'',
        bill:'',
        billError:'',
        value: 1,
        people:[],
        details:[],
        splitMethod:1,
        showPeopleBills:false,
        paidByUserOnly:true,
        userAmount:'',
        userPercent:''
        ,friends:[],
        focus:true,
        date:Date.now(),
        group:"0",
        newPeople:'',
        searchText:''
      };
      updateDate =(date)=>{
        this.setState({
            date
        })
      }
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
    AddPerson=(value,index)=>{
            console.log('hello',value)
            let newState = {...this.state}
            newState.searchText = '';   
            newState.people.push(value.email);
            newState.details.push({
                email:value.email,
                paid:'',
                percent:''
            })
            this.setState(newState)
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
                // userAmount:val
            })
        }
        else{
            this.setState({
                bill:val,
               
            })
         }
    }
      changeSplitMethod = (event, index, splitMethod) => this.setState({splitMethod});
      submitForm(){
        let numOfPeoplePaid = 0
        let billData = {
            by:userDetails.email,
            description:this.state.description.trim().charAt(0).toUpperCase() + this.state.description.trim().slice(1),
            people:[userDetails.email].concat(this.state.people),
            bill:Number(this.state.bill.trim()),
            details:[],
            splitMethod:this.state.splitMethod,
            date:this.state.date,
            group:this.state.group
        };

          let calculatedbill = 0;
          calculatedbill += Number(this.state.userAmount);
          if(billData.description===''){
            this.setState({
                descriptionError:'Enter a valid Description !'
            })
            return;
            }
          if(billData.bill===0){
              console.log(billData.bill)
              this.setState({
                  billError:'Enter a valid Bill Amount !'
              })
              return;
          }

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
                  billData.details.push({email:billData.by,paid:billData.bill})
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
                  receiver:userDetails.email,
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
                giver:userDetails.email,
                amount:totalBill/100 * detail.percent
            })
        })
        return settlements;
    }
    getFriends=()=>{
        this.setState({
            focus:false
        })
        axios.get('/friends').then(res=>{
            this.setState({
                friends : res.data,
            })
        })
    }
    changeGroup = (event,index,group)=>{
        this.setState({
            group
        })
    }
    render () {
        const dataSourceConfig = {
            text: 'displayName',
            value: 'email',
          };
        return (
            <div>
                <form>
                <TextField floatingLabelText="Description" value={this.state.description}
                onChange={(e)=>{this.setState({description:e.target.value})}}
                errorText={this.state.descriptionError}
                autoFocus={true}/> 
                <span> &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <TextField type="number" floatingLabelText="Bill Amount" value={this.state.bill}
                onChange={this.onBillChange.bind(this)}
                errorText={this.state.billError}/> 

                 <SelectGroup group={this.state.group} changeGroup={this.changeGroup}/> 
                <br/>

                
                {/* <SelectField floatingLabelText="split" value={this.state.splitMethod} onChange={this.changeSplitMethod}>
                    <MenuItem value={1} primaryText="Split Equally" />
                    <MenuItem value={2} primaryText="Split By Percentage" />
                </SelectField>   */}
                {/* <TextField onKeyDown={this.AddPerson.bind(this)} 
                           floatingLabelText="Type to add Friends"
                           onFocus={this.state.focus?this.getFriends:null}
                           /> */}
                           <AutoComplete 
                           floatingLabelText="Type to add people"
                           onFocus={this.state.focus?this.getFriends:null}
                            filter={AutoComplete.Filter}
                            openOnFocus={true}
                            dataSource={this.state.friends}
                            dataSourceConfig={dataSourceConfig}
                            onNewRequest={(value,index)=>{this.AddPerson(value,index)}}
                            onUpdateInput={(searchText)=>{this.setState({searchText})}}
                            searchText={this.state.searchText}
                            />
    
                <PeopleChips updatePeopleData={this.updatePeopleData.bind(this)} people={this.state.people}/>
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
                 userAmount={this.state.userAmount}
                 />

                </ToggleDisplay>     
                <br></br>
                <DateField updateDate={this.updateDate}/>
                <br></br>
                <RaisedButton onClick={this.submitForm.bind(this)} label="Add Bill" primary={true} />              
                </form>
            </div>
        )
    }
}

export default BillForm