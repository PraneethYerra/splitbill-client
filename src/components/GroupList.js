import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import GroupIcon from 'material-ui/svg-icons/social/group'

class GroupList extends Component {
    constructor(props){
        super(props);
        this.state={
            groups:[]
        }
    }
    componentDidMount () {
        axios.get('/groups').then(res=>{
            this.setState({
                groups:res.data
            })
        }).catch(err=>{
            console.warn(err)
        })
    }
    render () {
        return (
            <div>
            {this.state.groups.map((group,index)=>{
                    return (
                        <ListItem key={index}
                        primaryText={group.name} 
                        leftIcon={<GroupIcon />}
                       
                        onClick={()=>{this.props.updateGroupBillFeed(group._id,group.name)
                                      this.props.updateDashHeading(group.name);
                                      this.props.groupFeedShow()
                                      this.props.updateGroupSettlements(group._id)}}
                        />
                    )
                })}
            </div>
        )
    }
}

export default GroupList