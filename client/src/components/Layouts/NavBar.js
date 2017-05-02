import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MenuItem, Drawer, RaisedButton } from 'material-ui';

const style = {
  listStyle: 'none',
  textDecoration: 'none',
  signOut: {
    position: 'absolute',
    bottom: '5%',
    right: '27.5%'
  }
}

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const isAdmin = (this.props.currentUser && this.props.currentUser.type === "admin")
    let adminMenu = null;
    if (isAdmin) {
      adminMenu = <Link style={style} to="/admin/menu"><MenuItem onTouchTap={this.handleToggle}>Admin</MenuItem></Link>;
    };

    const SignOutButton = withRouter(({ history }) => {
      return (
        <MenuItem
          style={style.signOut}
          onClick={(e) => {
            this.props.onSignOut();
            history.push('/signin')
          }}
        >
          Sign Out
        </MenuItem>
      )
    })

    return (
      <div>
        <RaisedButton
          label="Menu"
          onTouchTap={this.handleToggle}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          width={200}
          onRequestChange={(open) => this.setState({open})}
        >
          <Link style={style} to="/dashboard"><MenuItem onTouchTap={this.handleToggle}>Home</MenuItem></Link>
          <Link style={style} to="/contacts/all"><MenuItem onTouchTap={this.handleToggle}>Contacts</MenuItem></Link>
          <Link style={style} to="/scripts/menu"><MenuItem onTouchTap={this.handleToggle}>Scripts</MenuItem></Link>
          {adminMenu}
          <SignOutButton />
        </Drawer>
      </div>
    );
  }
}

export default NavBar;
