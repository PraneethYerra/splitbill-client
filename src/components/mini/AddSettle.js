import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import BillForm from '../BillForm'

class AddSettle extends Component {
    constructor(props){
        super(props);
        this.state  = {
            open: false,
        }
    }

    handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

    render () {
        // const actions = [
        //     <FlatButton
        //       label="Cancel"
        //       primary={true}
        //       onClick={this.handleClose}
        //     />,
        //     <FlatButton
        //       label="Submit"
        //       primary={true}
        //       /* keyboardFocused={true} */
        //       onClick={()=>{this.handleClose();}}
        //     />,
        //   ];

        return (
                    <Row>
                        <Col md={7}><b style={{fontSize:"30px",color:'#616161'}}>{this.props.dashHeading}</b></Col> 
                        <Col md={3}>
                                <RaisedButton label="Add Bill" secondary={true} onClick={this.handleOpen}/>
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
                        </Col>
                        <Col md={2}>
                            <RaisedButton label="Settle" primary={true}/>
                        </Col>
                    </Row>
            
        )
    }
}

export default AddSettle