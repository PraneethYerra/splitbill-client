import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';

class GroupsList extends Component {
    constructor(props){
        super(props);
        this.state={
            groups:[],
        }
    }
    componentDidMount () {
        axios.get('/groups').then(res=>{
            if(res.status === 200){
                this.setState({
                    groups:res.data
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
    render () {
        return (
            <div>
            {this.state.groups.map(groupName=>{
                    return (
                        <ListItem 
                        primaryText={groupName} leftIcon={<AccountCircle />}/>
                    )
                })}               
            </div>
        )
    }
}

export default GroupsList               