import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper';

class CustomList extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <Paper zDepth={1}>
            <List >
            <Row>
            <Col md={5}>
            <ListItem primaryText={'you'} leftIcon={<AccountCircle />}/>
            </Col>
            <Col md={2}>
            <TextField type="number" hintText={'amount paid'}
             onChange={(e)=>{this.props.changeCurrentUserAmount(e.target.value)}}/>
            </Col>
            </Row>
                {this.props.people.map((person,index)=>{
                    return (
                        <Row key={index}>
                        <Col md={5}>
                        <ListItem key={index} primaryText={person} leftIcon={<AccountCircle />}/>
                        </Col>
                        <Col md={2}>
                        <TextField type="number" key={index} hintText={'amount paid'}
                         onChange={(e)=>{this.props.changePersonPaidAmount(index,e.target.value)}}/>
                        </Col>
                        </Row>
                    )
                })}
            </List>
            </Paper>
        )
    }
}

export default CustomList