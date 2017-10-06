import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

class AddFriendDialog extends Component {
    constructor(props){
        super(props);
        this.state={
            friendDialogOpen: false
        }
        
    }
    handleOpen = () => {
        this.setState({friendDialogOpen: true});
      };
    
      handleClose = () => {
        this.setState({friendDialogOpen: false});
      };
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
              onClick={()=>{this.handleClose();}}
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
                floatingLabelText="Friend Email"
                fullWidth={true}
                />                                               
            </Dialog>
            </div>
        )
    }
}

export default AddFriendDialog