import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios'
import FriendsList from './components/FriendsList'
import NavBar from './components/NavBar'
import BillForm from './components/BillForm'
import BillFeed from './components/BillFeed'
import CustomList from './components/mini/CustomList'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import ViewAgenda from 'material-ui/svg-icons/action/view-agenda';
import {blue500, yellow600} from 'material-ui/styles/colors';
import FriendsDB from './components/FriendsDB'
import Settlements from './components/Settlements'
import Subheader from 'material-ui/Subheader';
import AddFriendDialog from './components/mini/AddFriendDialog'
import GroupList from './components/GroupList'
import CreateGroup from './components/mini/CreateGroup'
import ToggleDisplay from 'react-toggle-display';
import GroupFeed from './components/GroupFeed'
// import logo from './logo.svg';
// import './App.css';
import Dashboard from './components/dashboard'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dashHeading : '' ,
      bills:[],
      grouBills:[],
      friendEmail:'',
      dashFeed:true,
      friendsFeed:false,
      groupsFeed:false,
      settlements:[]      
    }            
  }
  componentDidMount () {
    axios.get('/user').then(res=>{
      let user = res.data
      this.setState({
        dashHeading : user.displayName
      })
      window.localStorage.setItem('email',user.email)
      window.localStorage.setItem('displayName',user.displayName)
    })
  }
  
  updateDashHeading(dashHeading){
    this.setState({dashHeading});
  }
  updateBillFeed(email,displayName){
    // alert(email)
    this.updateFriendsSettlements(email);
    axios.get(`bills/${email}`).then(res=>{
      let bills  = res.data;
      // alert('waiting to update bill')
      this.setState({
        dashHeading :displayName,
        bills,
        friendEmail:email,
        dashFeed:false,
        friendsFeed:true,
        groupsFeed:false
      })
    }).catch(err=>{
      console.log(err);
    })
  }
  updateGroupBillFeed(groupId,groupName){
    axios.get(`/groupBills/${groupId}`).then(res=>{
      let groupBills = res.data;
      this.setState({
        groupBills
      })
    })
  }
  updateFriendsSettlements=(email)=>{
      axios.get(`/smart-settle/${email}`).then(res=>{
          if(res.status === 200){
              this.setState({
                  settlements:[res.data]
              })
              // alert('status 200')
          }
          else{
              alert('something went wrong')
          }
      }).catch(err=>{
          console.log(err);
      })
  }

  dashFeedShow() {
    this.setState({
      dashFeed:true,
      friendsFeed:false,
      groupsFeed:false
    });
  }
  // friendsFeedShow(){
  //   this.setState({
  //     dashFeed:false,
  //     friendsFeed:true,
  //     groupsFeed:false
  //   })
  // }
  groupFeedShow(){
    this.setState({
      dashFeed:false,
      friendsFeed:false,
      groupsFeed:true
    })
  }
  render() {
    return (
    
      <MuiThemeProvider>
      <NavBar/>
          <br />
        <Grid>
          <Row>
            <Col md ={3}>  
                <List>
                <ListItem primaryText="Dashboard" leftIcon={<ViewAgenda />} 
                          onClick={()=>{this.updateDashHeading(window.localStorage.getItem("displayName"));
                                        this.dashFeedShow()}}
                          />
                <Subheader style={{color:'#9e9e9e',fontWeight:'600',display:'inline-block',width:'80%'}}>Friends</Subheader>  
                <AddFriendDialog />
                <FriendsList updateBillFeed={this.updateBillFeed.bind(this)} 
                             updateDashHeading ={this.updateDashHeading.bind(this)}
                             />
                <Subheader style={{color:'#9e9e9e',fontWeight:'600',display:'inline-block',width:'80%'}}>Groups</Subheader>
                <CreateGroup />
                <GroupList updateGroupBillFeed={this.updateGroupBillFeed.bind(this)}
                            updateDashHeading={this.updateDashHeading.bind(this)}
                            groupFeedShow={this.groupFeedShow.bind(this)}/>
                </List>  
            </Col> 
            <Col md={6}>
              <Dashboard dashHeading={this.state.dashHeading}/>
              <ToggleDisplay show={this.state.friendsFeed}>
                <BillFeed friendEmail={this.state.friendEmail} bills={this.state.bills}/>
              </ToggleDisplay>
              <ToggleDisplay show={this.state.groupsFeed}>
                <GroupFeed friendEmail={this.state.friendEmail} bills={this.state.bills}/>
              </ToggleDisplay>
            </Col>
            <Col md={3}>
              <ToggleDisplay show={this.state.friendsFeed}>
                <Settlements settlements={this.state.settlements}/>
              </ToggleDisplay>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
