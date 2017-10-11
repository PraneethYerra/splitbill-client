import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import BillForm from '../BillForm'
import AutoComplete from 'material-ui/AutoComplete';
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
class AddSettle extends Component {
    constructor(props){
        super(props);
        this.state  = {
            open: false,
            settleOpen:false,
            friendSource:[],
            friendEmail:'',
            settleAmount:'',
            submitMessage:'',
            submitSnack:false
        }
    }

    handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      settleHandleOpen = () => {
        this.setState({settleOpen: true});
      };
    
      settleHandleClose = () => {
        this.setState({settleOpen: false});
      };
      getFriends=()=>{
        axios.get('/friends').then(res=>{
            this.setState({
                friendSource:res.data.map((object)=>{
                    return object.email;
                })
            })
        }).catch(err=>{
            console.warn(err)
        })
      }
      getFriendSettlements=()=>{
          let friendEmail = this.state.friendEmail.trim();
        axios.get(`/smart-settle/${friendEmail}`).then(res=>{
            this.setState({
                settleAmount:Number(res.data.totalDues)
            })
        }).catch(err=>{
            console.warn(err)
        })
      }
      displayFetchAmount=()=>{
        if(this.state.settleAmount===''){
            
            return(
                <span></span>
            )
        }
        if(this.state.settleAmount===0){
            return(
                <span>No Bill</span>
            )
        }
        if(this.state.settleAmount>0){
            return(
               <p>You get <span style={{color:'#43a047'}}>&#8377;{this.state.settleAmount}</span></p>
            )
        }
        if(this.state.settleAmount<0){
            return(
                <p>You need to pay <span style={{color:'#f44336'}}>&#8377;{Math.abs(this.state.settleAmount)}</span></p>
            )
        }
      }
      submitSettle=()=>{
          if(this.state.settleAmount===''){
                this.setState({
                    submitSnack:true,
                    submitMessage:"Enter a Valid Friend Email"
                })
                return
          }
          if(this.state.settleAmount===0){
            this.setState({
                submitSnack:true,
                submitMessage:"Already Settled !"
            })
            return
          }
          if(this.state.settleAmount>0||this.state.settleAmount<0){
            axios.get(`/global-settle/${this.state.friendEmail.trim()}`).then(res=>{
                if(res.data.success){
                    this.setState({
                        submitSnack:true,
                        submitMessage:"Settled!",
                        settleOpen:false
                    })  
                }
            }).catch(err=>{
                console.log(err)
                this.setState({
                    submitSnack:true,
                    submitMessage:"Somethimg Went Wrong"
                })
            })
            
          }
      }
      handleRequestClose = () => {
        this.setState({
          submitSnack: false,
        });
      };
    
    render () {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.settleHandleClose}
            />,
            <FlatButton
              label="Settle"
              primary={true}
              /* keyboardFocused={true} */
              onClick={()=>{this.submitSettle()}}
            />,
          ];
          
        return (
                    <div style={{display:'inline-block'}}>
                        {/* <Col md={7}><b style={{fontSize:"30px",color:'#616161'}}>{this.props.dashHeading}</b></Col>  */}
                        {/* <Col md={6}> */}
                                <RaisedButton label="Add Bill" secondary={true} onClick={this.handleOpen} style={{marginRight:'40px'}}/>
                                <Dialog
                                title="Add Your Bill"
                                /* actions={actions} */
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                                autoScrollBodyContent={true}
                                >
                                <BillForm />                             
                                </Dialog>
                        {/* </Col>
                        <Col md={6}> */}
                            <RaisedButton label="Settle" secondary={true} onClick={()=>{this.settleHandleOpen();
                                                                                        this.getFriends()}}
                                                                                        style={{marginRight:'40px'}}/>
                            <Dialog
                                title="Settle Up"
                                actions={actions} 
                                modal={false}
                                open={this.state.settleOpen}
                                onRequestClose={this.settleHandleClose}
                                autoScrollBodyContent={true}
                                >
                                <AutoComplete
                                floatingLabelText="Friend Email"
                                filter={AutoComplete.Filter}
                                openOnFocus={true}
                                dataSource={this.state.friendSource}
                                onNewRequest={(value,index)=>{this.setState({friendEmail:value})}}
                                />
                                <FlatButton label="Fetch Amount" style={{marginLeft:'20px',marginRight:'20px'}} onClick={this.getFriendSettlements}/>
                                {this.displayFetchAmount()}                            
                                </Dialog>
                                <Snackbar
                                open={this.state.submitSnack}
                                message={this.state.submitMessage}
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                                />
                        {/* </Col> */}
                    </div>
            
        )
    }
}

export default AddSettle