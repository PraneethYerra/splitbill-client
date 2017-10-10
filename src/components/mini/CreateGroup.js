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
import AutoComplete from 'material-ui/AutoComplete';
class CreateGroup extends Component {
    constructor(props){
        super(props);
        this.state={
            createGroupDialogOpen: false,
            groupSnackOpen:false,
            groupName : '',
            groupPeople :[],
            friends:[],
            focus:true,
            searchText:'',
            groupNameError:''
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
          name : this.state.groupName.trim(),
          people : [window.localStorage.getItem('email')].concat(this.state.groupPeople),
          settlements:[]
        }
        if(groupData.name===''){
          this.setState({
            groupNameError:"Enter a valid Group name!"
          })
          return
        }
        groupData.people.forEach(function(person) {
          groupData.settlements.push({
            _id:person,
            email:person,
            dues:[],
            totalDues:0
          })
        });
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
      AddPerson(value,index){
        // if(e.keyCode == 13){
            let newState = {...this.state}
            newState.searchText = '';
            newState.groupPeople.push(value.email);
            this.setState(newState)
        //}
    }
    updatePeopleData(indexToDelete){
      let newState = {...this.state};
      newState.groupPeople.splice(indexToDelete,1);
      this.setState(newState);
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
    render () {
      const dataSourceConfig = {
        text: 'displayName',
        value: 'email',
      };
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
                onFocus={()=>{this.setState({groupNameFocus:false,groupNameError:''})}}
                value={this.state.groupName}
                onChange={(e)=>{this.setState({groupName:e.target.value})}}
                errorText={this.state.groupNameError}
                autoFocus={true}
                />
                {/* <TextField onKeyDown={this.AddPerson.bind(this)} floatingLabelText="Type to add people"/> */}
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