import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios'

class AddFriendDialog extends Component {
    constructor(props){
        super(props);
        this.state={
            friendDialogOpen: false,
            friendEmail:'',
            snackOpen:false,
            message:'',
        }
        
    }
    handleOpen = () => {
        this.setState({friendDialogOpen: true});
      };
    
      handleClose = () => {
        this.setState({
          friendDialogOpen: false,
          friendEmail:''
        });
      };

      handleTouchTap = (message) => {
        this.setState({
          snackOpen: true,
          message
        });
      };
    
      handleRequestClose = () => {
        this.setState({
          snackOpen: false,
        });
      };
      submitForm(){
          
        axios.post(`/add-friend`,{friendEmail:this.state.friendEmail}).then(res=>{
            if(res.data.success){
                this.handleClose();
                this.handleTouchTap(res.data.message);
            }
            if(!res.data.success){
            
              // this.handleClose();
              this.handleTouchTap(res.data.message);
            }
          }).catch(err=>{
            console.log(err);            
          })
        
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
                title="Add Friend"
                actions={actions} 
                modal={false}
                open={this.state.friendDialogOpen}
                onRequestClose={this.handleClose}
                >
                <TextField
                autoFocus
                floatingLabelText="Friend Email"
                fullWidth={true}
                value={this.state.friendEmail}
                onChange={(e)=>{this.setState({friendEmail:e.target.value})}}
                />                                               
            </Dialog>
            <Snackbar
            open={this.state.snackOpen}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            />
            </div>
        )
    }
}

export default AddFriendDialog