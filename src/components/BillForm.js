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
        bill:null,
        value: 1,
        people:[],
        details:[],
        split:1,
        showPeopleBills:false,
        paidByUserOnly:true,
        userAmount:''
      };
    changeCurrentUserAmount(amount){
        this.setState({
            userAmount:amount
        })
    }
    changePersonPaidAmount(index,amount){
        let newDetails = [...this.state.details];
        // let personEmail = newDetails[index].email;
        // newDetails.splice(index,1,{email:personEmail,paid:amount});
        newDetails[index].paid = amount;
        this.setState({details:newDetails});
    }
    AddPerson(e){
        if(e.keyCode == 13){
            let newState = {...this.state}
            newState.people.push(e.target.value);
            newState.details.push({
                email:e.target.value,
                paid:null
            })
            e.target.value = '',
            this.setState(newState)
        }
    }
    // updatePeopleData(people,index){
    //     let newState = {...this.state}
    //     newState.people = people;
    //     newState.details.splice(index,1);
    //     this.setState(newState);
    //     console.log('newdetails',newState.details)
    // }
    updatePeopleData(indexToDelete){
        let newState = {...this.state};
        newState.people.splice(indexToDelete,1);
        newState.details.splice(indexToDelete,1);
        this.setState(newState);
        console.log('newdetails',newState.details)
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
      handleChange = (event, index, split) => this.setState({split});
      submitForm(){
        let billData = {
            by:"srksumanth@gmail.com",
            people:["srksumanth@gmail.com"].concat(this.state.people),
            bill:this.state.bill,
            details:[]
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
                
                billData.details.push({person:billData.by,paid:Number(this.state.userAmount)})
                this.state.details.forEach((personDetails)=>{
                    billData.details.push({
                        person:personDetails.email,
                        paid:Number(personDetails.paid)
                    });
                })

              }
          }
          
          else{//paid by user only
              alert('ready to send data!!');
              
                  billData.details.push({person:billData.by,paid:billData.bill})
                  this.state.people.forEach((person)=>{
                      billData.details.push({
                          person:person,
                          paid:0
                      })
                  })
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
    render () {
        return (
            <div>
                <form>
                <TextField floatingLabelText="description" value={this.state.description}
                onChange={(e)=>{this.setState({description:e.target.value})}}/> 

                <TextField type="number" floatingLabelText="bill amount" value={this.state.bill}
                onChange={this.onBillChange.bind(this)}/> 

                <TextField onKeyDown={this.AddPerson.bind(this)} floatingLabelText="type to add people"/>

                <PeopleChips updatePeopleData={this.updatePeopleData.bind(this)} people={this.state.people}/>
                <br></br>
                <span>Paid By</span><br></br>
                <Chip onClick={this.togglePeopleBills.bind(this)} style={styles.chip}> {this.paidByTag.call(this)} </Chip>

                <ToggleDisplay show={this.state.showPeopleBills}>
                <CustomList changeCurrentUserAmount={this.changeCurrentUserAmount.bind(this)}
                changePersonPaidAmount={this.changePersonPaidAmount.bind(this)}
                 people={this.state.people}/>
                </ToggleDisplay>

                <SelectField floatingLabelText="split" value={this.state.split}onChange={this.handleChange}>
                    <MenuItem value={1} primaryText="Equally" />
                    <MenuItem value={2} primaryText="Unequally" />
                </SelectField>       
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