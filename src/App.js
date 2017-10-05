import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import FriendsList from './components/FriendsList'
import NavBar from './components/NavBar'
import BillForm from './components/BillForm'
import BillFeed from './components/BillFeed'
import CustomList from './components/mini/CustomList'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import FriendsDB from './components/FriendsDB'
// import logo from './logo.svg';
// import './App.css';
import Dashboard from './components/dashboard'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dashHeading : 'Poorna Chandu' 
    }            
  }
  updateDashHeading(dashHeading){
    this.setState({dashHeading});
  }
  render() {
    return (
    
      <MuiThemeProvider>
      <NavBar/>
          <br />
        <Grid>
          <Row>
            <Col md ={3}>
              <Row>
                <List>
                <ListItem primaryText="Dashboard" leftIcon={<AccountCircle />}/>
                <FriendsList updateDashHeading ={this.updateDashHeading.bind(this)}/>
                </List>
              </Row>
            </Col> 
            <Col md={6}>
              <Dashboard dashHeading={this.state.dashHeading}/>
              <FriendsDB />
              <Row>
                <Col md={12}>
                  {/* <BillFeed /> */}
                </Col>
              </Row>
            </Col>
            <Col md={3}>
            
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
