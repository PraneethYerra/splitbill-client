import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AddSettle from './mini/AddSettle'

class Dashboard extends Component{

    render(){

        return(
            <div>
                
                    <AddSettle dashHeading = {this.props.dashHeading}/>
                    <Row>
                        <Col md={4}>
                            {/* <p style={{fontSize:"24px"}}>Balance <br/>{this.state.balance}</p> */}
                        </Col>
                        <Col md={4}>
                        
                        </Col>
                        <Col md={4}>
                        
                        </Col>
                    </Row>
                
            </div>
        )
    }
}

export default Dashboard