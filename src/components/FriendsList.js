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
            this.setState({
                friends:res.data
            })
        }).catch(err=>{
            console.warn(err)
        })
    }

    render () {
        return (
            <div>
                {this.state.friends.map((friend,index)=>{
                    return (
                        <ListItem onClick={()=>{this.props.updateBillFeed(friend.email,friend.displayName);                                                }} 
                        primaryText={friend.displayName} leftIcon={<AccountCircle />}
                        key={index}/>
                    )
                    })}
            </div>
        )
    }
}

export default FriendsList