import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Dialog, FlatButton, FontIcon } from 'material-ui';

import axios from 'axios';

class StaffTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staff: [],
      open: false,
      currentId: 0,
      message: ''
    }
  }

  handleOpen= (id) => {
    this.setState({ open:true, currentId: id });
  };

  handleClose = () => {
    this.setState({ open:false, currentId: 0 });
  };

  handleConfirm = () => {
    this.setState({ open:false, currentId: 0 });
    this.deleteStaff(this.state.currentId)
  };

  componentDidMount() {
    this.getStaff();
  }

  getStaff = () => {
    const businessId = this.props.currentUser._business

    axios.get(`/business/${businessId}`)
    .then(res => {
      this.setState({
        staff: res.data._users
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  deleteStaff = (id) => {
    axios.delete(`/auth/${id}`)
    .then(res => {
      const updatedStaff = this.state.staff.filter((staff) => (staff._id !== id))
      let { message } = res.data  // What is happening on lines 58 and 59??
      console.log(message)
      this.setState({ staff: updatedStaff });
    })
    .then(err => {
      this.setState({ message: err});
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onTouchTap={this.handleConfirm}
      />
    ];

    const staffRows = this.state.staff.map(staff => {
      const { _id, firstName, lastName, email, type } = staff
      return (
        <TableRow key={_id}>
          <TableRowColumn>{lastName}</TableRowColumn>
          <TableRowColumn>{firstName}</TableRowColumn>
          <TableRowColumn>{email}</TableRowColumn>
          <TableRowColumn>{type}</TableRowColumn>
          { type !== this.props.currentUser.type ? (
            <TableRowColumn>
              <FontIcon className="fa fa-trash"  onClick={(e) => this.handleOpen(staff._id)} onTouchTap={(e) => this.handleOpen(staff._id)} />
              <Dialog
                title="Confirm delete"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                onClick={(e) => this.handleClose}
                >
              </Dialog>
            </TableRowColumn>
          ) : (
            <TableRowColumn><FontIcon className="fa fa-exclamation-triangle"/></TableRowColumn>
          )}
        </TableRow>
      )
    });

    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffRows}
          </TableBody>
        </Table>
      </div>

    )
  }
}

export default StaffTable;
