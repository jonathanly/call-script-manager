import React from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import { FontIcon, RaisedButton } from 'material-ui';

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

class AdminMenu extends React.Component {
  render() {
    return (
      <div>
        <div style={style.root}>
          <GridList cellHeight={200} style={style.gridList}>
            <Link to="/admin/stafftable">
              <GridTile>
                <FontIcon className="fa fa-user-circle-o fa-6" style={style.icon}/>
                <br/>
                <RaisedButton label="Staff list" style={style.button}/>
              </GridTile>
            </Link>
            <Link to="/admin/addstaff">
              <GridTile>
                <FontIcon className="fa fa-user-plus fa-6" style={style.icon}/>
                <br/>
                <RaisedButton label="Add New Staff" style={style.button}/>
              </GridTile>
            </Link>
          </GridList>
        </div>
      </div>
    )
  }

}

export default AdminMenu;
