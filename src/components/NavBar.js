import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
function handleTouchTap() {
    alert('onClick triggered on the title component');
  }
  
  const styles = {
    title: {
      cursor: 'pointer',
    },
  };
  
class NavBar extends Component {
    render () {
        return (
            <AppBar
    title={<span style={styles.title}>Title</span>}
    onTitleTouchTap={handleTouchTap}
    iconElementRight={<FlatButton label="Add Bill" />}
  />
        )
    }
}

export default NavBar