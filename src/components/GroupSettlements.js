import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import GroupSettlementsList from './mini/GroupSettlementsList' 
class GroupSettlements extends Component {
    render () {
        return (
            <div>
                <h2 style={{marginTop:'0',color:'#616161'}}>Group Balances</h2>
                
                {this.props.groupSettlements.map(
                    (settlement)=>{
                        return(
                            <GroupSettlementsList settlement={settlement}/>
                        )
                    }
                )}
                
            </div>
        )
    }
}

export default GroupSettlements