import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import FriendsList from './components/FriendsList'
import NavBar from './components/NavBar'
import BillForm from './components/BillForm'
import BillFeed from './components/BillFeed'
import CustomList from './components/mini/CustomList'
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Grid>
          {/* <NavBar/>
          <Row>
            <Col md={3}>
            <FriendsList/>
            </Col>
          </Row> */}
          <Row>
            <Col md={5}>
              <BillForm/>
            </Col>
            <Col md={5}>
              <BillFeed/>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
