import React from 'react';
import { FontIcon, RaisedButton } from 'material-ui';
import { GridList, GridTile } from 'material-ui/GridList';
import { Link } from 'react-router-dom';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 550,
    height: 500,
    overflowY: 'auto',
  },
  icon: {
    fontSize: '7.5rem',
    margin: 'auto 0'
  },
  button: {
    margin: '1.25em 0',
    width: '15em'
  }
};

const Dashboard = (props) => {
  return (
    <div>
      <h1>Welcome back {props.currentUser.firstName}!</h1>
      <p>Click on the panels to get started</p>

      <div style={style.root}>
        <GridList cellHeight={200} style={style.gridList}>
          <Link to="/contacts/all">
            <GridTile>
              <FontIcon className="fa fa-address-book fa-6" style={style.icon}/>
              <br/>
              <RaisedButton label="Contacts" style={style.button}/>
            </GridTile>
          </Link>
          <Link to="/scripts/menu">
            <GridTile>
              <FontIcon className="fa fa-file-text fa-6" style={style.icon}/>
              <br/>
              <RaisedButton label="Scripts" style={style.button}/>
            </GridTile>
          </Link>
          <GridTile>
            <FontIcon className="fa fa-id-card-o fa-6" style={style.icon}/>
            <br/>
            <RaisedButton label="Account Settings" style={style.button}/>
          </GridTile>
        </GridList>
      </div>
    </div>
  )
}

export default Dashboard;
