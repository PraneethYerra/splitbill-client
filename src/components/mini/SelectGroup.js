import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios'


class SelectGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            groups:[]
        }
    }
    componentDidMount () {
        axios.get('/groups').then(res=>{
            let groups = res.data;
            this.setState({
                groups:res.data
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    
    render () {
        return (
            <SelectField floatingLabelText="group" value={this.props.group} 
            onChange={this.props.changeGroup}>
            <MenuItem value={"0"} primaryText="Non Group expense" />
            {
                this.state.groups.map((group)=>{
                    return (
                        <MenuItem key={group._id} value={group._id} primaryText={group.name} />
                    )
                })
            }
            </SelectField>
        )
    }
}

export default SelectGroup

