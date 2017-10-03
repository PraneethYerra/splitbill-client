import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

class FriendsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            friends:[]
        }
    }
    componentDidMount () {
        axios.get('/friends').then(res=>{
            console.log(res.data)
            this.setState({
                friends:res.data
            })
        }).catch(err=>{
            console.warn(err)
        })
    }
    
    render () {
        return (
            <List>
                {this.state.friends.map(friend=>{
                    return (
                        <ListItem primaryText={friend} leftIcon={<AccountCircle />}/>
                    )
                })}
            </List>
        )
    }
}

export default FriendsList