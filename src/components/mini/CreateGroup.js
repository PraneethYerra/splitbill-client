import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import PeopleChips from './PeopleChips'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios'

class CreateGroup extends Component {
    constructor(props){
        super(props);
        this.state={
            createGroupDialogOpen: false,
            groupSnackOpen:false,
            groupName : '',
            groupPeople :[]
        }
        
    }
    handleOpen = () => {
        this.setState({createGroupDialogOpen: true});
      };
    
      handleClose = () => {
        this.setState({createGroupDialogOpen: false});
      };

      handleTouchTap = () => {
        this.setState({
          groupSnackOpen: true,
        });
      };
    
      handleRequestClose = () => {
        this.setState({
          groupSnackOpen: false,
        });
      };
      submitForm(){
        let groupData = {
          name : this.state.groupName,
          people : [window.localStorage.getItem('email')].concat(this.state.groupPeople),
          settlements:[]
        }
        groupData.people.forEach((person)=>{
          groupData.settlements.push({
            email:person,
            dues:[],
            totalDues:0,
          })
        })
        console.log('group data',groupData)
        axios.post(`/create-group`,groupData).then(res=>{
            if(res.status === 200){
                // alert('posted successfully')
                this.handleClose();
                this.handleTouchTap();
            }
          }).catch(err=>{
            console.log(err);            
          })
        
      }
      AddPerson(e){
        if(e.keyCode == 13){
            let newState = {...this.state}
            newState.groupPeople.push(e.target.value);
            e.target.value = ''
            this.setState(newState)
        }
    }
    updatePeopleData(indexToDelete){
      let newState = {...this.state};
      newState.groupPeople.splice(indexToDelete,1);
      this.setState(newState);
  }
    render () {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              /* keyboardFocused={true} */
              onClick={this.submitForm.bind(this)}
            />,
          ];
        return (
            <div style={{position:'relative',top:'10px',display:'inline-block'}}>
            <FloatingActionButton mini={true} onClick={this.handleOpen} >
                <ContentAdd />
            </FloatingActionButton>
            <Dialog
                title="Create Group"
                actions={actions} 
                modal={false}
                open={this.state.createGroupDialogOpen}
                onRequestClose={this.handleClose}
                >
                <TextField
                floatingLabelText="Group Name"
                fullWidth={true}
                value={this.state.groupName}
                onChange={(e)=>{this.setState({groupName:e.target.value})}}
                />
                <TextField onKeyDown={this.AddPerson.bind(this)} floatingLabelText="Type to add people"/>
    
                <PeopleChips updatePeopleData={this.updatePeopleData.bind(this)} people={this.state.groupPeople}/>                                               
            </Dialog>
            <Snackbar
            open={this.state.groupSnackOpen}
            message="Group Added Successfully"
            autoHideDuration={5000}
            onRequestClose={this.handleRequestClose}
            />
            </div>
        )
    }
}

export default CreateGroup