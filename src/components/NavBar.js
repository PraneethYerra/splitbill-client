import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
function handleTouchTap() {
    alert('onClick triggered on the title component');
  }
  
  const styles = {
    title: {
      cursor: 'pointer',
    }
  };
  
  const rightPop = (props) =>{
    
  }
class NavBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
    };
  }
  
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
    render () {
        return (
            <AppBar
    title={<span style={styles.title}>SPLIT BILL</span>}
    onTitleTouchTap={handleTouchTap}
    iconElementRight= {<div>
      <RaisedButton
          onClick={this.handleTouchTap}
          label={window.localStorage.getItem("displayName")}
        />
    <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
        </div>}
    iconStyleLeft = {{display:'none'}}
    />
        )
    }
}

export default NavBar