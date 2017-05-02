import React from 'react';
import axios from 'axios';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Dialog, FlatButton, FontIcon, TextField } from 'material-ui';

class ContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      open: false,
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        phone:' ',
        mobile: '',
        group: ''
      },
      message: null,
      error: null
    }
  }

  componentDidMount() {
    this.getContacts();
  }

  handleChange = (event) => {
    event.preventDefault();
    var contact = this.state.contact;
    contact[event.target.name] = event.target.value
    this.setState({
      contact: contact
    })
  }

  getContacts = () => {
    const businessId = this.props.currentUser._business

    axios.get(`/business/${businessId}`)
    .then(res => {
      this.setState({
        contacts: res.data._contacts
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  deleteContact = (id) => {
    axios.delete(`/contacts/${id}`)
    .then(res => {
      const contacts = this.state.contacts.filter((contact) => (contact._id !== id))
      let { message } = res.data
      console.log(message)
      this.setState({ message, contacts });
    })
    .catch(err => {
      this.setState({ message: err });
    })
  }

  updateContact = (id) => {
    const updateContact = this.state.contact
    console.log(updateContact)
    axios.patch(`/contacts/${id}`, updateContact)
    .then(res => {
      this.getContacts();
      let { message } = res.data
      console.log(message)
    })
    .catch(error => {
      this.setState({ error });
    })
  }

  handleOpen = (contact) => {
    //let { firstName, lastName, email, phone, mobile, business, group } = contact
    this.setState({
      open: true,
      contact: contact
    });
  };

  closeDialog = () => {
    this.setState({ open:false });
  };

  handleEdit = () => {
    this.updateContact(this.state.contact._id);
    this.setState({ open:false, contact: 0 });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeDialog}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onTouchTap={this.handleEdit}
      />
    ]

    const contactRows = this.state.contacts.map(contact => {
      const { firstName, lastName, email, phone, mobile, group, _id } = contact
      return (
        <TableRow key={_id}>
          <TableRowColumn>{firstName}</TableRowColumn>
          <TableRowColumn>{lastName}</TableRowColumn>
          <TableRowColumn>{email}</TableRowColumn>
          <TableRowColumn>{phone}</TableRowColumn>
          <TableRowColumn>{mobile}</TableRowColumn>
          <TableRowColumn>{group}</TableRowColumn>
          <TableRowColumn><FontIcon className="fa fa-pencil-square-o" label="Edit User" onTouchTap={() => this.handleOpen(contact)} />
          <Dialog
            title="Edit User"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            Make Changes to the selected Contact
            <form name='updateForm'>
              <TextField
                floatingLabelText="First Name"
                name='firstName'
                value={this.state.contact.firstName}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                floatingLabelText="Last Name"
                name='lastName'
                defaultValue={this.state.contact.lastName}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                floatingLabelText="Email"
                name='email'
                defaultValue={this.state.contact.email}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                floatingLabelText="Phone"
                name='phone'
                defaultValue={this.state.contact.phone}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                floatingLabelText="Mobile"
                name='mobile'
                defaultValue={this.state.contact.mobile}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                floatingLabelText="Group"
                name='group'
                defaultValue={this.state.contact.group}
                onChange={this.handleChange}
              />
              <br />
            </form>
          </Dialog>
          </TableRowColumn>
          <TableRowColumn><FontIcon className="fa fa-trash" onClick={(e) => this.deleteContact(contact._id)}/></TableRowColumn>
        </TableRow>
      )
    });

    const { message } = this.state;

    return (
      <div>
        { message && <p>{message}</p>}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Phone</TableHeaderColumn>
              <TableHeaderColumn>Mobile</TableHeaderColumn>
              <TableHeaderColumn>Group</TableHeaderColumn>
              <TableRowColumn></TableRowColumn>
              <TableRowColumn></TableRowColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactRows}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default ContactTable;
