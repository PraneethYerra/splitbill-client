import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import BillForm from './BillForm'

class Dashboard extends Component{

    state = {
        open: false,
        user:"Poorna Chandu",
        balance:"250 rs",
        owe: "100 rs",
        owed: "350 rs"
      };
    
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

    render(){

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
              onClick={this.handleClose}
            />,
          ];

        return(
            <MuiThemeProvider>
                <Grid>
                    <Row>
                        <Col md={8}><b style={{fontSize:"30px"}}>Hey {this.state.user} !</b></Col> 
                        <Col md={2}>
                                <RaisedButton label="Add Bill" secondary={true} onClick={this.handleOpen}/>
                                <Dialog
                                title="Add Your Bill"
                                actions={actions}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                                >
                                <BillForm />                               
                                </Dialog>
                        </Col>
                        <Col md={2}>
                            <RaisedButton label="Settle" primary={true}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <p style={{fontSize:"24px"}}>Balance <br/>{this.state.balance}</p>
                        </Col>
                        <Col md={4}>
                        
                        </Col>
                        <Col md={4}>
                        
                        </Col>
                    </Row>
                </Grid>
            </MuiThemeProvider>
        )
    }
}

export default Dashboard