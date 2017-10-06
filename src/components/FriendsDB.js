import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import BillForm from './BillForm'
import BillFeed from './BillFeed'
import AddSettle from './mini/AddSettle'

class FriendsDB extends Component {

    
    
    render () {
        


        return (
            <div>
                <br/>
                <BillFeed />
            </div>
        )
    }
}

export default FriendsDB